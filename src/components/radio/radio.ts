import '../icon/icon';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, state } from 'lit/decorators.js';
import { html } from 'lit';
import { watch } from '../../internal/watch';
import ShoelaceElement from '../../internal/shoelace-element';
import styles from './radio.styles';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Radios allow the user to select a single option from a group.
 * @documentation https://shoelace.style/components/radio
 * @status stable
 * @since 2.0
 *
 * @dependency sl-icon
 *
 * @slot - The radio's label.
 *
 * @event sl-blur - Emitted when the control loses focus.
 * @event sl-focus - Emitted when the control gains focus.
 *
 * @csspart base - The component's base wrapper.
 * @csspart control - The circular container that wraps the radio's checked state.
 * @csspart control--checked - The radio control when the radio is checked.
 * @csspart checked-icon - The checked icon, an `<sl-icon>` element.
 * @csspart label - The container that wraps the radio's label.
 */
@customElement('sl-radio')
export default class SlRadio extends ShoelaceElement {
  static styles: CSSResultGroup = styles;

  @state() checked = false;
  @state() protected hasFocus = false;

  /** The radio's value. When selected, the radio group will receive this value. */
  @property() value: string;

  /** The radio's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** Disables the radio. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback() {
    super.connectedCallback();
    this.handleBlur = this.handleBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFocus = this.handleFocus.bind(this);

    this.setInitialAttributes();
    this.addEventListeners();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  private addEventListeners() {
    this.addEventListener('blur', this.handleBlur);
    this.addEventListener('click', this.handleClick);
    this.addEventListener('focus', this.handleFocus);
  }

  private removeEventListeners() {
    this.removeEventListener('blur', this.handleBlur);
    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('focus', this.handleFocus);
  }

  private handleBlur() {
    this.hasFocus = false;
    this.emit('sl-blur');
  }

  private handleClick() {
    if (!this.disabled) {
      this.checked = true;
    }
  }

  private handleFocus() {
    this.hasFocus = true;
    this.emit('sl-focus');
  }

  private setInitialAttributes() {
    this.setAttribute('role', 'radio');
    this.setAttribute('tabindex', '-1');
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
  }

  @watch('checked')
  handleCheckedChange() {
    this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
    this.setAttribute('tabindex', this.checked ? '0' : '-1');
  }

  @watch('disabled', { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
  }

  render() {
    return html`
      <span
        part="base"
        class=${classMap({
          radio: true,
          'radio--checked': this.checked,
          'radio--disabled': this.disabled,
          'radio--focused': this.hasFocus,
          'radio--small': this.size === 'small',
          'radio--medium': this.size === 'medium',
          'radio--large': this.size === 'large'
        })}
      >
        <span part="${`control${this.checked ? ' control--checked' : ''}`}" class="radio__control">
          ${this.checked
            ? html` <sl-icon part="checked-icon" class="radio__checked-icon" library="system" name="radio"></sl-icon> `
            : ''}
        </span>

        <slot part="label" class="radio__label"></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-radio': SlRadio;
  }
}
