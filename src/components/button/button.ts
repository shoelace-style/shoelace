import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit-html/directives/if-defined';
import { emit } from '../../internal/event';
import { hasSlot } from '../../internal/slot';
import styles from 'sass:./button.scss';

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
  static styles = unsafeCSS(styles);

  @query('.button') button: HTMLButtonElement | HTMLLinkElement;

  @state() private hasFocus = false;
  @state() private hasLabel = false;
  @state() private hasPrefix = false;
  @state() private hasSuffix = false;

  /** The button's type. */
  @property({ reflect: true }) type: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'text' =
    'default';

  /** The button's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** Draws the button with a caret for use with dropdowns, popovers, etc. */
  @property({ type: Boolean, reflect: true }) caret = false;

  /** Disables the button. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Draws the button in a loading state. */
  @property({ type: Boolean, reflect: true }) loading = false;

  /** Draws a pill-style button with rounded edges. */
  @property({ type: Boolean, reflect: true }) pill = false;

  /** Draws a circle button. */
  @property({ type: Boolean, reflect: true }) circle = false;

  /** Indicates if activating the button should submit the form. Ignored when `href` is set. */
  @property({ type: Boolean, reflect: true }) submit = false;

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

  connectedCallback() {
    super.connectedCallback();
    this.handleSlotChange();
  }

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

  handleSlotChange() {
    this.hasLabel = hasSlot(this);
    this.hasPrefix = hasSlot(this, 'prefix');
    this.hasSuffix = hasSlot(this, 'suffix');
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
    }
  }

  render() {
    const isLink = this.href ? true : false;

    const interior = html`
      <span part="prefix" class="button__prefix">
        <slot @slotchange=${this.handleSlotChange} name="prefix"></slot>
      </span>
      <span part="label" class="button__label">
        <slot @slotchange=${this.handleSlotChange}></slot>
      </span>
      <span part="suffix" class="button__suffix">
        <slot @slotchange=${this.handleSlotChange} name="suffix"></slot>
      </span>
      ${this.caret
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
        : ''}
      ${this.loading ? html`<sl-spinner></sl-spinner>` : ''}
    `;

    const button = html`
      <button
        part="base"
        class=${classMap({
          button: true,
          'button--default': this.type === 'default',
          'button--primary': this.type === 'primary',
          'button--success': this.type === 'success',
          'button--info': this.type === 'info',
          'button--warning': this.type === 'warning',
          'button--danger': this.type === 'danger',
          'button--text': this.type === 'text',
          'button--small': this.size === 'small',
          'button--medium': this.size === 'medium',
          'button--large': this.size === 'large',
          'button--caret': this.caret,
          'button--circle': this.circle,
          'button--disabled': this.disabled,
          'button--focused': this.hasFocus,
          'button--loading': this.loading,
          'button--pill': this.pill,
          'button--has-label': this.hasLabel,
          'button--has-prefix': this.hasPrefix,
          'button--has-suffix': this.hasSuffix
        })}
        ?disabled=${this.disabled}
        type=${this.submit ? 'submit' : 'button'}
        name=${ifDefined(this.name)}
        value=${ifDefined(this.value)}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        ${interior}
      </button>
    `;

    const link = html`
      <a
        ref=${(el: HTMLLinkElement) => (this.button = el)}
        part="base"
        class=${classMap({
          button: true,
          'button--default': this.type === 'default',
          'button--primary': this.type === 'primary',
          'button--success': this.type === 'success',
          'button--info': this.type === 'info',
          'button--warning': this.type === 'warning',
          'button--danger': this.type === 'danger',
          'button--text': this.type === 'text',
          'button--small': this.size === 'small',
          'button--medium': this.size === 'medium',
          'button--large': this.size === 'large',
          'button--caret': this.caret,
          'button--circle': this.circle,
          'button--disabled': this.disabled,
          'button--focused': this.hasFocus,
          'button--loading': this.loading,
          'button--pill': this.pill,
          'button--has-label': this.hasLabel,
          'button--has-prefix': this.hasPrefix,
          'button--has-suffix': this.hasSuffix
        })}
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
        ${interior}
      </a>
    `;

    return isLink ? link : button;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-button': SlButton;
  }
}
