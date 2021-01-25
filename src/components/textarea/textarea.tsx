import { Component, Element, Event, EventEmitter, Method, Prop, State, Watch, h } from '@stencil/core';
import FormControl from '../../functional-components/form-control/form-control';
import { hasSlot } from '../../utilities/slot';

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

@Component({
  tag: 'sl-textarea',
  styleUrl: 'textarea.scss',
  shadow: true
})
export class Textarea {
  inputId = `textarea-${++id}`;
  labelId = `textarea-label-${id}`;
  helpTextId = `textarea-help-text-${id}`;
  resizeObserver: ResizeObserver;
  textarea: HTMLTextAreaElement;

  @Element() host: HTMLSlTextareaElement;

  @State() hasFocus = false;
  @State() hasHelpTextSlot = false;
  @State() hasLabelSlot = false;

  /** The textarea's size. */
  @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** The textarea's name attribute. */
  @Prop({ reflect: true }) name = '';

  /** The textarea's value attribute. */
  @Prop({ mutable: true, reflect: true }) value = '';

  /** The textarea's label. Alternatively, you can use the label slot. */
  @Prop() label = '';

  /** The textarea's help text. Alternatively, you can use the help-text slot. */
  @Prop() helpText = '';

  /** The textarea's placeholder text. */
  @Prop() placeholder: string;

  /** The number of rows to display by default. */
  @Prop() rows = 4;

  /** Controls how the textarea can be resized. */
  @Prop() resize: 'none' | 'vertical' | 'auto' = 'vertical';

  /** Set to true to disable the textarea. */
  @Prop({ reflect: true }) disabled = false;

  /** Set to true for a readonly textarea. */
  @Prop({ reflect: true }) readonly = false;

  /** The minimum length of input that will be considered valid. */
  @Prop({ reflect: true }) minlength: number;

  /** The maximum length of input that will be considered valid. */
  @Prop({ reflect: true }) maxlength: number;

  /** The textarea's required attribute. */
  @Prop({ reflect: true }) required: boolean;

  /**
   * This will be true when the control is in an invalid state. Validity is determined by props such as `required`,
   * `minlength`, and `maxlength` using the browser's constraint validation API.
   */
  @Prop({ mutable: true, reflect: true }) invalid = false;

  /** The textarea's autocaptialize attribute. */
  @Prop() autocapitalize: string;

  /** The textarea's autocorrect attribute. */
  @Prop() autocorrect: string;

  /** The textarea's autocomplete attribute. */
  @Prop() autocomplete: string;

  /** The textarea's autofocus attribute. */
  @Prop() autofocus: boolean;

  /** The textarea's spellcheck attribute. */
  @Prop() spellcheck: boolean;

  /** The textarea's inputmode attribute. */
  @Prop() inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';

  /** Emitted when the control's value changes. */
  @Event({ eventName: 'sl-change' }) slChange: EventEmitter;

  /** Emitted when the control receives input. */
  @Event({ eventName: 'sl-input' }) slInput: EventEmitter;

  /** Emitted when the control gains focus. */
  @Event({ eventName: 'sl-focus' }) slFocus: EventEmitter;

  /** Emitted when the control loses focus. */
  @Event({ eventName: 'sl-blur' }) slBlur: EventEmitter;

  @Watch('label')
  handleLabelChange() {
    this.handleSlotChange();
  }

  @Watch('rows')
  handleRowsChange() {
    this.setTextareaHeight();
  }

  @Watch('value')
  handleValueChange() {
    // In rare cases, the watcher may be called before render so we need to make sure the textarea exists
    this.invalid = this.textarea ? !this.textarea.checkValidity() : false;
  }

  connectedCallback() {
    this.handleChange = this.handleChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleSlotChange = this.handleSlotChange.bind(this);

    this.host.shadowRoot.addEventListener('slotchange', this.handleSlotChange);
  }

  componentWillLoad() {
    this.handleSlotChange();
  }

  componentDidLoad() {
    this.setTextareaHeight();
    this.resizeObserver = new ResizeObserver(() => this.setTextareaHeight());
    this.resizeObserver.observe(this.textarea);
  }

  disconnectedCallback() {
    this.resizeObserver.unobserve(this.textarea);
    this.host.shadowRoot.removeEventListener('slotchange', this.handleSlotChange);
  }

  /** Sets focus on the textarea. */
  @Method()
  async setFocus(options?: FocusOptions) {
    this.textarea.focus(options);
  }

  /** Removes focus fromt the textarea. */
  @Method()
  async removeFocus() {
    this.textarea.blur();
  }

  /** Selects all the text in the input. */
  @Method()
  async select() {
    return this.textarea.select();
  }

  /** Sets the start and end positions of the text selection (0-based). */
  @Method()
  async setSelectionRange(
    selectionStart: number,
    selectionEnd: number,
    selectionDirection: 'forward' | 'backward' | 'none' = 'none'
  ) {
    return this.textarea.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }

  /** Replaces a range of text with a new string. */
  @Method()
  async setRangeText(
    replacement: string,
    start: number,
    end: number,
    selectMode: 'select' | 'start' | 'end' | 'preserve' = 'preserve'
  ) {
    this.textarea.setRangeText(replacement, start, end, selectMode);

    if (this.value !== this.textarea.value) {
      this.value = this.textarea.value;
      this.setTextareaHeight();
      this.slChange.emit();
      this.slInput.emit();
    }
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  @Method()
  async reportValidity() {
    return this.textarea.reportValidity();
  }

  /** Sets a custom validation message. If `message` is not empty, the field will be considered invalid. */
  @Method()
  async setCustomValidity(message: string) {
    this.textarea.setCustomValidity(message);
    this.invalid = !this.textarea.checkValidity();
  }

  handleChange() {
    this.slChange.emit();
  }

  handleInput() {
    this.value = this.textarea.value;
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

  handleSlotChange() {
    this.hasLabelSlot = hasSlot(this.host, 'label');
    this.hasHelpTextSlot = hasSlot(this.host, 'help-text');
  }

  setTextareaHeight() {
    if (this.resize === 'auto') {
      this.textarea.style.height = 'auto';
      this.textarea.style.height = this.textarea.scrollHeight + 'px';
    } else {
      this.textarea.style.height = undefined;
    }
  }

  render() {
    return (
      <FormControl
        inputId={this.inputId}
        label={this.label}
        labelId={this.labelId}
        hasLabelSlot={this.hasLabelSlot}
        helpTextId={this.helpTextId}
        helpText={this.helpText}
        hasHelpTextSlot={this.hasHelpTextSlot}
        size={this.size}
      >
        <div
          part="base"
          class={{
            textarea: true,

            // Sizes
            'textarea--small': this.size === 'small',
            'textarea--medium': this.size === 'medium',
            'textarea--large': this.size === 'large',

            // States
            'textarea--disabled': this.disabled,
            'textarea--focused': this.hasFocus,
            'textarea--empty': this.value?.length === 0,
            'textarea--invalid': this.invalid,

            // Modifiers
            'textarea--resize-none': this.resize === 'none',
            'textarea--resize-vertical': this.resize === 'vertical',
            'textarea--resize-auto': this.resize === 'auto'
          }}
        >
          <textarea
            part="textarea"
            ref={el => (this.textarea = el)}
            id={this.inputId}
            class="textarea__control"
            name={this.name}
            placeholder={this.placeholder}
            disabled={this.disabled}
            readOnly={this.readonly}
            rows={this.rows}
            minLength={this.minlength}
            maxLength={this.maxlength}
            value={this.value}
            autoCapitalize={this.autocapitalize}
            autoCorrect={this.autocorrect}
            autoFocus={this.autofocus}
            spellcheck={this.spellcheck}
            required={this.required}
            inputMode={this.inputmode}
            aria-labelledby={this.labelId}
            onChange={this.handleChange}
            onInput={this.handleInput}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
        </div>
      </FormControl>
    );
  }
}
