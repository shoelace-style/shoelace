import { LitElement, html, internalProperty, property, query, unsafeCSS } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { classMap } from 'lit-html/directives/class-map';
import { event, EventEmitter, tag, watch } from '../../internal/decorators';
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
 */
@tag('sl-input')
export class SlInput extends LitElement {
  static styles = unsafeCSS(styles);

  @query('.input__control') input: HTMLInputElement;

  private helpTextId = `input-help-text-${id}`;
  private inputId = `input-${++id}`;
  private labelId = `input-label-${id}`;

  @internalProperty() private hasFocus = false;
  @internalProperty() private hasHelpTextSlot = false;
  @internalProperty() private hasLabelSlot = false;
  @internalProperty() private isPasswordVisible = false;

  /** The input's type. */
  @property({ reflect: true }) type: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url' = 'text';

  /** The input's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** The input's name attribute. */
  @property() name: string;

  /** The input's value attribute. */
  @property() value = '';

  /** Draws a pill-style input with rounded edges. */
  @property({ type: Boolean, reflect: true }) pill = false;

  /** The input's label. Alternatively, you can use the label slot. */
  @property() label: string;

  /** The input's help text. Alternatively, you can use the help-text slot. */
  @property({ attribute: 'help-text' }) helpText: string;

  /** Adds a clear button when the input is populated. */
  @property({ type: Boolean }) clearable = false;

  /** Adds a password toggle button to password inputs. */
  @property({ attribute: 'toggle-password', type: Boolean }) togglePassword = false;

  /** The input's placeholder text. */
  @property() placeholder = '';

  /** Disables the input. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Makes the input readonly. */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /** The minimum length of input that will be considered valid. */
  @property({ type: Number }) minlength: number;

  /** The maximum length of input that will be considered valid. */
  @property({ type: Number }) maxlength: number;

  /** The input's minimum value. */
  @property() min: number | string;

  /** The input's maximum value. */
  @property() max: number | string;

  /** The input's step attribute. */
  @property({ type: Number }) step: number;

  /** A pattern to validate input against. */
  @property() pattern: string;

  /** Makes the input a required field. */
  @property({ type: Boolean, reflect: true }) required = false;

  /**
   * This will be true when the control is in an invalid state. Validity is determined by props such as `type`,
   * `required`, `minlength`, `maxlength`, and `pattern` using the browser's constraint validation API.
   */
  @property({ type: Boolean, reflect: true }) invalid = false;

  /** The input's autocaptialize attribute. */
  @property() autocapitalize: string;

  /** The input's autocorrect attribute. */
  @property() autocorrect: string;

  /** The input's autocomplete attribute. */
  @property() autocomplete: string;

  /** The input's autofocus attribute. */
  @property({ type: Boolean }) autofocus: boolean;

  /** Enables spell checking on the input. */
  @property({ type: Boolean }) spellcheck: boolean;

  /** The input's inputmode attribute. */
  @property() inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';

  /** Emitted when the control's value changes. */
  @event('sl-change') slChange: EventEmitter<void>;

  /** Emitted when the clear button is activated. */
  @event('sl-clear') slClear: EventEmitter<void>;

  /** Emitted when the control receives input. */
  @event('sl-input') slInput: EventEmitter<void>;

  /** Emitted when the control gains focus. */
  @event('sl-focus') slFocus: EventEmitter<void>;

  /** Emitted when the control loses focus. */
  @event('sl-blur') slBlur: EventEmitter<void>;

  connectedCallback() {
    super.connectedCallback();
    this.handleSlotChange = this.handleSlotChange.bind(this);

    this.shadowRoot!.addEventListener('slotchange', this.handleSlotChange);
  }

  firstUpdated() {
    this.handleSlotChange();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
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
      this.slInput.emit();
      this.slChange.emit();
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
    this.value = '';
    this.slClear.emit();
    this.slInput.emit();
    this.slChange.emit();
    this.input.focus();

    event.stopPropagation();
  }

  handlePasswordToggle() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  @watch('helpText')
  @watch('label')
  handleSlotChange() {
    this.hasHelpTextSlot = hasSlot(this, 'help-text');
    this.hasLabelSlot = hasSlot(this, 'label');
  }

  @watch('value')
  handleValueChange() {
    if (this.input) {
      this.invalid = !this.input.checkValidity();
    }
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
            <slot name="prefix"></slot>
          </span>

          <input
            part="input"
            id=${this.inputId}
            class="input__control"
            type=${this.type === 'password' && this.isPasswordVisible ? 'text' : this.type}
            name=${ifDefined(this.name)}
            .value=${this.value}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            ?required=${this.required}
            placeholder=${ifDefined(this.placeholder)}
            minlength=${ifDefined(this.minlength)}
            maxlength=${ifDefined(this.maxlength)}
            min=${ifDefined(this.min)}
            max=${ifDefined(this.max)}
            step=${ifDefined(this.step)}
            autocapitalize=${ifDefined(this.autocapitalize)}
            autocomplete=${ifDefined(this.autocomplete)}
            autocorrect=${ifDefined(this.autocorrect)}
            autofocus=${ifDefined(this.autofocus)}
            spellcheck=${ifDefined(this.spellcheck)}
            pattern=${ifDefined(this.pattern)}
            inputmode=${ifDefined(this.inputmode)}
            aria-labelledby=${this.labelId}
            aria-describedby=${this.helpTextId}
            aria-invalid=${this.invalid ? 'true' : 'false'}
            @change=${this.handleChange}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
          />

          ${this.clearable && this.value.length > 0
            ? html`
                <button
                  part="clear-button"
                  class="input__clear"
                  type="button"
                  @click=${this.handleClearClick}
                  tabindex="-1"
                >
                  <slot name="clear-icon">
                    <sl-icon name="x-circle"></sl-icon>
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
                  @click=${this.handlePasswordToggle}
                  tabindex="-1"
                >
                  ${this.isPasswordVisible
                    ? html`
                        <slot name="show-password-icon">
                          <sl-icon name="eye-slash"></sl-icon>
                        </slot>
                      `
                    : html`
                        <slot name="hide-password-icon">
                          ${' '}
                          <sl-icon name="eye"></sl-icon>
                        </slot>
                      `}
                </button>
              `
            : ''}

          <span part="suffix" class="input__suffix">
            <slot name="suffix"></slot>
          </span>
        </div>
      `
    );
  }
}
