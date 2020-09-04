import { Component, Element, Event, EventEmitter, Method, Prop, State, Watch, h } from '@stencil/core';

let id = 0;

/**
 * @since 2.0
 * @status stable
 *
 * @slot prefix - Used to prepend an icon or similar element to the input.
 * @slot suffix - Used to append an icon or similar element to the input.
 * @slot clear-icon - An icon to use in lieu of the default clear icon.
 * @slot show-password-icon - An icon to use in lieu of the default show password icon.
 * @slot hide-password-icon - An icon to use in lieu of the default hide password icon.
 * @slot help-text - Help text that describes how to use the input.
 *
 * @part base - The component's base wrapper.
 * @part form-control - The form control that wraps the label and the input.
 * @part label - The input label.
 * @part input - The input control.
 * @part prefix - The input prefix container.
 * @part clear-button - The clear button.
 * @part password-toggle-button - The password toggle button.
 * @part suffix - The input suffix container.
 * @part help-text - The input help text.
 */

@Component({
  tag: 'sl-input',
  styleUrl: 'input.scss',
  shadow: true
})
export class Input {
  inputId = `input-${++id}`;
  labelId = `input-label-${id}`;
  helpTextId = `input-help-text-${id}`;
  input: HTMLInputElement;

  @Element() host: HTMLSlInputElement;

  @State() hasFocus = false;
  @State() isPasswordVisible = false;

  /** The input's type. */
  @Prop({ reflect: true }) type: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url' = 'text';

  /** The input's size. */
  @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** The input's name attribute. */
  @Prop({ reflect: true }) name = '';

  /** The input's value attribute. */
  @Prop({ mutable: true, reflect: true }) value: string = '';

  /** Set to true to draw a pill-style input with rounded edges. */
  @Prop({ reflect: true }) pill = false;

  /** The input's label. */
  @Prop() label = '';

  /** The input's placeholder text. */
  @Prop() placeholder: string;

  /** Set to true to disable the input. */
  @Prop({ reflect: true }) disabled = false;

  /** Set to true to make the input readonly. */
  @Prop({ reflect: true }) readonly = false;

  /** The minimum length of input that will be considered valid. */
  @Prop({ reflect: true }) minlength: number;

  /** The maximum length of input that will be considered valid. */
  @Prop({ reflect: true }) maxlength: number;

  /** The input's minimum value. */
  @Prop({ reflect: true }) min: number;

  /** The input's maximum value. */
  @Prop({ reflect: true }) max: number;

  /** The input's step attribute. */
  @Prop({ reflect: true }) step: number;

  /** A pattern to validate input against. */
  @Prop({ reflect: true }) pattern: string;

  /** Set to true to make the checkbox a required field. */
  @Prop({ reflect: true }) required: boolean;

  /** The input's autocaptialize attribute. */
  @Prop() autocapitalize: string;

  /** The input's autocorrect attribute. */
  @Prop() autocorrect: string;

  /** The input's autocomplete attribute. */
  @Prop() autocomplete: string;

  /** The input's autofocus attribute. */
  @Prop() autofocus: boolean;

  /**
   * This will be true when the control is in an invalid state. Validity is determined by props such as `type`,
   * `required`, `minlength`, `maxlength`, and `pattern` using the browser's constraint validation API.
   */
  @Prop({ mutable: true, reflect: true }) invalid = false;

  /** Set to true to add a clear button when the input is populated. */
  @Prop() clearable = false;

  /** Set to true to add a password toggle button for password inputs. */
  @Prop() togglePassword = false;

  /** The input's inputmode attribute. */
  @Prop() inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';

  @Watch('value')
  handleValueChange() {
    this.invalid = !this.input.checkValidity();
  }

  /** Emitted when the control's value changes. */
  @Event() slChange: EventEmitter;

  /** Emitted when the clear button is activated. */
  @Event() slClear: EventEmitter;

  /** Emitted when the control receives input. */
  @Event() slInput: EventEmitter;

  /** Emitted when the control gains focus. */
  @Event() slFocus: EventEmitter;

  /** Emitted when the control loses focus. */
  @Event() slBlur: EventEmitter;

  connectedCallback() {
    this.handleChange = this.handleChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleInvalid = this.handleInvalid.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handlePasswordToggle = this.handlePasswordToggle.bind(this);
  }

  /** Sets focus on the input. */
  @Method()
  async setFocus() {
    this.input.focus();
  }

  /** Removes focus from the input. */
  @Method()
  async removeFocus() {
    this.input.blur();
  }

  /** Selects all the text in the input. */
  @Method()
  async select() {
    return this.input.select();
  }

  /** Sets the start and end positions of the text selection (0-based). */
  @Method()
  async setSelectionRange(
    selectionStart: number,
    selectionEnd: number,
    selectionDirection: 'forward' | 'backward' | 'none' = 'none'
  ) {
    return this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }

  /** Replaces a range of text with a new string. */
  @Method()
  async setRangeText(
    replacement: string,
    start: number,
    end: number,
    selectMode: 'select' | 'start' | 'end' | 'preserve' = 'preserve'
  ) {
    this.input.setRangeText(replacement, start, end, selectMode);

    if (this.value !== this.input.value) {
      this.value = this.input.value;
      this.slChange.emit();
      this.slInput.emit();
    }
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  @Method()
  async reportValidity() {
    return this.input.reportValidity();
  }

  /** Sets a custom validation message. If `message` is not empty, the field will be considered invalid. */
  @Method()
  async setCustomValidity(message: string) {
    this.input.setCustomValidity(message);
    this.invalid = !this.input.checkValidity();
  }

  handleChange() {
    this.value = this.input.value;
    this.slChange.emit();
  }

  handleInput() {
    this.value = this.input.value;
    this.slInput.emit();
  }

  handleInvalid() {
    this.invalid = true;
  }

  handleBlur() {
    this.hasFocus = false;
    this.slBlur.emit();
  }

  handleFocus() {
    this.hasFocus = true;
    this.slFocus.emit();
  }

  handleClearClick(event: MouseEvent) {
    if (this.input.value !== '') {
      this.input.value = '';
      this.input.dispatchEvent(new window.Event('input', { bubbles: true }));
      this.input.dispatchEvent(new window.Event('change', { bubbles: true }));
    }

    event.stopPropagation();
    this.slClear.emit();
    this.input.focus();
  }

  handleMouseDown(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (target !== this.input) {
      event.preventDefault();
      this.input.focus();
    }
  }

  handlePasswordToggle() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  render() {
    return (
      <div
        part="form-control"
        class={{
          'form-control': true,
          'form-control--has-label': this.label.length > 0,
          'form-control--invalid': this.invalid
        }}
      >
        <label
          part="label"
          class={{
            label: true,
            'label--small': this.size === 'small',
            'label--medium': this.size === 'medium',
            'label--large': this.size === 'large',
            'label--invalid': this.invalid
          }}
          htmlFor={this.inputId}
        >
          {this.label}
        </label>

        <div
          part="base"
          class={{
            input: true,

            // Sizes
            'input--small': this.size === 'small',
            'input--medium': this.size === 'medium',
            'input--large': this.size === 'large',

            // States
            'input--pill': this.pill,
            'input--disabled': this.disabled,
            'input--focused': this.hasFocus,
            'input--empty': this.value?.length === 0,
            'input--invalid': this.invalid
          }}
          onMouseDown={this.handleMouseDown}
        >
          <span part="prefix" class="input__prefix">
            <slot name="prefix" />
          </span>

          <input
            part="input"
            ref={el => (this.input = el)}
            id={this.inputId}
            class="input__control"
            type={this.type === 'password' && this.isPasswordVisible ? 'text' : this.type}
            name={this.name}
            placeholder={this.placeholder}
            disabled={this.disabled}
            readonly={this.readonly}
            minLength={this.minlength}
            maxLength={this.maxlength}
            min={this.min}
            max={this.max}
            step={this.step}
            value={this.value}
            autoCapitalize={this.autocapitalize}
            autoComplete={this.autocomplete}
            autoCorrect={this.autocorrect}
            autoFocus={this.autofocus}
            pattern={this.pattern}
            required={this.required}
            inputMode={this.inputmode}
            aria-labelledby={this.labelId}
            aria-describedby={this.helpTextId}
            aria-invalid={this.invalid}
            onChange={this.handleChange}
            onInput={this.handleInput}
            onInvalid={this.handleInvalid}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />

          {this.clearable && (
            <button
              part="clear-button"
              class="input__clear"
              type="button"
              onClick={this.handleClearClick}
              tabindex="-1"
            >
              <slot name="clear-icon">
                <sl-icon name="x-circle" />
              </slot>
            </button>
          )}

          {this.togglePassword && (
            <button
              part="password-toggle-button"
              class="input__password-toggle"
              type="button"
              onClick={this.handlePasswordToggle}
              tabindex="-1"
            >
              {this.isPasswordVisible ? (
                <slot name="show-password-icon">
                  <sl-icon name="eye-slash" />
                </slot>
              ) : (
                <slot name="hide-password-icon">
                  {' '}
                  <sl-icon name="eye" />
                </slot>
              )}
            </button>
          )}

          <span part="suffix" class="input__suffix">
            <slot name="suffix" />
          </span>
        </div>

        <div
          part="help-text"
          id={this.helpTextId}
          class={{
            'help-text': true,
            'help-text--small': this.size === 'small',
            'help-text--medium': this.size === 'medium',
            'help-text--large': this.size === 'large',
            'help-text--invalid': this.invalid
          }}
        >
          <slot name="help-text" />
        </div>
      </div>
    );
  }
}
