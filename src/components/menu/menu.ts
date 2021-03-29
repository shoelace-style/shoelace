import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, query } from 'lit/decorators';
import { event, EventEmitter } from '../../internal/decorators';
import styles from 'sass:./menu.scss';
import { SlMenuItem } from '../../shoelace';
import { getTextContent } from '../../internal/slot';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The menu's content, including menu items, menu dividers, and menu labels.
 *
 * @part base - The component's base wrapper.
 */
@customElement('sl-menu')
export default class SlMenu extends LitElement {
  static styles = unsafeCSS(styles);

  @query('.menu') menu: HTMLElement;

  private typeToSelectString = '';
  private typeToSelectTimeout: any;

  /** Emitted when a menu item is selected. */
  @event('sl-select') slSelect: EventEmitter<{ item: SlMenuItem }>;

  /**
   * Initiates type-to-select logic, which automatically selects an option based on what the user is currently typing.
   * The key passed will be appended to the internal query and the selection will be updated. After a brief period, the
   * internal query is cleared automatically. This method is intended to be used with the keydown event. Useful for
   * enabling type-to-select when the menu doesn't have focus.
   */
  typeToSelect(key: string) {
    clearTimeout(this.typeToSelectTimeout);
    this.typeToSelectTimeout = setTimeout(() => (this.typeToSelectString = ''), 750);
    this.typeToSelectString += key.toLowerCase();
    const items = this.getItems();
    for (const item of items) {
      const slot = item.shadowRoot!.querySelector('slot:not([name])') as HTMLSlotElement;
      const label = getTextContent(slot).toLowerCase().trim();
      if (label.substring(0, this.typeToSelectString.length) === this.typeToSelectString) {
        item.focus();
        break;
      }
    }
  }

  getItems() {
    const slot = this.menu.querySelector('slot')!;
    return [...slot.assignedElements({ flatten: true })].filter(
      (el: any) => el.tagName.toLowerCase() === 'sl-menu-item' && !el.disabled
    ) as [SlMenuItem];
  }

  getActiveItem() {
    return this.getItems().filter(i => i.shadowRoot!.querySelector('.menu-item--focused'))[0];
  }

  setActiveItem(item: SlMenuItem) {
    item.focus();
  }

  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const item = target.closest('sl-menu-item') as SlMenuItem;

    if (item && !item.disabled) {
      this.slSelect.emit({ detail: { item } });
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    // Make a selection when pressing enter
    if (event.key === 'Enter') {
      const item = this.getActiveItem();
      event.preventDefault();

      if (item) {
        this.slSelect.emit({ detail: { item } });
      }
    }

    // Prevent scrolling when space is pressed
    if (event.key === ' ') {
      event.preventDefault();
    }

    // Move the selection when pressing down or up
    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      const items = this.getItems();
      const selectedItem = this.getActiveItem();
      let index = selectedItem ? items.indexOf(selectedItem) : 0;

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

        this.setActiveItem(items[index]);

        return;
      }
    }

    this.typeToSelect(event.key);
  }

  render() {
    return html`
      <div part="base" class="menu" role="menu" @click=${this.handleClick} @keydown=${this.handleKeyDown} tabindex="0">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-menu': SlMenu;
  }
}
