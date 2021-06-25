import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit-html/directives/if-defined';
import { emit } from '../../internal/event';
import { watch } from '../../internal/watch';
import styles from 'sass:./checkbox.scss';

let id = 0;

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The checkbox's label.
 *
 * @event sl-blur - Emitted when the control loses focus.
 * @event sl-change - Emitted when the control's checked state changes.
 * @event sl-focus - Emitted when the control gains focus.
 *
 * @csspart base - The component's base wrapper.
 * @csspart control - The checkbox control.
 * @csspart checked-icon - The container the wraps the checked icon.
 * @csspart indeterminate-icon - The container that wraps the indeterminate icon.
 * @csspart label - The checkbox label.
 */
@customElement('sl-checkbox')
export default class SlCheckbox extends LitElement {
  static styles = unsafeCSS(styles);

  @query('input[type="checkbox"]') input: HTMLInputElement;

  private inputId = `checkbox-${++id}`;
  private labelId = `checkbox-label-${id}`;

  @state() private hasFocus = false;

  /** The checkbox's name attribute. */
  @property() name: string;

  /** The checkbox's value attribute. */
  @property() value: string;

  /** Disables the checkbox. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Makes the checkbox a required field. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Draws the checkbox in a checked state. */
  @property({ type: Boolean, reflect: true }) checked = false;

  /** Draws the checkbox in an indeterminate state. */
  @property({ type: Boolean, reflect: true }) indeterminate = false;

  /** This will be true when the control is in an invalid state. Validity is determined by the `required` prop. */
  @property({ type: Boolean, reflect: true }) invalid = false;

  firstUpdated() {
    this.invalid = !this.input.checkValidity();
  }

  /** Simulates a click on the checkbox. */
  click() {
    this.input.click();
  }

  /** Sets focus on the checkbox. */
  focus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the checkbox. */
  blur() {
    this.input.blur();
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    return this.input.reportValidity();
  }

  /** Sets a custom validation message. If `message` is not empty, the field will be considered invalid. */
  setCustomValidity(message: string) {
    this.input.setCustomValidity(message);
    this.invalid = !this.input.checkValidity();
  }

  handleClick() {
    this.checked = !this.checked;
    this.indeterminate = false;
  }

  handleBlur() {
    this.hasFocus = false;
    emit(this, 'sl-blur');
  }

  @watch('disabled')
  handleDisabledChange() {
    // Disabled form controls are always valid, so we need to recheck validity when the state changes
    if (this.input) {
      this.input.disabled = this.disabled;
      this.invalid = !this.input.checkValidity();
    }
  }

  handleFocus() {
    this.hasFocus = true;
    emit(this, 'sl-focus');
  }

  handleLabelMouseDown(event: MouseEvent) {
    // Prevent clicks on the label from briefly blurring the input
    event.preventDefault();
    this.input.focus();
  }

  @watch('checked', { waitUntilFirstUpdate: true })
  @watch('indeterminate', { waitUntilFirstUpdate: true })
  handleStateChange() {
    this.invalid = !this.input.checkValidity();
    emit(this, 'sl-change');
  }

  render() {
    return html`
      <label
        part="base"
        class=${classMap({
          checkbox: true,
          'checkbox--checked': this.checked,
          'checkbox--disabled': this.disabled,
          'checkbox--focused': this.hasFocus,
          'checkbox--indeterminate': this.indeterminate
        })}
        for=${this.inputId}
        @mousedown=${this.handleLabelMouseDown}
      >
        <span part="control" class="checkbox__control">
          ${this.checked
            ? html`
                <span part="checked-icon" class="checkbox__icon">
                  <svg viewBox="0 0 16 16">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                      <g stroke="currentColor" stroke-width="2">
                        <g transform="translate(3.428571, 3.428571)">
                          <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
                          <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
              `
            : ''}
          ${!this.checked && this.indeterminate
            ? html`
                <span part="indeterminate-icon" class="checkbox__icon">
                  <svg viewBox="0 0 16 16">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                      <g stroke="currentColor" stroke-width="2">
                        <g transform="translate(2.285714, 6.857143)">
                          <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
              `
            : ''}

          <input
            id=${this.inputId}
            type="checkbox"
            name=${ifDefined(this.name)}
            value=${ifDefined(this.value)}
            .indeterminate=${this.indeterminate}
            .checked=${this.checked}
            .disabled=${this.disabled}
            .required=${this.required}
            role="checkbox"
            aria-checked=${this.checked ? 'true' : 'false'}
            aria-labelledby=${this.labelId}
            @click=${this.handleClick}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
          />
        </span>

        <span part="label" id=${this.labelId} class="checkbox__label">
          <slot></slot>
        </span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-checkbox': SlCheckbox;
  }
}
