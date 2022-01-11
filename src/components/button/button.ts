import { LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { html, literal } from 'lit/static-html.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { emit } from '../../internal/event';
import { FormSubmitController } from '../../internal/form-control';
import { HasSlotController } from '../../internal/slot';
import styles from './button.styles';

import '../spinner/spinner';

/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-spinner
 *
 * @event sl-blur - Emitted when the button loses focus.
 * @event sl-focus - Emitted when the button gains focus.
 *
 * @slot - The button's label.
 * @slot prefix - Used to prepend an icon or similar element to the button.
 * @slot suffix - Used to append an icon or similar element to the button.
 *
 * @csspart base - The component's base wrapper.
 * @csspart prefix - The prefix container.
 * @csspart label - The button's label.
 * @csspart suffix - The suffix container.
 * @csspart caret - The button's caret.
 */
@customElement('sl-button')
export default class SlButton extends LitElement {
  static styles = styles;

  @query('.button') button: HTMLButtonElement | HTMLLinkElement;

  private formSubmitController = new FormSubmitController(this);
  private hasSlotController = new HasSlotController(this, '[default]', 'prefix', 'suffix');

  @state() private hasFocus = false;

  /** The button's variant. */
  @property({ reflect: true }) variant: 'default' | 'primary' | 'success' | 'neutral' | 'warning' | 'danger' | 'text' =
    'default';

  /** The button's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** Draws the button with a caret for use with dropdowns, popovers, etc. */
  @property({ type: Boolean, reflect: true }) caret = false;

  /** Disables the button. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Draws the button in a loading state. */
  @property({ type: Boolean, reflect: true }) loading = false;

  /** Draws an outlined button. */
  @property({ type: Boolean, reflect: true }) outline = false;

  /** Draws a pill-style button with rounded edges. */
  @property({ type: Boolean, reflect: true }) pill = false;

  /** Draws a circle button. */
  @property({ type: Boolean, reflect: true }) circle = false;

  /**
   * The type of button. When the type is `submit`, the button will submit the surrounding form. Note that the default
   * value is `button` instead of `submit`, which is opposite of how native `<button>` elements behave.
   */
  @property() type: 'button' | 'submit' = 'button';

  /** An optional name for the button. Ignored when `href` is set. */
  @property() name: string;

  /** An optional value for the button. Ignored when `href` is set. */
  @property() value: string;

  /** When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`. */
  @property() href: string;

  /** Tells the browser where to open the link. Only used when `href` is set. */
  @property() target: '_blank' | '_parent' | '_self' | '_top';

  /** Tells the browser to download the linked file as this filename. Only used when `href` is set. */
  @property() download: string;

  /** Simulates a click on the button. */
  click() {
    this.button.click();
  }

  /** Sets focus on the button. */
  focus(options?: FocusOptions) {
    this.button.focus(options);
  }

  /** Removes focus from the button. */
  blur() {
    this.button.blur();
  }

  handleBlur() {
    this.hasFocus = false;
    emit(this, 'sl-blur');
  }

  handleFocus() {
    this.hasFocus = true;
    emit(this, 'sl-focus');
  }

  handleClick(event: MouseEvent) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (this.type === 'submit') {
      this.formSubmitController.submit();
    }
  }

  render() {
    const isLink = this.href ? true : false;
    const tag = isLink ? literal`a` : literal`button`;

    return html`
      <${tag}
        part="base"
        class=${classMap({
          button: true,
          'button--default': this.variant === 'default',
          'button--primary': this.variant === 'primary',
          'button--success': this.variant === 'success',
          'button--neutral': this.variant === 'neutral',
          'button--warning': this.variant === 'warning',
          'button--danger': this.variant === 'danger',
          'button--text': this.variant === 'text',
          'button--small': this.size === 'small',
          'button--medium': this.size === 'medium',
          'button--large': this.size === 'large',
          'button--caret': this.caret,
          'button--circle': this.circle,
          'button--disabled': this.disabled,
          'button--focused': this.hasFocus,
          'button--loading': this.loading,
          'button--standard': !this.outline,
          'button--outline': this.outline,
          'button--pill': this.pill,
          'button--has-label': this.hasSlotController.test('[default]'),
          'button--has-prefix': this.hasSlotController.test('prefix'),
          'button--has-suffix': this.hasSlotController.test('suffix')
        })}
        ?disabled=${ifDefined(isLink ? undefined : this.disabled)}
        type=${this.type}
        name=${ifDefined(isLink ? undefined : this.name)}
        value=${ifDefined(isLink ? undefined : this.value)}
        href=${ifDefined(this.href)}
        target=${ifDefined(this.target)}
        download=${ifDefined(this.download)}
        rel=${ifDefined(this.target ? 'noreferrer noopener' : undefined)}
        role="button"
        aria-disabled=${this.disabled ? 'true' : 'false'}
        tabindex=${this.disabled ? '-1' : '0'}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <span part="prefix" class="button__prefix">
          <slot name="prefix"></slot>
        </span>
        <span part="label" class="button__label">
          <slot></slot>
        </span>
        <span part="suffix" class="button__suffix">
          <slot name="suffix"></slot>
        </span>
        ${
          this.caret
            ? html`
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
              `
            : ''
        }
        ${this.loading ? html`<sl-spinner></sl-spinner>` : ''}
      </${tag}>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-button': SlButton;
  }
}
