import { Component, Element, Event, EventEmitter, Host, Method, Prop, State, h } from '@stencil/core';

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

  @Element() host: HTMLSlButtonElement;

  @State() hasFocus = false;

  /** The button's type. */
  @Prop({ reflect: true }) type: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'text' = 'default';

  /** The button's size. */
  @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** Set to true to draw the button with a caret for use with dropdowns, popovers, etc. */
  @Prop({ reflect: true }) caret = false;

  /** Set to true to disable the button. */
  @Prop({ reflect: true }) disabled = false;

  /** Set to true to draw the button in a loading state. */
  @Prop({ reflect: true }) loading = false;

  /** Set to true to draw a pill-style button with rounded edges. */
  @Prop({ reflect: true }) pill = false;

  /** Set to true to draw a circle button. */
  @Prop({ reflect: true }) circle = false;

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
      <Host>
        <button
          id="button"
          ref={el => (this.button = el)}
          disabled={this.disabled}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
        >
          <span id="prefix">
            <slot name="prefix" />
          </span>
          <span id="label">
            <slot />
          </span>
          <span id="suffix">
            <slot name="suffix" />
          </span>
          {this.caret && (
            <span id="caret">
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

          {this.loading && <span id="spinner" />}
        </button>
      </Host>
    );
  }
}
