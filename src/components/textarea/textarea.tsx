import { Component, Event, EventEmitter, Method, Prop, State, Watch, h } from '@stencil/core';
import ResizeObserver from 'resize-observer-polyfill';

/**
 * @since 1.0.0
 * @status ready
 */

@Component({
  tag: 'sl-textarea',
  styleUrl: 'textarea.scss',
  shadow: true
})
export class Textarea {
  resizeObserver: any;
  textarea: HTMLTextAreaElement;

  constructor() {
    this.handleChange = this.handleChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  @State() hasFocus = false;

  /** The textarea's size. */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /** The textarea's name attribute. */
  @Prop() name = '';

  /** The textarea's value attribute. */
  @Prop({ mutable: true }) value = '';

  /** The textarea's placeholder text. */
  @Prop() placeholder: string;

  /** Set to true to disable the textarea. */
  @Prop() disabled = false;

  /** Set to true for a readonly textarea. */
  @Prop() readonly = false;

  /** Controls how the textarea can be resized. */
  @Prop() resize: 'none' | 'vertical' | 'auto' = 'vertical';

  /** The textarea's maxlength attribute. */
  @Prop() maxlength: number;

  /** The textarea's autocaptialize attribute. */
  @Prop() autocapitalize: string;

  /** The textarea's autocorrect attribute. */
  @Prop() autocorrect: string;

  /** The textarea's autocomplete attribute. */
  @Prop() autocomplete: string;

  /** The textarea's autofocus attribute. */
  @Prop() autofocus: boolean;

  /** The textarea's required attribute. */
  @Prop() required: boolean;

  /** The textarea's inputmode attribute. */
  @Prop() inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';

  /** The number of rows to display by default. */
  @Prop() rows = 4;

  /** Emitted when the control's value changes. */
  @Event() slChange: EventEmitter;

  /** Emitted when the control receives input. */
  @Event() slInput: EventEmitter;

  /** Emitted when the control gains focus. */
  @Event() slFocus: EventEmitter;

  /** Emitted when the control loses focus. */
  @Event() slBlur: EventEmitter;

  @Watch('rows')
  handleRowsChange() {
    this.setTextareaHeight();
  }

  componentDidLoad() {
    this.setTextareaHeight();
    this.resizeObserver = new ResizeObserver(() => this.setTextareaHeight());
    this.resizeObserver.observe(this.textarea);
  }

  componentDidUnload() {
    this.resizeObserver.unobserve(this.textarea);
  }

  /** Sets focus on the textarea. */
  @Method()
  async setFocus() {
    this.textarea.focus();
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
    return this.textarea.setRangeText(replacement, start, end, selectMode);
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
      <div
        class={{
          'sl-textarea': true,

          // Sizes
          'sl-textarea--small': this.size === 'small',
          'sl-textarea--medium': this.size === 'medium',
          'sl-textarea--large': this.size === 'large',

          // States
          'sl-textarea--disabled': this.disabled,
          'sl-textarea--focused': this.hasFocus,
          'sl-textarea--empty': this.value.length === 0,

          // Modifiers
          'sl-textarea--resize-none': this.resize === 'none',
          'sl-textarea--resize-vertical': this.resize === 'vertical',
          'sl-textarea--resize-auto': this.resize === 'auto'
        }}
      >
        <textarea
          ref={el => (this.textarea = el)}
          class="sl-textarea__control"
          name={this.name}
          placeholder={this.placeholder}
          disabled={this.disabled}
          readOnly={this.readonly}
          rows={this.rows}
          maxLength={this.maxlength}
          value={this.value}
          autoCapitalize={this.autocapitalize}
          autoCorrect={this.autocorrect}
          autoFocus={this.autofocus}
          required={this.required}
          inputMode={this.inputmode}
          onChange={this.handleChange}
          onInput={this.handleInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </div>
    );
  }
}
