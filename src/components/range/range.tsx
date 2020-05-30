import { Component, Event, EventEmitter, Method, Prop, State, h } from '@stencil/core';
import ResizeObserver from 'resize-observer-polyfill';

/**
 * @since 1.0.0
 * @status ready
 */

@Component({
  tag: 'sl-range',
  styleUrl: 'range.scss',
  shadow: true
})
export class Range {
  input: HTMLInputElement;
  output: HTMLElement;
  resizeObserver: any;

  constructor() {
    this.handleInput = this.handleInput.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
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

  /** The tooltip's position. */
  @Prop() tooltip: 'top' | 'bottom' | 'off' = 'top';

  /** A function used to format the tooltip's value. */
  @Prop() tooltipFormatter = (value: number) => value.toString();

  /** Emitted when the control's value changes. */
  @Event() slChange: EventEmitter;

  /** Emitted when the control loses focus. */
  @Event() slBlur: EventEmitter;

  /** Emitted when the control gains focus. */
  @Event() slFocus: EventEmitter;

  componentWillLoad() {
    if (this.value === undefined || this.value === null) this.value = this.min;
    if (this.value < this.min) this.value = this.min;
    if (this.value > this.max) this.value = this.max;
  }

  componentDidLoad() {
    this.syncTooltip();
    this.resizeObserver = new ResizeObserver(() => this.syncTooltip());
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
    this.slChange.emit();

    requestAnimationFrame(() => this.syncTooltip());
  }

  handleBlur() {
    this.hasFocus = false;
    this.slBlur.emit();
    this.resizeObserver.unobserve(this.input);
  }

  handleFocus() {
    this.hasFocus = true;
    this.slFocus.emit();
    this.resizeObserver.observe(this.input);
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
          onInput={this.handleInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
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
