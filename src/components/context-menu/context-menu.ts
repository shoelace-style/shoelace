import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { emit, waitForEvent } from '../../internal/event';
import { watch } from '../../internal/watch';
import { Instance as PopperInstance, createPopper } from '@popperjs/core/dist/esm';
import { animateTo, stopAnimations } from '../../internal/animate';
import { setDefaultAnimation, getAnimation } from '../../utilities/animation-registry';
import type SlMenu from '../menu/menu';
import styles from './context-menu.styles';

import '../menu/menu';

/**
 * @since 2.0
 * @status experimental
 *
 * @dependency sl-menu
 *
 * @event sl-event-name - Emitted as an example.
 *
 * @slot - Content that will activate the context menu when right-clicked.
 * @slot menu - The menu to show when the context menu is activated, an `<sl-menu>` element.
 *
 * @event sl-show - Emitted when the context menu opens.
 * @event sl-after-show - Emitted after the context menu opens and all animations are complete.
 * @event sl-hide - Emitted when the context menu closes.
 * @event sl-after-hide - Emitted after the context menu closes and all animations are complete.
 *
 * @animation contextMenu.show - The animation to use when showing the context menu.
 * @animation contextMenu.hide - The animation to use when hiding the context menu.
 */
@customElement('sl-context-menu')
export default class SlContextMenu extends LitElement {
  static styles = styles;

  @query('.context-menu') wrapper: HTMLElement;
  @query('.context-menu__locater') locater: HTMLElement;
  @query('.context-menu__menu') menu: HTMLSlotElement;
  @query('.context-menu__positioner') positioner: HTMLElement;

  private popover: PopperInstance;

  /**
   * The preferred placement of the context menu. Note that the actual placement may vary as needed to keep the menu
   * inside of the viewport.
   */
  @property() placement:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end' = 'bottom-start';

  /** Disables the context menu so it won't show when triggered. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** The distance in pixels from which to offset the context menu away from its target. */
  @property({ type: Number }) distance = 0;

  /** Indicates whether or not the context menu is open. You can use this in lieu of the show/hide methods. */
  @property({ type: Boolean, reflect: true }) open = false;

  /** The distance in pixels from which to offset the context menu along its target. */
  @property({ type: Number }) skidding = 0;

  /**
   * Enable this option to prevent the menu from being clipped when the component is placed inside a container with
   * `overflow: auto|hidden|scroll`.
   */
  @property({ type: Boolean }) hoist = false;

  connectedCallback() {
    super.connectedCallback();

    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
    this.handleDocumentMouseDown = this.handleDocumentMouseDown.bind(this);
  }

  firstUpdated() {
    this.menu.hidden = !this.open;
  }

  getMenu() {
    const slot = this.menu.querySelector('slot')!;
    return slot.assignedElements({ flatten: true }).filter(el => el.tagName.toLowerCase() === 'sl-menu')[0] as SlMenu;
  }

  async handleContextMenu(event: MouseEvent) {
    event.preventDefault();
    const { offsetX, offsetY } = event;

    if (this.open) {
      await this.hide();
    }

    this.show(offsetX, offsetY);
  }

  handleDocumentKeyDown(event: KeyboardEvent) {
    const menu = this.getMenu();
    const menuItems = menu ? menu.getAllItems() : [];
    const firstMenuItem = menuItems[0];
    const lastMenuItem = menuItems[menuItems.length - 1];

    // Close when escape is pressed
    if (event.key === 'Escape') {
      this.hide();
      return;
    }

    // Forward key presses that don't originate from the menu to allow keyboard selection and type-to-select
    if (menu && !event.composedPath().includes(this.menu)) {
      // Focus on a menu item
      if (['ArrowDown', 'Home'].includes(event.key) && firstMenuItem) {
        event.preventDefault();
        const menu = this.getMenu();
        menu.setCurrentItem(firstMenuItem);
        firstMenuItem.focus();
        return;
      }

      if (['ArrowUp', 'End'].includes(event.key) && lastMenuItem) {
        event.preventDefault();
        menu.setCurrentItem(lastMenuItem);
        lastMenuItem.focus();
        return;
      }

      // Other keys bring focus to the menu and initiate type-to-select behavior
      const ignoredKeys = ['Tab', 'Shift', 'Meta', 'Ctrl', 'Alt'];
      if (!ignoredKeys.includes(event.key)) {
        menu.typeToSelect(event.key);
        return;
      }
    }
  }

  handleDocumentMouseDown(event: MouseEvent) {
    const path = event.composedPath() as Array<EventTarget>;

    //
    // Close the context menu when clicking outside of it. We use a setTimeout here because mousedown fires before
    // contextmenu and, if the menu is already open and the user-right clicks again, we want the menu to re-open in the
    // new position instead of closing.
    //
    setTimeout(() => {
      if (this.open && !path.includes(this.menu)) {
        this.hide();
        return;
      }
    });
  }

  handleMenuSelect() {
    // Close the context menu when a menu item is selected
    this.hide();
  }

  @watch('open', { waitUntilFirstUpdate: true })
  async handleOpenChange() {
    if (this.disabled) {
      return;
    }

    if (this.open) {
      // Show
      emit(this, 'sl-show');
      document.addEventListener('keydown', this.handleDocumentKeyDown);
      document.addEventListener('mousedown', this.handleDocumentMouseDown);

      await stopAnimations(this);

      this.popover = createPopper(this.locater, this.positioner, {
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

      this.menu.hidden = false;
      const { keyframes, options } = getAnimation(this, 'contextMenu.show');
      await animateTo(this.menu, keyframes, options);

      emit(this, 'sl-after-show');
    } else {
      // Hide
      emit(this, 'sl-hide');
      document.removeEventListener('keydown', this.handleDocumentKeyDown);
      document.removeEventListener('mousedown', this.handleDocumentMouseDown);

      await stopAnimations(this);
      const { keyframes, options } = getAnimation(this, 'contextMenu.hide');
      await animateTo(this.menu, keyframes, options);

      this.menu.hidden = true;
      this.locater.style.top = '0px';
      this.locater.style.left = '0px';
      this.popover.destroy();

      emit(this, 'sl-after-hide');
    }
  }

  /** Shows the context menu */
  async show(offsetX?: number, offsetY?: number) {
    if (this.open) {
      return;
    }

    this.locater.style.top = `${offsetY || 0}px`;
    this.locater.style.left = `${offsetX || 0}px`;
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

  render() {
    return html`
      <div class="context-menu">
        <slot @contextmenu=${this.handleContextMenu}></slot>

        <div class="context-menu__locater"></div>

        <!-- Position the menu with a wrapper since the popover makes use of translate. This let's us add animations
        on the menu without interfering with the position. -->
        <div class="context-menu__positioner">
          <div class="context-menu__menu" hidden @sl-select=${this.handleMenuSelect}>
            <slot name="menu"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

setDefaultAnimation('contextMenu.show', {
  keyframes: [
    { opacity: 0, transform: 'scale(0.9)' },
    { opacity: 1, transform: 'scale(1)' }
  ],
  options: { duration: 50, easing: 'ease' }
});

setDefaultAnimation('contextMenu.hide', {
  keyframes: [
    { opacity: 1, transform: 'scale(1)' },
    { opacity: 0, transform: 'scale(0.9)' }
  ],
  options: { duration: 150, easing: 'ease' }
});

declare global {
  interface HTMLElementTagNameMap {
    'sl-context-menu': SlContextMenu;
  }
}
