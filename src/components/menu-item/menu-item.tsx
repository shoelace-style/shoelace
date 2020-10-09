import { Component, Event, EventEmitter, Prop, Watch, h } from '@stencil/core';

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
  @Prop({ reflect: true }) checked = false;

  /**
   * Draws the menu in an active (i.e. or hover/focus), state to indicate the current menu selection. This is used in
   * lieu of standard :hover and :focus states to prevent concurrent interactions from different devices, such as
   * focusing with the keyboard and hovering with the mouse.
   */
  @Prop({ reflect: true }) active = false;

  /** A unique value to store in the menu item. */
  @Prop({ reflect: true }) value = '';

  /** Set to true to draw the menu item in a disabled state. */
  @Prop({ reflect: true }) disabled = false;

  @Watch('active')
  handleActiveChange() {
    this.active ? this.slActivate.emit() : this.slDeactivate.emit();
  }

  /** Emitted when the menu item becomes active. */
  @Event({ eventName: 'sl-activate' }) slActivate: EventEmitter;

  /** Emitted when the menu item becomes inactive. */
  @Event({ eventName: 'sl-deactivate' }) slDeactivate: EventEmitter;

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
        aria-disabled={this.disabled}
        aria-selected={this.checked}
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
