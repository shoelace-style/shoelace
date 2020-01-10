import { Component, Method, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'sl-textarea',
  styleUrl: 'textarea.scss',
  scoped: true
})
export class Textarea {
  resizeObserver: any;
  textarea: HTMLTextAreaElement;

  constructor() {
    this.handleInput = this.handleInput.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
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

    // @ts-ignore
    if (ResizeObserver) {
      // @ts-ignore
      this.resizeObserver = new ResizeObserver(() => this.setTextareaHeight());
      this.resizeObserver.observe(this.textarea);
    } else {
      window.addEventListener('resize', this.handleWindowResize);
    }
  }

  componentDidUnload() {
    // @ts-ignore
    if (ResizeObserver) {
      this.resizeObserver.unobserve();
    } else {
      window.removeEventListener('resize', this.handleWindowResize);
    }
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

  handleWindowResize() {
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
        onClick={() => this.textarea.focus()}
      >
        <textarea
          ref={el => (this.textarea = el)}
          class="sl-textarea__control"
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
