import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators';
import { classMap } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit-html/directives/if-defined';
import { event, EventEmitter, watch } from '../../internal/decorators';
import { getLabelledBy, renderFormControl } from '../../internal/form-control';
import { hasSlot } from '../../internal/slot';
import styles from 'sass:./textarea.scss';

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
 */
@customElement('sl-textarea')
export default class SlTextarea extends LitElement {
  static styles = unsafeCSS(styles);

  @query('.textarea__control') input: HTMLTextAreaElement;

  private inputId = `textarea-${++id}`;
  private helpTextId = `textarea-help-text-${id}`;
  private labelId = `textarea-label-${id}`;
  private resizeObserver: ResizeObserver;

  @state() private hasFocus = false;
  @state() private hasHelpTextSlot = false;
  @state() private hasLabelSlot = false;

  /** The textarea's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** The textarea's name attribute. */
  @property() name: string;

  /** The textarea's value attribute. */
  @property() value = '';

  /** The textarea's label. Alternatively, you can use the label slot. */
  @property() label: string;

  /** The textarea's help text. Alternatively, you can use the help-text slot. */
  @property({ attribute: 'help-text' }) helpText = '';

  /** The textarea's placeholder text. */
  @property() placeholder: string;

  /** The number of rows to display by default. */
  @property({ type: Number }) rows = 4;

  /** Controls how the textarea can be resized. */
  @property() resize: 'none' | 'vertical' | 'auto' = 'vertical';

  /** Disables the textarea. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Makes the textarea readonly. */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /** The minimum length of input that will be considered valid. */
  @property({ type: Number }) minlength: number;

  /** The maximum length of input that will be considered valid. */
  @property({ type: Number }) maxlength: number;

  /** A pattern to validate input against. */
  @property() pattern: string;

  /** Makes the textarea a required field. */
  @property({ type: Boolean, reflect: true }) required = false;

  /**
   * This will be true when the control is in an invalid state. Validity is determined by props such as `type`,
   * `required`, `minlength`, and `maxlength` using the browser's constraint validation API.
   */
  @property({ type: Boolean, reflect: true }) invalid = false;

  /** The textarea's autocaptialize attribute. */
  @property() autocapitalize:
    | 'off'
    | 'none'
    | 'on'
    | 'sentences'
    | 'words'
    | 'characters'
    | 'off'
    | 'none'
    | 'on'
    | 'sentences'
    | 'words'
    | 'characters';

  /** The textarea's autocorrect attribute. */
  @property() autocorrect: string;

  /** The textarea's autocomplete attribute. */
  @property() autocomplete: string;

  /** The textarea's autofocus attribute. */
  @property({ type: Boolean }) autofocus: boolean;

  /** Enables spell checking on the textarea. */
  @property({ type: Boolean }) spellcheck: boolean;

  /** The textarea's inputmode attribute. */
  @property() inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';

  /** Emitted when the control's value changes. */
  @event('sl-change') slChange: EventEmitter<void>;

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
    this.handleSlotChange();
  }

  firstUpdated() {
    this.setTextareaHeight();
    this.resizeObserver = new ResizeObserver(() => this.setTextareaHeight());
    this.resizeObserver.observe(this.input);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.unobserve(this.input);
    this.shadowRoot!.removeEventListener('slotchange', this.handleSlotChange);
  }

  /** Sets focus on the textarea. */
  focus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the textarea. */
  blur() {
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
      this.slInput.emit();
    }

    if (this.value !== this.input.value) {
      this.value = this.input.value;
      this.setTextareaHeight();
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
    this.setTextareaHeight();
    this.slInput.emit();
  }

  handleBlur() {
    this.hasFocus = false;
    this.slBlur.emit();
  }

  handleFocus() {
    this.hasFocus = true;
    this.slFocus.emit();
  }

  @watch('rows')
  handleRowsChange() {
    this.setTextareaHeight();
  }

  @watch('helpText')
  @watch('label')
  handleSlotChange() {
    this.hasHelpTextSlot = hasSlot(this, 'help-text');
    this.hasLabelSlot = hasSlot(this, 'label');
  }

  @watch('value')
  handleValueChange() {
    this.invalid = !this.input.checkValidity();
  }

  setTextareaHeight() {
    if (this.resize === 'auto') {
      this.input.style.height = 'auto';
      this.input.style.height = this.input.scrollHeight + 'px';
    } else {
      (this.input.style.height as string | undefined) = undefined;
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
            id=${this.inputId}
            class="textarea__control"
            name=${ifDefined(this.name)}
            .value=${this.value}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            ?required=${this.required}
            placeholder=${ifDefined(this.placeholder)}
            rows=${ifDefined(this.rows)}
            minlength=${ifDefined(this.minlength)}
            maxlength=${ifDefined(this.maxlength)}
            autocapitalize=${ifDefined(this.autocapitalize)}
            autocorrect=${ifDefined(this.autocorrect)}
            ?autofocus=${this.autofocus}
            spellcheck=${ifDefined(this.spellcheck)}
            inputmode=${ifDefined(this.inputmode)}
            aria-labelledby=${ifDefined(
              getLabelledBy({
                label: this.label,
                labelId: this.labelId,
                hasLabelSlot: this.hasLabelSlot,
                helpText: this.helpText,
                helpTextId: this.helpTextId,
                hasHelpTextSlot: this.hasHelpTextSlot
              })
            )}
            @change=${this.handleChange.bind(this)}
            @input=${this.handleInput.bind(this)}
            @focus=${this.handleFocus.bind(this)}
            @blur=${this.handleBlur.bind(this)}
          ></textarea>
        </div>
      `
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-textarea': SlTextarea;
  }
}
