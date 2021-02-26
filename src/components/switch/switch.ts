import { classMap, html, Shoemaker } from '@shoelace-style/shoemaker';
import styles from 'sass:./switch.scss';

let id = 0;

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The switch's label.
 *
 * @part base - The component's base wrapper.
 * @part control - The switch control.
 * @part thumb - The switch position indicator.
 * @part label - The switch label.
 *
 * @emit sl-blur - Emitted when the control loses focus.
 * @emit sl-change - Emitted when the control's checked state changes.
 * @emit sl-focus - Emitted when the control gains focus.
 */
export default class SlSwitch extends Shoemaker {
  static tag = 'sl-switch';
  static props = ['hasFocus', 'name', 'value', 'disabled', 'required', 'checked', 'invalid'];
  static reflect = ['disabled', 'checked', 'invalid'];
  static styles = styles;

  private switchId = `switch-${++id}`;
  private labelId = `switch-label-${id}`;
  private input: HTMLInputElement;
  private hasFocus = false;

  /** The switch's name attribute. */
  name: string;

  /** The switch's value attribute. */
  value: string;

  /** Disables the switch. */
  disabled = false;

  /** Makes the switch a required field. */
  required = false;

  /** Draws the switch in a checked state. */
  checked = false;

  /** This will be true when the control is in an invalid state. Validity is determined by the `required` prop. */
  invalid = false;

  /** Sets focus on the switch. */
  setFocus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the switch. */
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
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.checked = false;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.checked = true;
    }
  }

  handleMouseDown(event: MouseEvent) {
    // Prevent clicks on the label from briefly blurring the input
    event.preventDefault();
    this.input.focus();
  }

  watchChecked() {
    this.input.checked = this.checked;
    this.emit('sl-change');
  }

  render() {
    return html`
      <label
        part="base"
        for=${this.switchId}
        class=${classMap({
          switch: true,
          'switch--checked': this.checked,
          'switch--disabled': this.disabled,
          'switch--focused': this.hasFocus
        })}
        onmousedown=${this.handleMouseDown.bind(this)}
      >
        <span part="control" class="switch__control">
          <span part="thumb" class="switch__thumb" />

          <input
            ref=${(el: HTMLInputElement) => (this.input = el)}
            id=${this.switchId}
            type="checkbox"
            name=${this.name}
            .value=${this.value}
            checked=${this.checked ? true : null}
            disabled=${this.disabled ? true : null}
            required=${this.required ? true : null}
            role="switch"
            aria-checked=${this.checked ? 'true' : 'false'}
            aria-labelledby=${this.labelId}
            onclick=${this.handleClick.bind(this)}
            onblur=${this.handleBlur.bind(this)}
            onfocus=${this.handleFocus.bind(this)}
            onkeydown=${this.handleKeyDown.bind(this)}
          />
        </span>

        <span part="label" id=${this.labelId} class="switch__label">
          <slot />
        </span>
      </label>
    `;
  }
}
