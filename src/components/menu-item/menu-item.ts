import { classMap, html, Shoemaker } from '@shoelace-style/shoemaker';
import styles from 'sass:./menu-item.scss';

/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon
 *
 * @slot - The menu item's label.
 * @slot prefix - Used to prepend an icon or similar element to the menu item.
 * @slot suffix - Used to append an icon or similar element to the menu item.
 *
 * @part base - The component's base wrapper.
 * @part checked-icon - The container that wraps the checked icon.
 * @part prefix - The prefix container.
 * @part label - The menu item label.
 * @part suffix - The suffix container.
 */
export default class SlMenuItem extends Shoemaker {
  static tag = 'sl-menu-item';
  static props = ['hasFocus', 'checked', 'value', 'disabled'];
  static reflect = ['checked', 'disabled'];
  static styles = styles;

  private hasFocus = false;
  private menuItem: HTMLElement;

  /** Draws the item in a checked state. */
  checked = false;

  /** A unique value to store in the menu item. This can be used as a way to identify menu items when selected. */
  value = '';

  /** Draws the menu item in a disabled state. */
  disabled = false;

  /** Sets focus on the button. */
  setFocus(options?: FocusOptions) {
    this.menuItem.focus(options);
  }

  /** Removes focus from the button. */
  removeFocus() {
    this.menuItem.blur();
  }

  handleBlur() {
    this.hasFocus = false;
  }

  handleFocus() {
    this.hasFocus = true;
  }

  handleMouseEnter() {
    this.setFocus();
  }

  handleMouseLeave() {
    this.removeFocus();
  }

  render() {
    return html`
      <div
        ref=${(el: HTMLElement) => (this.menuItem = el)}
        part="base"
        class=${classMap({
          'menu-item': true,
          'menu-item--checked': this.checked,
          'menu-item--disabled': this.disabled,
          'menu-item--focused': this.hasFocus
        })}
        role="menuitem"
        aria-disabled=${this.disabled ? 'true' : 'false'}
        aria-checked=${this.checked ? 'true' : 'false'}
        tabindex=${!this.disabled ? '0' : null}
        onfocus=${this.handleFocus.bind(this)}
        onblur=${this.handleBlur.bind(this)}
        onmouseenter=${this.handleMouseEnter.bind(this)}
        onmouseleave=${this.handleMouseLeave.bind(this)}
      >
        <span part="checked-icon" class="menu-item__check">
          <sl-icon name="check2" aria-hidden="true" />
        </span>

        <span part="prefix" class="menu-item__prefix">
          <slot name="prefix" />
        </span>

        <span part="label" class="menu-item__label">
          <slot />
        </span>

        <span part="suffix" class="menu-item__suffix">
          <slot name="suffix" />
        </span>
      </div>
    `;
  }
}
