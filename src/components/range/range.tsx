import { Component, Method, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'sl-range',
  styleUrl: 'range.scss',
  shadow: true
})
export class Range {
  input: HTMLInputElement;
  output: HTMLElement;

  constructor() {
    this.handleInput = this.handleInput.bind(this);
  }

  @State() hasFocus = false;

  /** The input's name attribute. */
  @Prop() name = '';

  /** The input's value attribute. */
  @Prop({ mutable: true }) value: number;

  /** Set to true to disable the input. */
  @Prop() disabled = false;

  /** The input's min attribute. */
  @Prop() min = 0;

  /** The input's max attribute. */
  @Prop() max = 100;

  /** The input's step attribute. */
  @Prop() step = 1;

  /** The range's tabindex attribute. */
  @Prop() nativeTabindex: number;

  /** The tooltip's position. */
  @Prop() tooltip: 'top' | 'bottom' | 'off' = 'top';

  /** A function used to format the tooltip's value. */
  @Prop() tooltipFormatter = (value: number) => value.toString();

  componentWillLoad() {
    if (this.value === undefined || this.value === null) this.value = this.min;
    if (this.value < this.min) this.value = this.min;
    if (this.value > this.max) this.value = this.max;
  }

  componentDidLoad() {
    this.syncTooltip();
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

  handleInput() {
    this.value = Number(this.input.value);
    requestAnimationFrame(() => this.syncTooltip());
  }

  syncTooltip() {
    if (this.tooltip !== 'off') {
      const percent = Math.max(0, (this.value - this.min) / (this.max - this.min));
      const inputWidth = this.input.offsetWidth;
      const tooltipWidth = this.output.offsetWidth;
      const thumbSize = getComputedStyle(this.input).getPropertyValue('--thumb-size');
      const x = `calc(${inputWidth * percent}px - calc(calc(${percent} * ${thumbSize}) - calc(${thumbSize} / 2)))`;
      this.output.style.transform = `translateX(${x})`;
      this.output.style.marginLeft = `-${tooltipWidth / 2}px`;
    }
  }

  render() {
    return (
      <div
        class={{
          'sl-range': true,

          // States
          'sl-range--disabled': this.disabled,
          'sl-range--focused': this.hasFocus,
          'sl-range--tooltip-top': this.tooltip === 'top',
          'sl-range--tooltip-bottom': this.tooltip === 'bottom'
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
          tabIndex={this.nativeTabindex}
          onFocus={() => (this.hasFocus = true)}
          onBlur={() => (this.hasFocus = false)}
          onInput={this.handleInput}
        />
        {this.tooltip !== 'off' && (
          <output ref={el => (this.output = el)} class="sl-range__tooltip">
            {this.tooltipFormatter(this.value)}
          </output>
        )}
      </div>
    );
  }
}
