import { Component, Prop, h } from '@stencil/core';

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
        part="base"
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
        <span part="checked-icon" class="menu-item__check">
          <sl-icon name="check2" />
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
