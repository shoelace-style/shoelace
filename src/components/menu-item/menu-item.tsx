import { Component, Method, Prop, State, h } from '@stencil/core';

/**
 * @since 2.0
 * @status stable
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

@Component({
  tag: 'sl-menu-item',
  styleUrl: 'menu-item.scss',
  shadow: true
})
export class MenuItem {
  menuItem: HTMLElement;

  @State() hasFocus = false;

  /** Set to true to draw the item in a checked state. */
  @Prop({ reflect: true }) checked = false;

  /** A unique value to store in the menu item. */
  @Prop({ reflect: true }) value = '';

  /** Set to true to draw the menu item in a disabled state. */
  @Prop({ reflect: true }) disabled = false;

  connectedCallback() {
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  /** Sets focus on the button. */
  @Method()
  async setFocus() {
    this.menuItem.focus();
  }

  /** Removes focus from the button. */
  @Method()
  async removeFocus() {
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
    return (
      <div
        ref={el => (this.menuItem = el)}
        part="base"
        class={{
          'menu-item': true,
          'menu-item--checked': this.checked,
          'menu-item--disabled': this.disabled,
          'menu-item--focused': this.hasFocus
        }}
        role="menuitem"
        aria-disabled={this.disabled ? 'true' : 'false'}
        aria-checked={this.checked ? 'true' : 'false'}
        tabIndex={!this.disabled ? 0 : null}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
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
    );
  }
}
