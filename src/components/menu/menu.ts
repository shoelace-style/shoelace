import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { emit } from '../../internal/event';
import { getTextContent } from '../../internal/slot';
import type SlMenuItem from '../menu-item/menu-item';
import styles from 'sass:./menu.scss';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The menu's content, including menu items, menu dividers, and menu labels.
 *
 * @event {{ item: SlMenuItem }} sl-select - Emitted when a menu item is selected.
 *
 * @csspart base - The component's base wrapper.
 */
@customElement('sl-menu')
export default class SlMenu extends LitElement {
  static styles = unsafeCSS(styles);

  @query('.menu') menu: HTMLElement;
  @query('slot') defaultSlot: HTMLSlotElement;

  private typeToSelectString = '';
  private typeToSelectTimeout: any;

  getAllItems(options: { includeDisabled: boolean } = { includeDisabled: true }) {
    return [...this.defaultSlot.assignedElements({ flatten: true })].filter((el: HTMLElement) => {
      if (el.getAttribute('role') !== 'menuitem') {
        return false;
      }

      if (!options?.includeDisabled && (el as SlMenuItem).disabled) {
        return false;
      }

      return true;
    }) as SlMenuItem[];
  }

  /**
   * @internal Gets the current menu item, which is the menu item that has `tabindex="0"` within the roving tab index.
   * The menu item may or may not have focus, but for keyboard interaction purposes it's considered the "active" item.
   */
  getCurrentItem() {
    return this.getAllItems({ includeDisabled: false }).find(i => i.getAttribute('tabindex') === '0');
  }

  /**
   * @internal Sets the current menu item to the specified element. This sets `tabindex="0"` on the target element and
   * `tabindex="-1"` to all other items. This method must be called prior to setting focus on a menu item.
   */
  setCurrentItem(item: SlMenuItem) {
    const items = this.getAllItems({ includeDisabled: false });
    let activeItem = item.disabled ? items[0] : item;

    // Update tab indexes
    items.map(i => i.setAttribute('tabindex', i === activeItem ? '0' : '-1'));
  }

  /**
   * Initiates type-to-select logic, which automatically selects an option based on what the user is currently typing.
   * The key passed will be appended to the internal query and the selection will be updated. After a brief period, the
   * internal query is cleared automatically. This method is intended to be used with the keydown event. Useful for
   * enabling type-to-select when the menu doesn't have focus.
   */
  typeToSelect(key: string) {
    const items = this.getAllItems({ includeDisabled: false });
    clearTimeout(this.typeToSelectTimeout);
    this.typeToSelectTimeout = setTimeout(() => (this.typeToSelectString = ''), 750);
    this.typeToSelectString += key.toLowerCase();
    for (const item of items) {
      const slot = item.shadowRoot!.querySelector('slot:not([name])') as HTMLSlotElement;
      const label = getTextContent(slot).toLowerCase().trim();
      if (label.substring(0, this.typeToSelectString.length) === this.typeToSelectString) {
        item.focus();
        break;
      }
    }
  }

  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const item = target.closest('sl-menu-item') as SlMenuItem;

    if (item && !item.disabled) {
      emit(this, 'sl-select', { detail: { item } });
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    // Make a selection when pressing enter
    if (event.key === 'Enter') {
      const item = this.getCurrentItem();
      event.preventDefault();

      if (item) {
        // Simulate a click to support @click handlers on menu items that also work with the keyboard
        item.click();
      }
    }

    // Prevent scrolling when space is pressed
    if (event.key === ' ') {
      event.preventDefault();
    }

    // Move the selection when pressing down or up
    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      const items = this.getAllItems({ includeDisabled: false });
      const activeItem = this.getCurrentItem();
      let index = activeItem ? items.indexOf(activeItem) : 0;

      if (items.length) {
        event.preventDefault();

        if (event.key === 'ArrowDown') {
          index++;
        } else if (event.key === 'ArrowUp') {
          index--;
        } else if (event.key === 'Home') {
          index = 0;
        } else if (event.key === 'End') {
          index = items.length - 1;
        }

        if (index < 0) index = 0;
        if (index > items.length - 1) index = items.length - 1;

        this.setCurrentItem(items[index]);
        items[index].focus();

        return;
      }
    }

    this.typeToSelect(event.key);
  }

  handleMouseDown(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (target.getAttribute('role') === 'menuitem') {
      this.setCurrentItem(target as SlMenuItem);
      target.focus();
    }
  }

  handleSlotChange() {
    const items = this.getAllItems({ includeDisabled: false });

    // Reset the roving tab index when the slotted items change
    if (items.length) {
      this.setCurrentItem(items[0]);
    }
  }

  render() {
    return html`
      <div
        part="base"
        class="menu"
        role="menu"
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-menu': SlMenu;
  }
}
