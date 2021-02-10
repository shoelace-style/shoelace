import { Component, Element, Event, EventEmitter, Method, Prop, State, Watch, h } from '@stencil/core';
import FormControl from '../../functional-components/form-control/form-control';
import { hasSlot } from '../../utilities/slot';
import { focusVisible } from '../../utilities/focus-visible';

let id = 0;

/**
 * @since 2.0
 * @status stable
 *
 * @slot label - The input's label. Alternatively, you can use the label prop.
 * @slot help-text - Help text that describes how to use the input. Alternatively, you can use the help-text prop.
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
  inputId = `input-${++id}`;
  labelId = `input-label-${id}`;
  helpTextId = `input-help-text-${id}`;
  resizeObserver: ResizeObserver;

  @Element() host: HTMLSlRangeElement;

  @State() hasFocus = false;
  @State() hasHelpTextSlot = false;
  @State() hasLabelSlot = false;
  @State() hasTooltip = false;

  /** The input's name attribute. */
  @Prop() name = '';

  /** The input's value attribute. */
  @Prop({ mutable: true }) value: number;

  /** The range's label. Alternatively, you can use the label slot. */
  @Prop() label = '';

  /** The range's help text. Alternatively, you can use the help-text slot. */
  @Prop() helpText = '';

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

  @Watch('label')
  @Watch('helpText')
  handleLabelChange() {
    this.handleSlotChange();
  }

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
    this.handleSlotChange = this.handleSlotChange.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);

    this.host.shadowRoot.addEventListener('slotchange', this.handleSlotChange);
  }

  componentWillLoad() {
    if (this.value === undefined || this.value === null) this.value = this.min;
    if (this.value < this.min) this.value = this.min;
    if (this.value > this.max) this.value = this.max;

    this.handleSlotChange();
  }

  componentDidLoad() {
    this.syncTooltip();
    this.resizeObserver = new ResizeObserver(() => this.syncTooltip());
    focusVisible.observe(this.input);
  }

  disconnectedCallback() {
    this.host.shadowRoot.removeEventListener('slotchange', this.handleSlotChange);
    focusVisible.unobserve(this.input);
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

  handleSlotChange() {
    this.hasHelpTextSlot = hasSlot(this.host, 'help-text');
    this.hasLabelSlot = hasSlot(this.host, 'label');
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
      <FormControl
        inputId={this.inputId}
        label={this.label}
        labelId={this.labelId}
        hasLabelSlot={this.hasLabelSlot}
        helpTextId={this.helpTextId}
        helpText={this.helpText}
        hasHelpTextSlot={this.hasHelpTextSlot}
        size="medium"
      >
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
      </FormControl>
    );
  }
}
