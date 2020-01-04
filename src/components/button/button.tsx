import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 's-button',
  styleUrl: 'button.scss',
  scoped: true,
  shadow: false
})
export class ShoelaceButton {
  /** The button's type, one of `default`, `primary`, `success`, `info`, `warning`, `danger`, or `text`. */
  @Prop() type = 'default';

  /** The button's size, one of `small`, `medium`, or `large`. */
  @Prop() size = 'medium';

  /** Set to true to draw an outlined button. */
  @Prop() outline = false;

  /** Set to true to draw a rounded button. */
  @Prop() round = false;

  /** Set to true to draw a circle button. */
  @Prop() circle = false;

  /** Set to true to disable the button. */
  @Prop() disabled = false;

  /** Set to true to draw the button in a loading state. */
  @Prop() loading = false;

  render() {
    return (
      <button
        class={{
          's-button': true,

          // Types
          's-button--default': this.type === 'default',
          's-button--primary': this.type === 'primary',
          's-button--success': this.type === 'success',
          's-button--info': this.type === 'info',
          's-button--warning': this.type === 'warning',
          's-button--danger': this.type === 'danger',
          's-button--text': this.type === 'text',

          // Sizes
          's-button--small': this.size === 'small',
          's-button--medium': this.size === 'medium',
          's-button--large': this.size === 'large',

          // Modifiers
          's-button--disabled': this.disabled,
          's-button--loading': this.loading,
          's-button--outline': this.outline,
          's-button--round': this.round,
          's-button--circle': this.circle
        }}
        disabled={this.disabled}
      >
        <span class="s-button__prefix">
          <slot name="prefix" />
        </span>
        <span class="s-button__label">
          <slot />
        </span>
        <span class="s-button__suffix">
          <slot name="suffix" />
        </span>

        {this.loading ? <span class="s-button__loader" /> : ''}
      </button>
    );
  }
}
