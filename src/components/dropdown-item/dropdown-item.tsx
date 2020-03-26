import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';

/**
 * @slot prefix - Used to prepend an icon or similar element to the dropdown item.
 * @slot suffix - Used to append an icon or similar element to the dropdown item.
 * @slot - The dropdown item's label.
 */

@Component({
  tag: 'sh-dropdown-item',
  styleUrl: 'dropdown-item.scss',
  shadow: true
})
export class DropdownItem {
  /** Set to true to draw the item in a checked state. */
  @Prop() checked = false;

  /** Set to true to draw the dropdown item in an active state. */
  @Prop() active = false;

  /** Set to true to draw the dropdown item in a disabled state. */
  @Prop() disabled = false;

  @Event() shoelaceSelect: EventEmitter;

  render() {
    return (
      <div
        class={{
          'sh-dropdown-item': true,
          'sh-dropdown-item--checked': this.checked,
          'sh-dropdown-item--active': this.active,
          'sh-dropdown-item--disabled': this.disabled
        }}
        role="menuitem"
        aria-checked={this.checked}
        aria-disabled={this.disabled}
        aria-selected={this.active}
      >
        <span class="sh-dropdown-item__check">
          <svg
            viewBox="0 0 14 14"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
              <g stroke="currentColor" stroke-width="2">
                <path d="M2,8 L5,12"></path>
                <path d="M12,2 L5,12"></path>
              </g>
            </g>
          </svg>
        </span>

        <span class="sh-dropdown-item__prefix">
          <slot name="prefix" />
        </span>

        <span class="sh-dropdown-item__label">
          <slot />
        </span>

        <span class="sh-dropdown-item__suffix">
          <slot name="suffix" />
        </span>
      </div>
    );
  }
}
