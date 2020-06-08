import { Component, Event, EventEmitter, Method, Prop, State, h } from '@stencil/core';

/**
 * @since 1.0.0
 * @status ready
 *
 * @slot - The button's label.
 * @slot prefix - Used to prepend an icon or similar element to the button.
 * @slot suffix - Used to append an icon or similar element to the button.
 */

@Component({
  tag: 'sl-button',
  styleUrl: 'button.scss',
  shadow: true
})
export class Button {
  button: HTMLButtonElement;

  constructor() {
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  @State() hasFocus = false;

  /** The button's type. */
  @Prop() type: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'text' = 'default';

  /** The button's size. */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /** Set to true to draw the button with a caret for use with dropdowns, popovers, etc. */
  @Prop() caret = false;

  /** Set to true to disable the button. */
  @Prop() disabled = false;

  /** Set to true to draw the button in a loading state. */
  @Prop() loading = false;

  /** Set to true to draw a pill-style button with rounded edges. */
  @Prop() pill = false;

  /** Set to true to draw a circle button. */
  @Prop() circle = false;

  /** Emitted when the button loses focus. */
  @Event() slBlur: EventEmitter;

  /** Emitted when the button gains focus. */
  @Event() slFocus: EventEmitter;

  /** Sets focus on the button. */
  @Method()
  async setFocus() {
    this.button.focus();
  }

  /** Removes focus from the button. */
  @Method()
  async removeFocus() {
    this.button.blur();
  }

  handleBlur() {
    this.hasFocus = false;
    this.slBlur.emit();
  }

  handleFocus() {
    this.hasFocus = true;
    this.slFocus.emit();
  }

  render() {
    return (
      <button
        ref={el => (this.button = el)}
        class={{
          'sl-button': true,

          // Types
          'sl-button--default': this.type === 'default',
          'sl-button--primary': this.type === 'primary',
          'sl-button--success': this.type === 'success',
          'sl-button--info': this.type === 'info',
          'sl-button--warning': this.type === 'warning',
          'sl-button--danger': this.type === 'danger',
          'sl-button--text': this.type === 'text',

          // Sizes
          'sl-button--small': this.size === 'small',
          'sl-button--medium': this.size === 'medium',
          'sl-button--large': this.size === 'large',

          // Modifiers
          'sl-button--caret': this.caret,
          'sl-button--circle': this.circle,
          'sl-button--disabled': this.disabled,
          'sl-button--focused': this.hasFocus,
          'sl-button--loading': this.loading,
          'sl-button--pill': this.pill
        }}
        disabled={this.disabled}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
      >
        <span class="sl-button__prefix">
          <slot name="prefix" />
        </span>
        <span class="sl-button__label">
          <slot />
        </span>
        <span class="sl-button__suffix">
          <slot name="suffix" />
        </span>
        {this.caret && (
          <span class="sl-button__caret">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        )}

        {this.loading && <span class="sl-button__spinner" />}

        <span class="sl-button__split">
          <slot name="split" />
        </span>
      </button>
    );
  }
}
