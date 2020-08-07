import { Component, Event, EventEmitter, Method, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'sl-link-button',
  styleUrl: '../button/button.scss',
  shadow: true
})
export class LinkButton {
  button: HTMLAnchorElement;

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

  /** An optional name for the button. */
  @Prop() name: string;

  /** Set to true to draw a pill-style button with rounded edges. */
  @Prop() pill = false;

  /** Set to true to draw a circle button. */
  @Prop() circle = false;

  /** An optional value for the button. */
  @Prop() value: string;

  /** Indicates if activating the button should submit the form. */
  @Prop() submit = false;

  /** Emitted when the button loses focus. */
  @Event() slBlur: EventEmitter;

  /** Emitted when the button gains focus. */
  @Event() slFocus: EventEmitter;

  connectedCallback() {
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

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

  handleClick(event: MouseEvent) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  /** An url destination of the button. */
  @Prop() href: string;

  /** Set the browsing context of the link */
  @Prop() target: string;

  render() {
    return (
      <a
        ref={el => (this.button = el)}
        part="base"
        class={{
          button: true,

          // Types
          'button--default': this.type === 'default',
          'button--primary': this.type === 'primary',
          'button--success': this.type === 'success',
          'button--info': this.type === 'info',
          'button--warning': this.type === 'warning',
          'button--danger': this.type === 'danger',
          'button--text': this.type === 'text',

          // Sizes
          'button--small': this.size === 'small',
          'button--medium': this.size === 'medium',
          'button--large': this.size === 'large',

          // Modifiers
          'button--caret': this.caret,
          'button--circle': this.circle,
          'button--disabled': this.disabled,
          'button--focused': this.hasFocus,
          'button--loading': this.loading,
          'button--pill': this.pill
        }}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onClick={this.handleClick}
        href={this.href}
        target={this.target}
      >
        <span part="prefix" class="button__prefix">
          <slot name="prefix" />
        </span>
        <span part="label" class="button__label">
          <slot />
        </span>
        <span part="suffix" class="button__suffix">
          <slot name="suffix" />
        </span>
        {this.caret && (
          <span part="caret" class="button__caret">
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

        {this.loading && <sl-spinner />}
      </a>
    );
  }
}
