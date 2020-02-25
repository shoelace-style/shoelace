import { Component, Host, Method, Prop, h } from '@stencil/core';

/**
 * @slot prefix - Used to prepend an icon or similar element to the button.
 * @slot suffix - Used to append an icon or similar element to the button.
 * @slot - The button's label.
 */

@Component({
  tag: 'sl-button',
  styleUrl: 'button.scss',
  shadow: true
})
export class Button {
  button: HTMLButtonElement;

  /** The button's type. */
  @Prop() type: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'text' = 'default';

  /** The button's size. */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /** Set to true to draw a full-width button. */
  @Prop() block = false;

  /**
   * Set to true to draw the button with a caret for use with dropdowns, popovers, etc. If this is enabled, the suffix
   * slot will not be displayed.
   */
  @Prop() caret = false;

  /** Set to true to disable the button. */
  @Prop() disabled = false;

  /** Set to true to draw the button in a loading state. */
  @Prop() loading = false;

  /** Set to true to draw an outlined button. */
  @Prop() outline = false;

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
      <Host
        style={{
          display: this.block ? 'block' : null
        }}
      >
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
            'sl-button--block': this.block,
            'sl-button--caret': this.caret,
            'sl-button--circle': this.circle,
            'sl-button--disabled': this.disabled,
            'sl-button--loading': this.loading,
            'sl-button--outline': this.outline,
            'sl-button--round': this.round
          }}
          disabled={this.disabled}
          tabIndex={this.nativeTabindex}
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
          <span class="sl-button__caret">
            {this.caret ? (
              <svg
                viewBox="0 0 16 16"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                  <g stroke="currentColor">
                    <path d="M4,6.28571429 L7.98653436,10.2722486"></path>
                    <path d="M12,6.28571429 L8,10.2857143"></path>
                  </g>
                </g>
              </svg>
            ) : null}
          </span>

          {this.loading ? <span class="sl-button__spinner" /> : ''}
        </button>
      </Host>
    );
  }
}
