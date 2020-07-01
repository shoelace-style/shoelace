import { Component, Prop, h } from '@stencil/core';

/**
 * @since 1.0
 * @status stable
 *
 * @slot - The menu item's label.
 * @slot prefix - Used to prepend an icon or similar element to the menu item.
 * @slot suffix - Used to append an icon or similar element to the menu item.
 * @slot check-icon - An icon to use in lieu of the default check icon.
 */

@Component({
  tag: 'sl-menu-item',
  styleUrl: 'menu-item.scss',
  shadow: true
})
export class MenuItem {
  /** Set to true to draw the item in a checked state. */
  @Prop() checked = false;

  /** Set to true to draw the menu item in an active state. */
  @Prop() active = false;

  /** A unique value to store in the menu item. */
  @Prop() value = '';

  /** Set to true to draw the menu item in a disabled state. */
  @Prop() disabled = false;

  render() {
    return (
      <div
        class={{
          'menu-item': true,
          'menu-item--checked': this.checked,
          'menu-item--active': this.active,
          'menu-item--disabled': this.disabled
        }}
        role="menuitem"
        aria-checked={this.checked}
        aria-disabled={this.disabled}
        aria-selected={this.active}
      >
        <span class="menu-item__check">
          <slot name="check-icon">
            <sl-icon name="check2" />
          </slot>
        </span>

        <span class="menu-item__prefix">
          <slot name="prefix" />
        </span>

        <span class="menu-item__label">
          <slot />
        </span>

        <span class="menu-item__suffix">
          <slot name="suffix" />
        </span>
      </div>
    );
  }
}
