import { classMap, html, Shoemaker } from '@shoelace-style/shoemaker';
import styles from 'sass:./input.scss';
import { renderFormControl } from '../../internal/form-control';
import { hasSlot } from '../../internal/slot';

let id = 0;

/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon
 *
 * @slot label - The input's label. Alternatively, you can use the label prop.
 * @slot prefix - Used to prepend an icon or similar element to the input.
 * @slot suffix - Used to append an icon or similar element to the input.
 * @slot clear-icon - An icon to use in lieu of the default clear icon.
 * @slot show-password-icon - An icon to use in lieu of the default show password icon.
 * @slot hide-password-icon - An icon to use in lieu of the default hide password icon.
 * @slot help-text - Help text that describes how to use the input. Alternatively, you can use the help-text prop.
 *
 * @part base - The component's base wrapper.
 * @part form-control - The form control that wraps the label, input, and help-text.
 * @part label - The input label.
 * @part input - The input control.
 * @part prefix - The input prefix container.
 * @part clear-button - The clear button.
 * @part password-toggle-button - The password toggle button.
 * @part suffix - The input suffix container.
 * @part help-text - The input help text.
 *
 * @emit sl-change - Emitted when the control's value changes.
 * @emit sl-clear - Emitted when the clear button is activated.
 * @emit sl-input - Emitted when the control receives input.
 * @emit sl-focus - Emitted when the control gains focus.
 * @emit sl-blur - Emitted when the control loses focus.
 */
export default class SlInput extends Shoemaker {
  static tag = 'sl-input';
  static props = [
    'hasFocus',
    'hasHelpTextSlot',
    'hasLabelSlot',
    'isPasswordVisible',
    'type',
    'size',
    'name',
    'value',
    'pill',
    'label',
    'helpText',
    'clearable',
    'togglePassword',
    'placeholder',
    'disabled',
    'readonly',
    'minlength',
    'maxlength',
    'min',
    'max',
    'step',
    'pattern',
    'required',
    'invalid',
    'autocapitalize',
    'autocorrect',
    'autocomplete',
    'autofocus',
    'spellcheck',
    'inputmode'
  ];
  static reflect = ['size', 'pill', 'disabled', 'readonly', 'invalid'];
  static styles = styles;

  private hasFocus = false;
  private hasHelpTextSlot = false;
  private hasLabelSlot = false;
  private helpTextId = `input-help-text-${id}`;
  private input: HTMLInputElement;
  private inputId = `input-${++id}`;
  private isPasswordVisible = false;
  private labelId = `input-label-${id}`;

  /** The input's type. */
  type: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url' = 'text';

  /** The input's size. */
  size: 'small' | 'medium' | 'large' = 'medium';

  /** The input's name attribute. */
  name = '';

  /** The input's value attribute. */
  value = '';

  /** Draws a pill-style input with rounded edges. */
  pill = false;

  /** The input's label. Alternatively, you can use the label slot. */
  label = '';

  /** The input's help text. Alternatively, you can use the help-text slot. */
  helpText = '';

  /** Adds a clear button when the input is populated. */
  clearable = false;

  /** Adds a password toggle button to password inputs. */
  togglePassword = false;

  /** The input's placeholder text. */
  placeholder = '';

  /** Disables the input. */
  disabled = false;

  /** Makes the input readonly. */
  readonly = false;

  /** The minimum length of input that will be considered valid. */
  minlength: number;

  /** The maximum length of input that will be considered valid. */
  maxlength: number;

  /** The input's minimum value. */
  min: number | string;

  /** The input's maximum value. */
  max: number | string;

  /** The input's step attribute. */
  step: number;

  /** A pattern to validate input against. */
  pattern: string;

  /** Makes the input a required field. */
  required = false;

  /**
   * This will be true when the control is in an invalid state. Validity is determined by props such as `type`,
   * `required`, `minlength`, `maxlength`, and `pattern` using the browser's constraint validation API.
   */
  invalid = false;

  /** The input's autocaptialize attribute. */
  autocapitalize: string;

  /** The input's autocorrect attribute. */
  autocorrect: string;

  /** The input's autocomplete attribute. */
  autocomplete: string;

  /** The input's autofocus attribute. */
  autofocus: boolean;

  /** Enables spell checking on the input. */
  spellcheck: boolean;

  /** The input's inputmode attribute. */
  inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';

  onConnect() {
    this.handleSlotChange = this.handleSlotChange.bind(this);

    this.shadowRoot!.addEventListener('slotchange', this.handleSlotChange);
    this.handleSlotChange();
  }

  onDisconnect() {
    this.shadowRoot!.removeEventListener('slotchange', this.handleSlotChange);
  }

  /** Sets focus on the input. */
  setFocus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the input. */
  removeFocus() {
    this.input.blur();
  }

  /** Selects all the text in the input. */
  select() {
    return this.input.select();
  }

  /** Sets the start and end positions of the text selection (0-based). */
  setSelectionRange(
    selectionStart: number,
    selectionEnd: number,
    selectionDirection: 'forward' | 'backward' | 'none' = 'none'
  ) {
    return this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }

  /** Replaces a range of text with a new string. */
  setRangeText(
    replacement: string,
    start: number,
    end: number,
    selectMode: 'select' | 'start' | 'end' | 'preserve' = 'preserve'
  ) {
    this.input.setRangeText(replacement, start, end, selectMode);

    if (this.value !== this.input.value) {
      this.value = this.input.value;
      this.emit('sl-input');
      this.emit('sl-change');
    }
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

  handleChange() {
    this.value = this.input.value;
    this.emit('sl-change');
  }

  handleInput() {
    this.value = this.input.value;
    this.emit('sl-input');
  }

  handleInvalid() {
    this.invalid = true;
  }

  handleBlur() {
    this.hasFocus = false;
    this.emit('sl-blur');
  }

  handleFocus() {
    this.hasFocus = true;
    this.emit('sl-focus');
  }

  handleClearClick(event: MouseEvent) {
    this.value = '';
    this.emit('sl-clear');
    this.emit('sl-input');
    this.emit('sl-change');
    this.input.focus();

    event.stopPropagation();
  }

  handlePasswordToggle() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  handleSlotChange() {
    this.hasHelpTextSlot = hasSlot(this, 'help-text');
    this.hasLabelSlot = hasSlot(this, 'label');
  }

  watchHelpText() {
    this.handleSlotChange();
  }

  watchLabel() {
    this.handleSlotChange();
  }

  watchValue() {
    this.invalid = !this.input.checkValidity();
  }

  render() {
    return renderFormControl(
      {
        inputId: this.inputId,
        label: this.label,
        labelId: this.labelId,
        hasLabelSlot: this.hasLabelSlot,
        helpTextId: this.helpTextId,
        helpText: this.helpText,
        hasHelpTextSlot: this.hasHelpTextSlot,
        size: this.size
      },
      html`
        <div
          part="base"
          class=${classMap({
            input: true,

            // Sizes
            'input--small': this.size === 'small',
            'input--medium': this.size === 'medium',
            'input--large': this.size === 'large',

            // States
            'input--pill': this.pill,
            'input--disabled': this.disabled,
            'input--focused': this.hasFocus,
            'input--empty': this.value.length === 0,
            'input--invalid': this.invalid
          })}
        >
          <span part="prefix" class="input__prefix">
            <slot name="prefix" />
          </span>

          <input
            part="input"
            ref=${(el: HTMLInputElement) => (this.input = el)}
            id=${this.inputId}
            class="input__control"
            type=${this.type === 'password' && this.isPasswordVisible ? 'text' : this.type}
            name=${this.name}
            placeholder=${this.placeholder}
            disabled=${this.disabled ? true : null}
            readonly=${this.readonly ? true : null}
            minlength=${this.minlength}
            maxlength=${this.maxlength}
            min=${this.min}
            max=${this.max}
            step=${this.step}
            .value=${this.value}
            autocapitalize=${this.autocapitalize}
            autocomplete=${this.autocomplete}
            autocorrect=${this.autocorrect}
            autofocus=${this.autofocus}
            spellcheck=${this.spellcheck}
            pattern=${this.pattern}
            required=${this.required ? true : null}
            inputmode=${this.inputmode}
            aria-labelledby=${this.labelId}
            aria-describedby=${this.helpTextId}
            aria-invalid=${this.invalid ? 'true' : 'false'}
            onchange=${this.handleChange.bind(this)}
            oninput=${this.handleInput.bind(this)}
            oninvalid=${this.handleInvalid.bind(this)}
            onfocus=${this.handleFocus.bind(this)}
            onblur=${this.handleBlur.bind(this)}
          />

          ${this.clearable && this.value.length > 0
            ? html`
                <button
                  part="clear-button"
                  class="input__clear"
                  type="button"
                  onclick=${this.handleClearClick.bind(this)}
                  tabindex="-1"
                >
                  <slot name="clear-icon">
                    <sl-icon name="x-circle" />
                  </slot>
                </button>
              `
            : ''}
          ${this.togglePassword
            ? html`
                <button
                  part="password-toggle-button"
                  class="input__password-toggle"
                  type="button"
                  onclick=${this.handlePasswordToggle.bind(this)}
                  tabindex="-1"
                >
                  ${this.isPasswordVisible
                    ? html`
                        <slot name="show-password-icon">
                          <sl-icon name="eye-slash" />
                        </slot>
                      `
                    : html`
                        <slot name="hide-password-icon">
                          ${' '}
                          <sl-icon name="eye" />
                        </slot>
                      `}
                </button>
              `
            : ''}

          <span part="suffix" class="input__suffix">
            <slot name="suffix" />
          </span>
        </div>
      `
    );
  }
}
