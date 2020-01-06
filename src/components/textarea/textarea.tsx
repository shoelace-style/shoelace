import { Component, Method, Prop, State, h } from '@stencil/core';

@Component({
  tag: 's-textarea',
  styleUrl: 'textarea.scss',
  scoped: true
})
export class Textarea {
  textarea: HTMLTextAreaElement;

  constructor() {
    this.handleInput = this.handleInput.bind(this);
  }

  @State() hasFocus = false;

  /** The textarea's size, one of `small`, `medium`, or `large`. */
  @Prop() size = 'medium';

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

  /** The number of rows to display by default. */
  @Prop() rows = 4;

  /** The textarea's autocaptialize attribute. */
  @Prop() autocapitalize: string;

  /** The textarea's autocorrect attribute. */
  @Prop() autocorrect: string;

  /** The textarea's autocomplete attribute. */
  @Prop() autocomplete: string;

  /** The textarea's autofocus attribute. */
  @Prop() autofocus: boolean;

  /** The textarea's inputmode attribute. */
  @Prop() inputmode: string;

  componentDidLoad() {
    this.setTextareaHeight();
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

  handleInput() {
    this.value = this.textarea.value;
    this.setTextareaHeight();
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
          's-textarea': true,

          // Sizes
          's-textarea--small': this.size === 'small',
          's-textarea--medium': this.size === 'medium',
          's-textarea--large': this.size === 'large',

          // States
          's-textarea--disabled': this.disabled,
          's-textarea--focused': this.hasFocus,
          's-textarea--empty': this.value.length === 0,

          // Modifiers
          's-textarea--resize-none': this.resize === 'none',
          's-textarea--resize-vertical': this.resize === 'vertical',
          's-textarea--resize-auto': this.resize === 'auto'
        }}
        onClick={() => this.textarea.focus()}
      >
        <textarea
          ref={el => (this.textarea = el)}
          class="s-textarea__control"
          name={this.name}
          placeholder={this.placeholder}
          disabled={this.disabled}
          readonly={this.readonly}
          rows={this.rows}
          value={this.value}
          autoCapitalize={this.autocapitalize}
          autoCorrect={this.autocorrect}
          autoFocus={this.autofocus}
          inputMode={this.inputmode}
          onFocus={() => (this.hasFocus = true)}
          onBlur={() => (this.hasFocus = false)}
          onInput={this.handleInput}
        />
      </div>
    );
  }
}
