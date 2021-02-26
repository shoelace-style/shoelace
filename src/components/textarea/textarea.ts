import { classMap, html, Shoemaker } from '@shoelace-style/shoemaker';
import styles from 'sass:./textarea.scss';
import { renderFormControl } from '../../internal/form-control';
import { hasSlot } from '../../internal/slot';

let id = 0;

/**
 * @since 2.0
 * @status stable
 *
 * @slot label - The textarea's label. Alternatively, you can use the label prop.
 * @slot help-text - Help text that describes how to use the input.
 *
 * @part base - The component's base wrapper.
 * @part form-control - The form control that wraps the label, textarea, and help text.
 * @part label - The textarea label.
 * @part textarea - The textarea control.
 * @part help-text - The textarea help text.
 *
 * @emit sl-change - Emitted when the control's value changes.
 * @emit sl-input - Emitted when the control receives input.
 * @emit sl-focus - Emitted when the control gains focus.
 * @emit sl-blur - Emitted when the control loses focus.
 */
export default class SlTextarea extends Shoemaker {
  static tag = 'sl-textarea';
  static props = [
    'hasFocus',
    'hasHelpTextSlot',
    'hasLabelSlot',
    'size',
    'name',
    'value',
    'label',
    'helpText',
    'placeholder',
    'rows',
    'resize',
    'disabled',
    'readonly',
    'minlength',
    'maxlength',
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
  private helpTextId = `textarea-help-text-${id}`;
  private input: HTMLTextAreaElement;
  private inputId = `textarea-${++id}`;
  private labelId = `textarea-label-${id}`;
  private resizeObserver: ResizeObserver;

  /** The textarea's size. */
  size: 'small' | 'medium' | 'large' = 'medium';

  /** The textarea's name attribute. */
  name = '';

  /** The textarea's value attribute. */
  value = '';

  /** The textarea's label. Alternatively, you can use the label slot. */
  label = '';

  /** The textarea's help text. Alternatively, you can use the help-text slot. */
  helpText = '';

  /** The textarea's placeholder text. */
  placeholder = '';

  /** The number of rows to display by default. */
  rows = 4;

  /** Controls how the textarea can be resized. */
  resize: 'none' | 'vertical' | 'auto' = 'vertical';

  /** Disables the textarea. */
  disabled = false;

  /** Makes the textarea readonly. */
  readonly = false;

  /** The minimum length of input that will be considered valid. */
  minlength: number;

  /** The maximum length of input that will be considered valid. */
  maxlength: number;

  /** A pattern to validate input against. */
  pattern: string;

  /** Makes the textarea a required field. */
  required = false;

  /**
   * This will be true when the control is in an invalid state. Validity is determined by props such as `type`,
   * `required`, `minlength`, and `maxlength` using the browser's constraint validation API.
   */
  invalid = false;

  /** The textarea's autocaptialize attribute. */
  autocapitalize: string;

  /** The textarea's autocorrect attribute. */
  autocorrect: string;

  /** The textarea's autocomplete attribute. */
  autocomplete: string;

  /** The textarea's autofocus attribute. */
  autofocus: boolean;

  /** Enables spell checking on the textarea. */
  spellcheck: boolean;

  /** The textarea's inputmode attribute. */
  inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';

  onConnect() {
    this.handleSlotChange = this.handleSlotChange.bind(this);

    this.shadowRoot!.addEventListener('slotchange', this.handleSlotChange);
    this.handleSlotChange();
  }

  onReady() {
    this.setTextareaHeight();
    this.resizeObserver = new ResizeObserver(() => this.setTextareaHeight());
    this.resizeObserver.observe(this.input);
  }

  onDisconnect() {
    this.resizeObserver.unobserve(this.input);
    this.shadowRoot!.removeEventListener('slotchange', this.handleSlotChange);
  }

  /** Sets focus on the textarea. */
  setFocus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the textarea. */
  removeFocus() {
    this.input.blur();
  }

  /** Selects all the text in the textarea. */
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
    }

    if (this.value !== this.input.value) {
      this.value = this.input.value;
      this.setTextareaHeight();
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
    this.setTextareaHeight();
    this.emit('sl-input');
  }

  handleBlur() {
    this.hasFocus = false;
    this.emit('sl-blur');
  }

  handleFocus() {
    this.hasFocus = true;
    this.emit('sl-focus');
  }

  handleSlotChange() {
    this.hasHelpTextSlot = hasSlot(this, 'help-text');
    this.hasLabelSlot = hasSlot(this, 'label');
  }

  setTextareaHeight() {
    if (this.resize === 'auto') {
      this.input.style.height = 'auto';
      this.input.style.height = this.input.scrollHeight + 'px';
    } else {
      (this.input.style.height as string | undefined) = undefined;
    }
  }

  watchHelpText() {
    this.handleSlotChange();
  }

  watchLabel() {
    this.handleSlotChange();
  }

  watchRows() {
    this.setTextareaHeight();
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
            textarea: true,
            'textarea--small': this.size === 'small',
            'textarea--medium': this.size === 'medium',
            'textarea--large': this.size === 'large',
            'textarea--disabled': this.disabled,
            'textarea--focused': this.hasFocus,
            'textarea--empty': this.value.length === 0,
            'textarea--invalid': this.invalid,
            'textarea--resize-none': this.resize === 'none',
            'textarea--resize-vertical': this.resize === 'vertical',
            'textarea--resize-auto': this.resize === 'auto'
          })}
        >
          <textarea
            part="textarea"
            ref=${(el: HTMLTextAreaElement) => (this.input = el)}
            id=${this.inputId}
            class="textarea__control"
            name=${this.name}
            placeholder=${this.placeholder}
            disabled=${this.disabled ? true : null}
            readonly=${this.readonly ? true : null}
            rows=${this.rows}
            minlength=${this.minlength}
            maxlength=${this.maxlength}
            .value=${this.value}
            autocapitalize=${this.autocapitalize}
            autocorrect=${this.autocorrect}
            autofocus=${this.autofocus}
            spellcheck=${this.spellcheck}
            required=${this.required ? true : null}
            inputmode=${this.inputmode}
            aria-labelledby=${this.labelId}
            onchange=${this.handleChange.bind(this)}
            oninput=${this.handleInput.bind(this)}
            onfocus=${this.handleFocus.bind(this)}
            onblur=${this.handleBlur.bind(this)}
          />
        </div>
      `
    );
  }
}
