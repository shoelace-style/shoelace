import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';

@Component({
  tag: 'sl-dropdown-item',
  styleUrl: 'dropdown-item.scss',
  scoped: true
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
          'sl-dropdown-item': true,
          'sl-dropdown-item--checked': this.checked,
          'sl-dropdown-item--active': this.active,
          'sl-dropdown-item--disabled': this.disabled
        }}
        role="menuitem"
        aria-checked={this.checked}
        aria-disabled={this.disabled}
        aria-selected={this.active}
      >
        <span class="sl-dropdown-item__check">
          <svg
            viewBox="0 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
              <g transform="translate(2.000000, 2.000000)" stroke="currentColor" stroke-width="4">
                <path d="M0,16 L9,28"></path>
                <path d="M28,0 L9,28"></path>
              </g>
            </g>
          </svg>
        </span>

        <span class="sl-dropdown-item__prefix">
          <slot name="prefix" />
        </span>

        <span class="sl-dropdown-item__label">
          <slot />
        </span>

        <span class="sl-dropdown-item__suffix">
          <slot name="suffix" />
        </span>
      </div>
    );
  }
}
