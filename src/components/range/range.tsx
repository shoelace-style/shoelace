import { Component, Method, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'sl-range',
  styleUrl: 'range.scss',
  scoped: true
})
export class Range {
  input: HTMLInputElement;

  @State() hasFocus = false;

  /** The input's name attribute. */
  @Prop() name = '';

  /** The input's value attribute. */
  @Prop({ mutable: true }) value = '';

  /** Set to true to disable the input. */
  @Prop() disabled = false;

  /** The input's min attribute. */
  @Prop() min: number;

  /** The input's max attribute. */
  @Prop() max: number;

  /** The input's step attribute. */
  @Prop() step: number | 'any';

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

  render() {
    return (
      <div
        class={{
          'sl-range': true,

          // States
          'sl-range--disabled': this.disabled,
          'sl-range--focused': this.hasFocus
        }}
        onClick={() => this.input.focus()}
      >
        <input
          ref={el => (this.input = el)}
          type="range"
          class="sl-range__control"
          name={this.name}
          disabled={this.disabled}
          min={this.min}
          max={this.max}
          step={this.step}
          value={this.value}
          onFocus={() => (this.hasFocus = true)}
          onBlur={() => (this.hasFocus = false)}
          onInput={() => (this.value = this.input.value)}
        />
      </div>
    );
  }
}
