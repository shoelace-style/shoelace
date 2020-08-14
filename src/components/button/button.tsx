import { Component, Event, EventEmitter, Method, Prop, State, h } from '@stencil/core';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The button's label.
 * @slot prefix - Used to prepend an icon or similar element to the button.
 * @slot suffix - Used to append an icon or similar element to the button.
 *
 * @part base - The component's base wrapper.
 * @part prefix - The prefix container.
 * @part label - The button's label.
 * @part suffix - The suffix container.
 * @part caret - The button's caret.
 */

@Component({
  tag: 'sl-button',
  styleUrl: 'button.scss',
  shadow: true
})
export class Button {
  button: HTMLButtonElement;

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

  /** Indicates if activating the button should submit the form. Ignored when `href` is set. */
  @Prop() submit = false;

  /** An optional name for the button. Ignored when `href` is set. */
  @Prop() name: string;

  /** An optional value for the button. Ignored when `href` is set. */
  @Prop() value: string;

  /** When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`. */
  @Prop() href: string;

  /** Tells the browser where to open the link. Only used when `href` is set. */
  @Prop() target: '_blank' | '_parent' | '_self' | '_top';

  /** Tells the browser to download the linked file as this filename. Only used when `href` is set. */
  @Prop() download: string;

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

  render() {
    const isLink = this.href ? true : false;
    const isButton = !isLink;
    const Button = isLink ? 'a' : 'button';

    return (
      <Button
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
        disabled={this.disabled}
        type={isButton ? (this.submit ? 'submit' : 'button') : null}
        name={isButton ? this.name : null}
        value={isButton ? this.value : null}
        href={isLink && this.href}
        target={isLink && this.target ? this.target : null}
        download={isLink && this.download ? this.download : null}
        rel={isLink && this.target ? 'noreferrer noopener' : null}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onClick={this.handleClick}
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
      </Button>
    );
  }
}
