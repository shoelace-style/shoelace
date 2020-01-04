import { Component, Method, Prop, State, h } from '@stencil/core';

@Component({
  tag: 's-input',
  styleUrl: 'input.scss',
  scoped: true,
  shadow: false
})
export class ShoelaceInput {
  input: HTMLInputElement;

  @State() hasFocus = false;

  /** The input's type, one of `text`, `number`, `email`, etc. */
  @Prop() type = 'text';

  /** The input's size, one of `small`, `medium`, or `large`. */
  @Prop() size = 'medium';

  /** The input's name attribute. */
  @Prop() name = '';

  /** The input's value attribute. */
  @Prop({ mutable: true }) value = '';

  /** The input's placeholder text. */
  @Prop() placeholder: string;

  /** Set to true to disable the input. */
  @Prop() disabled = false;

  /** Set to true to disable the input. */
  @Prop() readonly = false;

  /** The input's minlength attribute. */
  @Prop() minlength: number;

  /** The input's maxlength attribute. */
  @Prop() maxlength: number;

  /** The input's min attribute. */
  @Prop() min: number;

  /** The input's max attribute. */
  @Prop() max: number;

  /** The input's step attribute. */
  @Prop() step: number;

  /** The input's autocomplete attribute. */
  @Prop() autocomplete = 'on';

  /** The input's autofocus attribute. */
  @Prop() autofocus = false;

  /** Sets focus on the input. */
  @Method()
  setFocus() {
    this.input.focus();
  }

  /** Removes focus from the input. */
  @Method()
  removeFocus() {
    this.input.blur();
  }

  render() {
    return (
      <div
        class={{
          's-input': true,

          // Sizes
          's-input--small': this.size === 'small',
          's-input--medium': this.size === 'medium',
          's-input--large': this.size === 'large',

          // States
          's-input--disabled': this.disabled,
          's-input--focused': this.hasFocus
        }}
      >
        <input
          ref={el => (this.input = el)}
          class="s-input__control"
          type={this.type}
          placeholder={this.placeholder}
          disabled={this.disabled}
          readonly={this.readonly}
          name={this.name}
          minlength={this.minlength}
          maxlength={this.maxlength}
          min={this.min}
          max={this.max}
          step={this.step}
          autocomplete={this.autocomplete}
          autofocus={this.autofocus}
          onFocus={() => (this.hasFocus = true)}
          onBlur={() => (this.hasFocus = false)}
        />
      </div>
    );
  }
}
