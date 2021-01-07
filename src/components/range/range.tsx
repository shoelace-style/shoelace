import { Component, Event, EventEmitter, Method, Prop, State, h } from '@stencil/core';

/**
 * @since 2.0
 * @status stable
 *
 * @part base - The component's base wrapper.
 * @part input - The native range input.
 * @part tooltip - The range tooltip.
 */

@Component({
  tag: 'sl-range',
  styleUrl: 'range.scss',
  shadow: true
})
export class Range {
  input: HTMLInputElement;
  output: HTMLElement;
  resizeObserver: ResizeObserver;

  @State() hasFocus = false;
  @State() hasTooltip = false;

  /** The input's name attribute. */
  @Prop() name = '';

  /** The input's value attribute. */
  @Prop({ mutable: true }) value: number;

  /** Set to true to disable the input. */
  @Prop() disabled = false;

  /**
   * This will be true when the control is in an invalid state. Validity in range inputs is determined by the message
   * provided by the `setCustomValidity` method.
   */
  @Prop({ mutable: true, reflect: true }) invalid = false;

  /** The input's min attribute. */
  @Prop() min = 0;

  /** The input's max attribute. */
  @Prop() max = 100;

  /** The input's step attribute. */
  @Prop() step = 1;

  /** The preferred placedment of the tooltip. */
  @Prop() tooltip: 'top' | 'bottom' | 'none' = 'top';

  /** A function used to format the tooltip's value. */
  @Prop() tooltipFormatter = (value: number) => value.toString();

  /** Emitted when the control's value changes. */
  @Event({ eventName: 'sl-change' }) slChange: EventEmitter;

  /** Emitted when the control loses focus. */
  @Event({ eventName: 'sl-blur' }) slBlur: EventEmitter;

  /** Emitted when the control gains focus. */
  @Event({ eventName: 'sl-focus' }) slFocus: EventEmitter;

  connectedCallback() {
    this.handleInput = this.handleInput.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
  }

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
  async setFocus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the input. */
  @Method()
  async removeFocus() {
    this.input.blur();
  }

  /** Sets a custom validation message. If `message` is not empty, the field will be considered invalid. */
  @Method()
  async setCustomValidity(message: string) {
    this.input.setCustomValidity(message);
    this.invalid = !this.input.checkValidity();
  }

  handleInput() {
    this.value = Number(this.input.value);
    this.slChange.emit();

    requestAnimationFrame(() => this.syncTooltip());
  }

  handleBlur() {
    this.hasFocus = false;
    this.hasTooltip = false;
    this.slBlur.emit();
    this.resizeObserver.unobserve(this.input);
  }

  handleFocus() {
    this.hasFocus = true;
    this.hasTooltip = true;
    this.slFocus.emit();
    this.resizeObserver.observe(this.input);
  }

  handleTouchStart() {
    this.setFocus();
  }

  syncTooltip() {
    if (this.tooltip !== 'none') {
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
        part="base"
        class={{
          range: true,

          // States
          'range--disabled': this.disabled,
          'range--focused': this.hasFocus,
          'range--tooltip-visible': this.hasTooltip,
          'range--tooltip-top': this.tooltip === 'top',
          'range--tooltip-bottom': this.tooltip === 'bottom'
        }}
        onTouchStart={this.handleTouchStart}
      >
        <input
          part="input"
          ref={el => (this.input = el)}
          type="range"
          class="range__control"
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
        {this.tooltip !== 'none' && (
          <output part="tooltip" ref={el => (this.output = el)} class="range__tooltip">
            {this.tooltipFormatter(this.value)}
          </output>
        )}
      </div>
    );
  }
}
