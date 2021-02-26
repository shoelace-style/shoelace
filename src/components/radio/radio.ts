import { classMap, html, Shoemaker } from '@shoelace-style/shoemaker';
import styles from 'sass:./radio.scss';

let id = 0;

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The radio's label.
 *
 * @part base - The component's base wrapper.
 * @part control - The radio control.
 * @part checked-icon - The container the wraps the checked icon.
 * @part label - The radio label.
 *
 * @emit sl-blur - Emitted when the control loses focus.
 * @emit sl-change - Emitted when the control's checked state changes.
 * @emit sl-focus - Emitted when the control gains focus.
 */
export default class SlRadio extends Shoemaker {
  static tag = 'sl-radio';
  static props = ['hasFocus', 'name', 'value', 'disabled', 'checked', 'invalid'];
  static reflect = ['checked', 'invalid'];
  static styles = styles;

  private hasFocus = false;
  private inputId = `radio-${++id}`;
  private labelId = `radio-label-${id}`;
  private input: HTMLInputElement;

  /** The radio's name attribute. */
  name: string;

  /** The radio's value attribute. */
  value: string;

  /** Disables the radio. */
  disabled = false;

  /** Draws the radio in a checked state. */
  checked = false;

  /**
   * This will be true when the control is in an invalid state. Validity in range inputs is determined by the message
   * provided by the `setCustomValidity` method.
   */
  invalid = false;

  /** Sets focus on the radio. */
  setFocus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the radio. */
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

  getAllRadios() {
    const form = this.closest('sl-form, form') || document.body;

    if (!this.name) return [];

    return [...form.querySelectorAll('sl-radio')].filter((radio: this) => radio.name === this.name) as this[];
  }

  getSiblingRadios() {
    return this.getAllRadios().filter(radio => radio !== this) as this[];
  }

  handleClick() {
    this.checked = this.input.checked;
  }

  handleBlur() {
    this.hasFocus = false;
    this.emit('sl-blur');
  }

  handleFocus() {
    this.hasFocus = true;
    this.emit('sl-focus');
  }

  handleKeyDown(event: KeyboardEvent) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      const radios = this.getAllRadios().filter(radio => !radio.disabled);
      const incr = ['ArrowUp', 'ArrowLeft'].includes(event.key) ? -1 : 1;
      let index = radios.indexOf(this) + incr;
      if (index < 0) index = radios.length - 1;
      if (index > radios.length - 1) index = 0;

      this.getAllRadios().map(radio => (radio.checked = false));
      radios[index].setFocus();
      radios[index].checked = true;

      event.preventDefault();
    }
  }

  handleMouseDown(event: MouseEvent) {
    // Prevent clicks on the label from briefly blurring the input
    event.preventDefault();
    this.input.focus();
  }

  watchChecked() {
    if (this.checked) {
      this.getSiblingRadios().map(radio => (radio.checked = false));
    }
    this.input.checked = this.checked;
    this.emit('sl-change');
  }

  render() {
    return html`
      <label
        part="base"
        class=${classMap({
          radio: true,
          'radio--checked': this.checked,
          'radio--disabled': this.disabled,
          'radio--focused': this.hasFocus
        })}
        for=${this.inputId}
        onkeydown=${this.handleKeyDown.bind(this)}
        onmousedown=${this.handleMouseDown.bind(this)}
      >
        <span part="control" class="radio__control">
          <span part="checked-icon" class="radio__icon">
            <svg viewBox="0 0 16 16">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g fill="currentColor">
                  <circle cx="8" cy="8" r="3.42857143"></circle>
                </g>
              </g>
            </svg>
          </span>

          <input
            ref=${(el: HTMLInputElement) => (this.input = el)}
            id=${this.inputId}
            type="radio"
            name=${this.name}
            .value=${this.value}
            checked=${this.checked ? true : null}
            disabled=${this.disabled ? true : null}
            role="radio"
            aria-checked=${this.checked ? 'true' : 'false'}
            aria-labelledby=${this.labelId}
            onclick=${this.handleClick.bind(this)}
            onblur=${this.handleBlur.bind(this)}
            onfocus=${this.handleFocus.bind(this)}
          />
        </span>

        <span part="label" id=${this.labelId} class="radio__label">
          <slot />
        </span>
      </label>
    `;
  }
}
