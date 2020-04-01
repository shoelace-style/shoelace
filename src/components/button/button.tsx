import { Component, Method, Prop, h } from '@stencil/core';

/**
 * @slot prefix - Used to prepend an icon or similar element to the button.
 * @slot suffix - Used to append an icon or similar element to the button.
 * @slot - The button's label.
 */

@Component({
  tag: 'sh-button',
  styleUrl: 'button.scss',
  shadow: true
})
export class Button {
  button: HTMLButtonElement;

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

  /** Set to true to draw a rounded button. */
  @Prop() round = false;

  /** Set to true to draw a circle button. */
  @Prop() circle = false;

  /** The button's tabindex attribute. */
  @Prop() nativeTabindex: number;

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

  render() {
    return (
      <button
        ref={el => (this.button = el)}
        class={{
          'sh-button': true,

          // Types
          'sh-button--default': this.type === 'default',
          'sh-button--primary': this.type === 'primary',
          'sh-button--success': this.type === 'success',
          'sh-button--info': this.type === 'info',
          'sh-button--warning': this.type === 'warning',
          'sh-button--danger': this.type === 'danger',
          'sh-button--text': this.type === 'text',

          // Sizes
          'sh-button--small': this.size === 'small',
          'sh-button--medium': this.size === 'medium',
          'sh-button--large': this.size === 'large',

          // Modifiers
          'sh-button--caret': this.caret,
          'sh-button--circle': this.circle,
          'sh-button--disabled': this.disabled,
          'sh-button--loading': this.loading,
          'sh-button--round': this.round
        }}
        disabled={this.disabled}
        tabIndex={this.nativeTabindex}
      >
        <span class="sh-button__prefix">
          <slot name="prefix" />
        </span>
        <span class="sh-button__label">
          <slot />
        </span>
        <span class="sh-button__suffix">
          <slot name="suffix" />
        </span>
        <span class="sh-button__caret">
          {this.caret ? (
            <svg viewBox="0 0 16 16">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                <g stroke="currentColor">
                  <path d="M4,6.28571429 L7.98653436,10.2722486"></path>
                  <path d="M12,6.28571429 L8,10.2857143"></path>
                </g>
              </g>
            </svg>
          ) : null}
        </span>

        {this.loading ? <span class="sh-button__spinner" /> : ''}
      </button>
    );
  }
}
