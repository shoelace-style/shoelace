import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit-html/directives/class-map';
import { Instance as PopperInstance, createPopper } from '@popperjs/core/dist/esm';
import { animateTo, stopAnimations } from '../../internal/animate';
import { emit } from '../../internal/event';
import { watch } from '../../internal/watch';
import { waitForEvent } from '../../internal/event';
import { scrollIntoView } from '../../internal/scroll';
import { getTabbableBoundary } from '../../internal/tabbable';
import { setDefaultAnimation, getAnimation } from '../../utilities/animation-registry';
import type SlMenu from '../menu/menu';
import type SlMenuItem from '../menu-item/menu-item';
import styles from 'sass:./dropdown.scss';

let id = 0;

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
 * @csspart base - The component's base wrapper.
 * @csspart trigger - The container that wraps the trigger.
 * @csspart panel - The panel that gets shown when the dropdown is open.
 *
 * @animation dropdown.show - The animation to use when showing the dropdown.
 * @animation dropdown.hide - The animation to use when hiding the dropdown.
 */
@customElement('sl-dropdown')
export default class SlDropdown extends LitElement {
  static styles = unsafeCSS(styles);

  @query('.dropdown__trigger') trigger: HTMLElement;
  @query('.dropdown__panel') panel: HTMLElement;
  @query('.dropdown__positioner') positioner: HTMLElement;

  private componentId = `dropdown-${++id}`;
  private popover: PopperInstance;

  /** Indicates whether or not the dropdown is open. You can use this in lieu of the show/hide methods. */
  @property({ type: Boolean, reflect: true }) open = false;

  /**
   * The preferred placement of the dropdown panel. Note that the actual placement may vary as needed to keep the panel
   * inside of the viewport.
   */
  @property() placement:
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
  @property({ type: Boolean }) disabled = false;

  /**
   * By default, the dropdown is closed when an item is selected. This attribute will keep it open instead. Useful for
   * controls that allow multiple selections.
   */
  @property({ attribute: 'stay-open-on-select', type: Boolean, reflect: true }) stayOpenOnSelect = false;

  /** The dropdown will close when the user interacts outside of this element (e.g. clicking). */
  @property({ attribute: false }) containingElement: HTMLElement;

  /** The distance in pixels from which to offset the panel away from its trigger. */
  @property({ type: Number }) distance = 2;

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

    // Create the popover after render
    this.updateComplete.then(() => {
      this.popover = createPopper(this.trigger, this.positioner, {
        placement: this.placement,
        strategy: this.hoist ? 'fixed' : 'absolute',
        modifiers: [
          {
            name: 'flip',
            options: {
              boundary: 'viewport'
            }
          },
          {
            name: 'offset',
            options: {
              offset: [this.skidding, this.distance]
            }
          }
        ]
      });
    });
  }

  firstUpdated() {
    this.panel.hidden = !this.open;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.hide();
    this.popover.destroy();
  }

  focusOnTrigger() {
    const slot = this.trigger.querySelector('slot')!;
    const trigger = slot.assignedElements({ flatten: true })[0] as any;
    if (trigger && typeof trigger.focus === 'function') {
      trigger.focus();
    }
  }

  getMenu() {
    const slot = this.panel.querySelector('slot')!;
    return slot.assignedElements({ flatten: true }).filter(el => el.tagName.toLowerCase() === 'sl-menu')[0] as SlMenu;
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
          this.containingElement.getRootNode() instanceof ShadowRoot
            ? document.activeElement?.shadowRoot?.activeElement
            : document.activeElement;

        if (activeElement?.closest(this.containingElement.tagName.toLowerCase()) !== this.containingElement) {
          this.hide();
          return;
        }
      });
    }
  }

  handleDocumentMouseDown(event: MouseEvent) {
    // Close when clicking outside of the containing element
    const path = event.composedPath() as Array<EventTarget>;
    if (!path.includes(this.containingElement)) {
      this.hide();
      return;
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
    if (this.popover) {
      this.popover.setOptions({
        placement: this.placement,
        strategy: this.hoist ? 'fixed' : 'absolute',
        modifiers: [
          {
            name: 'flip',
            options: {
              boundary: 'viewport'
            }
          },
          {
            name: 'offset',
            options: {
              offset: [this.skidding, this.distance]
            }
          }
        ]
      });
    }
  }

  handleTriggerClick() {
    this.open ? this.hide() : this.show();
  }

  handleTriggerKeyDown(event: KeyboardEvent) {
    const menu = this.getMenu();
    const menuItems = menu ? ([...menu.querySelectorAll('sl-menu-item')] as SlMenuItem[]) : [];
    const firstMenuItem = menuItems[0];
    const lastMenuItem = menuItems[menuItems.length - 1];

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
      this.open ? this.hide() : this.show();
      return;
    }

    // When up/down is pressed, we make the assumption that the user is familiar with the menu and plans to make a
    // selection. Rather than toggle the panel, we focus on the menu (if one exists) and activate the first item for
    // faster navigation.
    if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
      event.preventDefault();

      // Show the menu if it's not already open
      if (!this.open) {
        this.show();
      }

      // Focus on a menu item
      if (event.key === 'ArrowDown' && firstMenuItem) {
        const menu = this.getMenu();
        menu.setCurrentItem(firstMenuItem);
        firstMenuItem.focus();
        return;
      }

      if (event.key === 'ArrowUp' && lastMenuItem) {
        menu.setCurrentItem(lastMenuItem);
        lastMenuItem.focus();
        return;
      }
    }

    // Other keys bring focus to the menu and initiate type-to-select behavior
    const ignoredKeys = ['Tab', 'Shift', 'Meta', 'Ctrl', 'Alt'];
    if (this.open && menu && !ignoredKeys.includes(event.key)) {
      menu.typeToSelect(event.key);
      return;
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
    if (this.trigger) {
      const slot = this.trigger.querySelector('slot') as HTMLSlotElement;
      const assignedElements = slot.assignedElements({ flatten: true }) as HTMLElement[];
      const accessibleTrigger = assignedElements.find(el => getTabbableBoundary(el).start);

      if (accessibleTrigger) {
        accessibleTrigger.setAttribute('aria-haspopup', 'true');
        accessibleTrigger.setAttribute('aria-expanded', this.open ? 'true' : 'false');
      }
    }
  }

  /** Shows the dropdown panel. */
  async show() {
    if (this.open) {
      return;
    }

    this.open = true;
    return waitForEvent(this, 'sl-after-show');
  }

  /** Hides the dropdown panel */
  async hide() {
    if (!this.open) {
      return;
    }

    this.open = false;
    return waitForEvent(this, 'sl-after-hide');
  }

  /**
   * Instructs the dropdown menu to reposition. Useful when the position or size of the trigger changes when the menu
   * is activated.
   */
  reposition() {
    if (!this.open) {
      return;
    }

    this.popover.update();
  }

  @watch('open', { waitUntilFirstUpdate: true })
  async handleOpenChange() {
    if (this.disabled) {
      return;
    }

    this.updateAccessibleTrigger();

    if (this.open) {
      // Show
      emit(this, 'sl-show');
      this.panel.addEventListener('sl-activate', this.handleMenuItemActivate);
      this.panel.addEventListener('sl-select', this.handlePanelSelect);
      document.addEventListener('keydown', this.handleDocumentKeyDown);
      document.addEventListener('mousedown', this.handleDocumentMouseDown);

      await stopAnimations(this);
      this.popover.update();
      this.panel.hidden = false;
      const { keyframes, options } = getAnimation(this, 'dropdown.show');
      await animateTo(this.panel, keyframes, options);

      emit(this, 'sl-after-show');
    } else {
      // Hide
      emit(this, 'sl-hide');
      this.panel.removeEventListener('sl-activate', this.handleMenuItemActivate);
      this.panel.removeEventListener('sl-select', this.handlePanelSelect);
      document.removeEventListener('keydown', this.handleDocumentKeyDown);
      document.removeEventListener('mousedown', this.handleDocumentMouseDown);

      await stopAnimations(this);
      const { keyframes, options } = getAnimation(this, 'dropdown.hide');
      await animateTo(this.panel, keyframes, options);
      this.panel.hidden = true;

      emit(this, 'sl-after-hide');
    }
  }

  render() {
    return html`
      <div
        part="base"
        id=${this.componentId}
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
            role="menu"
            aria-hidden=${this.open ? 'false' : 'true'}
            aria-labelledby=${this.componentId}
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
  options: { duration: 150, easing: 'ease' }
});

setDefaultAnimation('dropdown.hide', {
  keyframes: [
    { opacity: 1, transform: 'scale(1)' },
    { opacity: 0, transform: 'scale(0.9)' }
  ],
  options: { duration: 150, easing: 'ease' }
});

declare global {
  interface HTMLElementTagNameMap {
    'sl-dropdown': SlDropdown;
  }
}
