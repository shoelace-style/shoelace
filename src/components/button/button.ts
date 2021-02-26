import { classMap, html, Shoemaker } from '@shoelace-style/shoemaker';
import styles from 'sass:./button.scss';
import { hasSlot } from '../../internal/slot';

/**
 * @tag sl-button
 * @since 2.0
 * @status stable
 *
 * @dependency sl-spinner
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
 *
 * @emit sl-blur - Emitted when the button loses focus.
 * @emit sl-focus - Emitted when the button gains focus.
 */
export default class SlButton extends Shoemaker {
  static tag = 'sl-button';
  static props = [
    'hasFocus',
    'hasLabel',
    'hasPrefix',
    'hasSuffix',
    'type',
    'size',
    'caret',
    'disabled',
    'loading',
    'pill',
    'circle',
    'submit',
    'name',
    'value',
    'href',
    'target',
    'download'
  ];
  static reflect = ['type', 'size', 'caret', 'disabled', 'loading', 'pill', 'circle', 'submit'];
  static styles = styles;

  private button: HTMLButtonElement | HTMLLinkElement;
  private hasFocus = false;
  private hasLabel = false;
  private hasPrefix = false;
  private hasSuffix = false;

  /** The button's type. */
  type: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'text' = 'default';

  /** The button's size. */
  size: 'small' | 'medium' | 'large' = 'medium';

  /** Draws the button with a caret for use with dropdowns, popovers, etc. */
  caret = false;

  /** Disables the button. */
  disabled = false;

  /** Draws the button in a loading state. */
  loading = false;

  /** Draws a pill-style button with rounded edges. */
  pill = false;

  /** Draws a circle button. */
  circle = false;

  /** Indicates if activating the button should submit the form. Ignored when `href` is set. */
  submit = false;

  /** An optional name for the button. Ignored when `href` is set. */
  name: string;

  /** An optional value for the button. Ignored when `href` is set. */
  value: string;

  /** When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`. */
  href: string;

  /** Tells the browser where to open the link. Only used when `href` is set. */
  target: '_blank' | '_parent' | '_self' | '_top';

  /** Tells the browser to download the linked file as this filename. Only used when `href` is set. */
  download: string;

  onConnect() {
    this.handleSlotChange();
  }

  /** setFocus - Sets focus on the button. */
  setFocus(options?: FocusOptions) {
    this.button.focus(options);
  }

  /** removeFocus - Removes focus from the button. */
  removeFocus() {
    this.button.blur();
  }

  handleSlotChange() {
    this.hasLabel = hasSlot(this);
    this.hasPrefix = hasSlot(this, 'prefix');
    this.hasSuffix = hasSlot(this, 'suffix');
  }

  handleBlur() {
    this.hasFocus = false;
    this.emit('sl-blur');
  }

  handleFocus() {
    this.hasFocus = true;
    this.emit('sl-focus');
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
        <slot onslotchange=${this.handleSlotChange.bind(this)} name="prefix" />
      </span>
      <span part="label" class="button__label">
        <slot onslotchange=${this.handleSlotChange.bind(this)} />
      </span>
      <span part="suffix" class="button__suffix">
        <slot onslotchange=${this.handleSlotChange.bind(this)} name="suffix" />
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
      ${this.loading ? html`<sl-spinner />` : ''}
    `;

    const button = html`
      <button
        ref=${(el: HTMLButtonElement) => (this.button = el)}
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
        disabled=${this.disabled ? true : null}
        type=${this.submit ? 'submit' : 'button'}
        name=${this.name}
        value=${this.value}
        onblur=${this.handleBlur.bind(this)}
        onfocus=${this.handleFocus.bind(this)}
        onclick=${this.handleClick.bind(this)}
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
        href=${this.href}
        target=${this.target ? this.target : null}
        download=${this.download ? this.download : null}
        rel=${this.target ? 'noreferrer noopener' : null}
        onblur=${this.handleBlur.bind(this)}
        onfocus=${this.handleFocus.bind(this)}
        onclick=${this.handleClick.bind(this)}
      >
        ${interior}
      </a>
    `;

    return isLink ? link : button;
  }
}
