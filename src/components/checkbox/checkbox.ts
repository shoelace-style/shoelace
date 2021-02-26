import { classMap, html, Shoemaker } from '@shoelace-style/shoemaker';
import styles from 'sass:./checkbox.scss';

let id = 0;

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The checkbox's label.
 *
 * @part base - The component's base wrapper.
 * @part control - The checkbox control.
 * @part checked-icon - The container the wraps the checked icon.
 * @part indeterminate-icon - The container that wraps the indeterminate icon.
 * @part label - The checkbox label.
 *
 * @emit sl-blur - Emitted when the control loses focus.
 * @emit sl-change - Emitted when the control's checked state changes.
 * @emit sl-focus - Emitted when the control gains focus.
 */
export default class SlCheckbox extends Shoemaker {
  static tag = 'sl-checkbox';
  static props = ['hasFocus', 'name', 'value', 'disabled', 'required', 'checked', 'indeterminate', 'invalid'];
  static reflect = ['checked', 'indeterminate', 'invalid'];
  static styles = styles;

  private inputId = `checkbox-${++id}`;
  private labelId = `checkbox-label-${id}`;
  private hasFocus = false;
  private input: HTMLInputElement;

  /** The checkbox's name attribute. */
  name: string;

  /** The checkbox's value attribute. */
  value: string;

  /** Disables the checkbox. */
  disabled = false;

  /** Makes the checkbox a required field. */
  required = false;

  /** Draws the checkbox in a checked state. */
  checked = false;

  /** Draws the checkbox in an indeterminate state. */
  indeterminate = false;

  /** This will be true when the control is in an invalid state. Validity is determined by the `required` prop. */
  invalid = false;

  onReady() {
    this.input.indeterminate = this.indeterminate;
  }

  /** Sets focus on the checkbox. */
  setFocus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the checkbox. */
  removeFocus() {
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
    this.checked = this.input.checked;
    this.indeterminate = false;
  }

  handleBlur() {
    this.hasFocus = false;
    this.emit('sl-blur');
  }

  handleFocus() {
    this.hasFocus = true;
    this.emit('sl-focus');
  }

  handleLabelMouseDown(event: MouseEvent) {
    // Prevent clicks on the label from briefly blurring the input
    event.preventDefault();
    this.input.focus();
  }

  handleStateChange() {
    this.input.checked = this.checked;
    this.input.indeterminate = this.indeterminate;
    this.emit('sl-change');
  }

  watchChecked() {
    this.handleStateChange();
  }

  watchIndeterminate() {
    this.handleStateChange();
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
        onmousedown=${this.handleLabelMouseDown.bind(this)}
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
            ref=${(el: HTMLInputElement) => (this.input = el)}
            id=${this.inputId}
            type="checkbox"
            name=${this.name}
            .value=${this.value}
            checked=${this.checked ? true : null}
            disabled=${this.disabled ? true : null}
            required=${this.required ? true : null}
            role="checkbox"
            aria-checked=${this.checked ? 'true' : 'false'}
            aria-labelledby=${this.labelId}
            onclick=${this.handleClick.bind(this)}
            onblur=${this.handleBlur.bind(this)}
            onfocus=${this.handleFocus.bind(this)}
          />
        </span>

        <span part="label" id=${this.labelId} class="checkbox__label">
          <slot />
        </span>
      </label>
    `;
  }
}
