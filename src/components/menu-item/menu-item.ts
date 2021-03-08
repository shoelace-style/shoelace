import { LitElement, html, internalProperty, property, query, unsafeCSS } from 'lit-element';
import { tag } from '../../internal/decorators';
import { classMap } from 'lit-html/directives/class-map';
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
@tag('sl-menu-item')
export class SlMenuItem extends LitElement {
  static styles = unsafeCSS(styles);

  @query('.menu-item') menuItem: HTMLElement;

  @internalProperty() private hasFocus = false;

  /** Draws the item in a checked state. */
  @property({ type: Boolean, reflect: true }) checked = false;

  /** A unique value to store in the menu item. This can be used as a way to identify menu items when selected. */
  @property() value = '';

  /** Draws the menu item in a disabled state. */
  @property({ type: Boolean, reflect: true }) disabled = false;

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
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <span part="checked-icon" class="menu-item__check">
          <sl-icon name="check2" aria-hidden="true"></sl-icon>
        </span>

        <span part="prefix" class="menu-item__prefix">
          <slot name="prefix"></slot>
        </span>

        <span part="label" class="menu-item__label">
          <slot></slot>
        </span>

        <span part="suffix" class="menu-item__suffix">
          <slot name="suffix"></slot>
        </span>
      </div>
    `;
  }
}
