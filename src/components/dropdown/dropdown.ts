import { autoUpdate, computePosition, flip, offset, shift, size } from '@floating-ui/dom';
import { html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { animateTo, stopAnimations } from '../../internal/animate';
import { emit, waitForEvent } from '../../internal/event';
import { scrollIntoView } from '../../internal/scroll';
import { getTabbableBoundary } from '../../internal/tabbable';
import { watch } from '../../internal/watch';
import { getAnimation, setDefaultAnimation } from '../../utilities/animation-registry';
import styles from './dropdown.styles';
import type SlButton from '../../components/button/button';
import type SlIconButton from '../../components/icon-button/icon-button';
import type SlMenuItem from '../../components/menu-item/menu-item';
import type SlMenu from '../../components/menu/menu';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The dropdown's content.
 * @slot trigger - The dropdown's trigger, usually a `<sl-button>` element.
 *
 * @event sl-show - Emitted when the dropdown opens.
 * @event sl-after-show - Emitted after the dropdown opens and all animations are complete.
 * @event sl-hide - Emitted when the dropdown closes.
 * @event sl-after-hide - Emitted after the dropdown closes and all animations are complete.
 *
 * @csspart base - The component's internal wrapper.
 * @csspart trigger - The container that wraps the trigger.
 * @csspart panel - The panel that gets shown when the dropdown is open.
 *
 * @animation dropdown.show - The animation to use when showing the dropdown.
 * @animation dropdown.hide - The animation to use when hiding the dropdown.
 */
@customElement('sl-dropdown')
export default class SlDropdown extends LitElement {
  static styles = styles;

  @query('.dropdown__trigger') trigger: HTMLElement;
  @query('.dropdown__panel') panel: HTMLElement;
  @query('.dropdown__positioner') positioner: HTMLElement;

  private positionerCleanup: ReturnType<typeof autoUpdate> | undefined;

  /** Indicates whether or not the dropdown is open. You can use this in lieu of the show/hide methods. */
  @property({ type: Boolean, reflect: true }) open = false;

  /**
   * The preferred placement of the dropdown panel. Note that the actual placement may vary as needed to keep the panel
   * inside of the viewport.
   */
  @property({ reflect: true }) placement:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'left'
    | 'left-start'
    | 'left-end' = 'bottom-start';

  /** Disables the dropdown so the panel will not open. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * By default, the dropdown is closed when an item is selected. This attribute will keep it open instead. Useful for
   * controls that allow multiple selections.
   */
  @property({ attribute: 'stay-open-on-select', type: Boolean, reflect: true }) stayOpenOnSelect = false;

  /** The dropdown will close when the user interacts outside of this element (e.g. clicking). */
  @property({ attribute: false }) containingElement?: HTMLElement;

  /** The distance in pixels from which to offset the panel away from its trigger. */
  @property({ type: Number }) distance = 0;

  /** The distance in pixels from which to offset the panel along its trigger. */
  @property({ type: Number }) skidding = 0;

  /**
   * Enable this option to prevent the panel from being clipped when the component is placed inside a container with
   * `overflow: auto|scroll`.
   */
  @property({ type: Boolean }) hoist = false;

  connectedCallback() {
    super.connectedCallback();
    this.handleMenuItemActivate = this.handleMenuItemActivate.bind(this);
    this.handlePanelSelect = this.handlePanelSelect.bind(this);
    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
    this.handleDocumentMouseDown = this.handleDocumentMouseDown.bind(this);

    if (!this.containingElement) {
      this.containingElement = this;
    }
  }

  async firstUpdated() {
    this.panel.hidden = !this.open;

    // If the dropdown is visible on init, update its position
    if (this.open) {
      await this.updateComplete;
      this.addOpenListeners();
      this.startPositioner();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeOpenListeners();
    this.hide();
    this.stopPositioner();
  }

  focusOnTrigger() {
    const slot = this.trigger.querySelector('slot')!;
    const trigger = slot.assignedElements({ flatten: true })[0] as HTMLElement | undefined;
    if (typeof trigger?.focus === 'function') {
      trigger.focus();
    }
  }

  getMenu() {
    const slot = this.panel.querySelector('slot')!;
    return slot.assignedElements({ flatten: true }).find(el => el.tagName.toLowerCase() === 'sl-menu') as
      | SlMenu
      | undefined;
  }

  handleDocumentKeyDown(event: KeyboardEvent) {
    // Close when escape is pressed
    if (event.key === 'Escape') {
      this.hide();
      this.focusOnTrigger();
      return;
    }

    // Handle tabbing
    if (event.key === 'Tab') {
      // Tabbing within an open menu should close the dropdown and refocus the trigger
      if (this.open && document.activeElement?.tagName.toLowerCase() === 'sl-menu-item') {
        event.preventDefault();
        this.hide();
        this.focusOnTrigger();
        return;
      }

      // Tabbing outside of the containing element closes the panel
      //
      // If the dropdown is used within a shadow DOM, we need to obtain the activeElement within that shadowRoot,
      // otherwise `document.activeElement` will only return the name of the parent shadow DOM element.
      setTimeout(() => {
        const activeElement =
          this.containingElement?.getRootNode() instanceof ShadowRoot
            ? document.activeElement?.shadowRoot?.activeElement
            : document.activeElement;

        if (
          !this.containingElement ||
          activeElement?.closest(this.containingElement.tagName.toLowerCase()) !== this.containingElement
        ) {
          this.hide();
        }
      });
    }
  }

  handleDocumentMouseDown(event: MouseEvent) {
    // Close when clicking outside of the containing element
    const path = event.composedPath();
    if (this.containingElement && !path.includes(this.containingElement)) {
      this.hide();
    }
  }

  handleMenuItemActivate(event: CustomEvent) {
    const item = event.target as SlMenuItem;
    scrollIntoView(item, this.panel);
  }

  handlePanelSelect(event: CustomEvent) {
    const target = event.target as HTMLElement;

    // Hide the dropdown when a menu item is selected
    if (!this.stayOpenOnSelect && target.tagName.toLowerCase() === 'sl-menu') {
      this.hide();
      this.focusOnTrigger();
    }
  }

  @watch('distance')
  @watch('hoist')
  @watch('placement')
  @watch('skidding')
  handlePopoverOptionsChange() {
    this.updatePositioner();
  }

  handleTriggerClick() {
    if (this.open) {
      this.hide();
    } else {
      this.show();
    }
  }

  handleTriggerKeyDown(event: KeyboardEvent) {
    // Close when escape or tab is pressed
    if (event.key === 'Escape') {
      this.focusOnTrigger();
      this.hide();
      return;
    }

    // When spacebar/enter is pressed, show the panel but don't focus on the menu. This let's the user press the same
    // key again to hide the menu in case they don't want to make a selection.
    if ([' ', 'Enter'].includes(event.key)) {
      event.preventDefault();
      this.handleTriggerClick();
      return;
    }

    const menu = this.getMenu();

    if (menu) {
      const menuItems = menu.defaultSlot.assignedElements({ flatten: true }) as SlMenuItem[];
      const firstMenuItem = menuItems[0];
      const lastMenuItem = menuItems[menuItems.length - 1];

      // When up/down is pressed, we make the assumption that the user is familiar with the menu and plans to make a
      // selection. Rather than toggle the panel, we focus on the menu (if one exists) and activate the first item for
      // faster navigation.
      if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
        event.preventDefault();

        // Show the menu if it's not already open
        if (!this.open) {
          this.show();
        }

        if (menuItems.length > 0) {
          // Focus on the first/last menu item after showing
          requestAnimationFrame(() => {
            if (event.key === 'ArrowDown' || event.key === 'Home') {
              menu.setCurrentItem(firstMenuItem);
              firstMenuItem.focus();
            }

            if (event.key === 'ArrowUp' || event.key === 'End') {
              menu.setCurrentItem(lastMenuItem);
              lastMenuItem.focus();
            }
          });
        }
      }

      // Other keys bring focus to the menu and initiate type-to-select behavior
      const ignoredKeys = ['Tab', 'Shift', 'Meta', 'Ctrl', 'Alt'];
      if (this.open && !ignoredKeys.includes(event.key)) {
        menu.typeToSelect(event);
      }
    }
  }

  handleTriggerKeyUp(event: KeyboardEvent) {
    // Prevent space from triggering a click event in Firefox
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  handleTriggerSlotChange() {
    this.updateAccessibleTrigger();
  }

  //
  // Slotted triggers can be arbitrary content, but we need to link them to the dropdown panel with `aria-haspopup` and
  // `aria-expanded`. These must be applied to the "accessible trigger" (the tabbable portion of the trigger element
  // that gets slotted in) so screen readers will understand them. The accessible trigger could be the slotted element,
  // a child of the slotted element, or an element in the slotted element's shadow root.
  //
  // For example, the accessible trigger of an <sl-button> is a <button> located inside its shadow root.
  //
  // To determine this, we assume the first tabbable element in the trigger slot is the "accessible trigger."
  //
  updateAccessibleTrigger() {
    const slot = this.trigger.querySelector('slot')!;
    const assignedElements = slot.assignedElements({ flatten: true }) as HTMLElement[];
    const accessibleTrigger = assignedElements.find(el => getTabbableBoundary(el).start);
    let target: HTMLElement;

    if (accessibleTrigger) {
      switch (accessibleTrigger.tagName.toLowerCase()) {
        // Shoelace buttons have to update the internal button so it's announced correctly by screen readers
        case 'sl-button':
        case 'sl-icon-button':
          target = (accessibleTrigger as SlButton | SlIconButton).button;
          break;

        default:
          target = accessibleTrigger;
      }

      target.setAttribute('aria-haspopup', 'true');
      target.setAttribute('aria-expanded', this.open ? 'true' : 'false');
    }
  }

  /** Shows the dropdown panel. */
  async show() {
    if (this.open) {
      return undefined;
    }

    this.open = true;
    return waitForEvent(this, 'sl-after-show');
  }

  /** Hides the dropdown panel */
  async hide() {
    if (!this.open) {
      return undefined;
    }

    this.open = false;
    return waitForEvent(this, 'sl-after-hide');
  }

  /**
   * Instructs the dropdown menu to reposition. Useful when the position or size of the trigger changes when the menu
   * is activated.
   */
  reposition() {
    this.updatePositioner();
  }

  addOpenListeners() {
    this.panel.addEventListener('sl-activate', this.handleMenuItemActivate);
    this.panel.addEventListener('sl-select', this.handlePanelSelect);
    document.addEventListener('keydown', this.handleDocumentKeyDown);
    document.addEventListener('mousedown', this.handleDocumentMouseDown);
  }

  removeOpenListeners() {
    this.panel.removeEventListener('sl-activate', this.handleMenuItemActivate);
    this.panel.removeEventListener('sl-select', this.handlePanelSelect);
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
    document.removeEventListener('mousedown', this.handleDocumentMouseDown);
  }

  @watch('open', { waitUntilFirstUpdate: true })
  async handleOpenChange() {
    if (this.disabled) {
      this.open = false;
      return;
    }

    this.updateAccessibleTrigger();

    if (this.open) {
      // Show
      emit(this, 'sl-show');
      this.addOpenListeners();

      await stopAnimations(this);
      this.startPositioner();
      this.panel.hidden = false;
      const { keyframes, options } = getAnimation(this, 'dropdown.show');
      await animateTo(this.panel, keyframes, options);

      emit(this, 'sl-after-show');
    } else {
      // Hide
      emit(this, 'sl-hide');
      this.removeOpenListeners();

      await stopAnimations(this);
      const { keyframes, options } = getAnimation(this, 'dropdown.hide');
      await animateTo(this.panel, keyframes, options);
      this.panel.hidden = true;
      this.stopPositioner();

      emit(this, 'sl-after-hide');
    }
  }

  private startPositioner() {
    this.stopPositioner();
    this.updatePositioner();
    this.positionerCleanup = autoUpdate(this.trigger, this.positioner, this.updatePositioner.bind(this));
  }

  private updatePositioner() {
    if (!this.open || !this.trigger || !this.positioner) {
      return;
    }

    computePosition(this.trigger, this.positioner, {
      placement: this.placement,
      middleware: [
        offset({ mainAxis: this.distance, crossAxis: this.skidding }),
        flip(),
        shift(),
        size({
          apply: ({ width, height }) => {
            // Ensure the panel stays within the viewport when we have lots of menu items
            Object.assign(this.panel.style, {
              maxWidth: `${width}px`,
              maxHeight: `${height}px`
            });
          },
          padding: 8
        })
      ],
      strategy: this.hoist ? 'fixed' : 'absolute'
    }).then(({ x, y, placement }) => {
      this.positioner.setAttribute('data-placement', placement);

      Object.assign(this.positioner.style, {
        position: this.hoist ? 'fixed' : 'absolute',
        left: `${x}px`,
        top: `${y}px`
      });
    });
  }

  private stopPositioner() {
    if (this.positionerCleanup) {
      this.positionerCleanup();
      this.positionerCleanup = undefined;
      this.positioner.removeAttribute('data-placement');
    }
  }

  render() {
    return html`
      <div
        part="base"
        id="dropdown"
        class=${classMap({
          dropdown: true,
          'dropdown--open': this.open
        })}
      >
        <span
          part="trigger"
          class="dropdown__trigger"
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
        >
          <slot name="trigger" @slotchange=${this.handleTriggerSlotChange}></slot>
        </span>

        <!-- Position the panel with a wrapper since the popover makes use of translate. This let's us add animations
        on the panel without interfering with the position. -->
        <div class="dropdown__positioner">
          <div
            part="panel"
            class="dropdown__panel"
            aria-hidden=${this.open ? 'false' : 'true'}
            aria-labelledby="dropdown"
          >
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

setDefaultAnimation('dropdown.show', {
  keyframes: [
    { opacity: 0, transform: 'scale(0.9)' },
    { opacity: 1, transform: 'scale(1)' }
  ],
  options: { duration: 100, easing: 'ease' }
});

setDefaultAnimation('dropdown.hide', {
  keyframes: [
    { opacity: 1, transform: 'scale(1)' },
    { opacity: 0, transform: 'scale(0.9)' }
  ],
  options: { duration: 100, easing: 'ease' }
});

declare global {
  interface HTMLElementTagNameMap {
    'sl-dropdown': SlDropdown;
  }
}
