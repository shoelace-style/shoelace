import { html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { emit } from 'src/internal/event';
import { watch } from '../../internal/watch';
import styles from './radio.styles';
import type { CSSResultGroup } from 'lit';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The radio's label.
 *
 * @event sl-blur - Emitted when the control loses focus.
 * @event sl-focus - Emitted when the control gains focus.
 *
 * @csspart base - The component's internal wrapper.
 * @csspart control - The radio control.
 * @csspart checked-icon - The container the wraps the checked icon.
 * @csspart label - The radio label.
 */
@customElement('sl-radio')
export default class SlRadio extends LitElement {
  static styles: CSSResultGroup = styles;

  @query('.radio__input') input: HTMLInputElement;

  @state() checked = false;
  @state() protected hasFocus = false;

  /** The radio's name attribute. */
  @property({ reflect: true }) name: string;

  /** The radio's value attribute. */
  @property() value: string;

  /** Disables the radio. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.setInitialAttributes();
    this.addEventListeners();
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

  private handleBlur() {
    this.hasFocus = false;
    emit(this, 'sl-blur');
  }

  private handleClick() {
    if (!this.disabled) {
      this.checked = true;
    }
  }

  private handleFocus() {
    this.hasFocus = true;
    emit(this, 'sl-focus');
  }

  private addEventListeners() {
    this.addEventListener('blur', () => this.handleBlur());
    this.addEventListener('click', () => this.handleClick());
    this.addEventListener('focus', () => this.handleFocus());
  }

  private setInitialAttributes() {
    this.setAttribute('role', 'radio');
    this.setAttribute('tabindex', '-1');
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
          'radio--focused': this.hasFocus
        })}
      >
        <span part="control" class="radio__control">
          <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g fill="currentColor">
                <circle cx="8" cy="8" r="3.42857143"></circle>
              </g>
            </g>
          </svg>
        </span>

        <span part="label" class="radio__label">
          <slot></slot>
        </span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-radio': SlRadio;
  }
}
