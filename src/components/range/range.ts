import { classMap, html, Shoemaker } from '@shoelace-style/shoemaker';
import styles from 'sass:./range.scss';
import { renderFormControl } from '../../internal/form-control';
import { hasSlot } from '../../internal/slot';

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
 *
 * @emit sl-change - Emitted when the control's value changes.
 * @emit sl-blur - Emitted when the control loses focus.
 * @emit sl-focus - Emitted when the control gains focus.
 */
export default class SlRange extends Shoemaker {
  static tag = 'sl-range';
  static props = [
    'hasFocus',
    'hasHelpTextSlot',
    'hasLabelSlot',
    'hasTooltip',
    'name',
    'value',
    'label',
    'helpText',
    'disabled',
    'invalid',
    'min',
    'max',
    'step',
    'tooltip',
    'tooltipFormatter'
  ];
  static reflect = ['disabled', 'invalid'];
  static styles = styles;

  private hasFocus = false;
  private hasHelpTextSlot = false;
  private hasLabelSlot = false;
  private hasTooltip = false;
  private helpTextId = `input-help-text-${id}`;
  private input: HTMLInputElement;
  private inputId = `input-${++id}`;
  private labelId = `input-label-${id}`;
  private output: HTMLElement;
  private resizeObserver: ResizeObserver;

  /** The input's name attribute. */
  name = '';

  /** The input's value attribute. */
  value: number;

  /** The range's label. Alternatively, you can use the label slot. */
  label = '';

  /** The range's help text. Alternatively, you can use the help-text slot. */
  helpText = '';

  /** Disables the input. */
  disabled = false;

  /**
   * This will be true when the control is in an invalid state. Validity in range inputs is determined by the message
   * provided by the `setCustomValidity` method.
   */
  invalid = false;

  /** The input's min attribute. */
  min = 0;

  /** The input's max attribute. */
  max = 100;

  /** The input's step attribute. */
  step = 1;

  /** The preferred placedment of the tooltip. */
  tooltip: 'top' | 'bottom' | 'none' = 'top';

  /** A function used to format the tooltip's value. */
  tooltipFormatter = (value: number) => value.toString();

  onConnect() {
    this.handleSlotChange = this.handleSlotChange.bind(this);
    this.shadowRoot!.addEventListener('slotchange', this.handleSlotChange);

    if (this.value === undefined || this.value === null) this.value = this.min;
    if (this.value < this.min) this.value = this.min;
    if (this.value > this.max) this.value = this.max;

    this.handleSlotChange();
  }

  onReady() {
    this.syncTooltip();
    this.resizeObserver = new ResizeObserver(() => this.syncTooltip());
  }

  onDisconnect() {
    this.shadowRoot!.removeEventListener('slotchange', this.handleSlotChange);
  }

  /** Sets focus on the input. */
  setFocus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the input. */
  removeFocus() {
    this.input.blur();
  }

  /** Sets a custom validation message. If `message` is not empty, the field will be considered invalid. */
  setCustomValidity(message: string) {
    this.input.setCustomValidity(message);
    this.invalid = !this.input.checkValidity();
  }

  handleInput() {
    this.value = Number(this.input.value);
    this.emit('sl-change');

    requestAnimationFrame(() => this.syncTooltip());
  }

  handleBlur() {
    this.hasFocus = false;
    this.hasTooltip = false;
    this.emit('sl-blur');
    this.resizeObserver.unobserve(this.input);
  }

  handleFocus() {
    this.hasFocus = true;
    this.hasTooltip = true;
    this.emit('sl-focus');
    this.resizeObserver.observe(this.input);
  }

  handleSlotChange() {
    this.hasHelpTextSlot = hasSlot(this, 'help-text');
    this.hasLabelSlot = hasSlot(this, 'label');
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

  watchLabel() {
    this.handleSlotChange();
  }

  watchHelpText() {
    this.handleSlotChange();
  }

  render() {
    return renderFormControl(
      {
        inputId: this.inputId,
        label: this.label,
        labelId: this.labelId,
        hasLabelSlot: this.hasLabelSlot,
        helpTextId: this.helpTextId,
        helpText: this.helpText,
        hasHelpTextSlot: this.hasHelpTextSlot,
        size: 'medium'
      },
      html`
        <div
          part="base"
          class=${classMap({
            range: true,
            'range--disabled': this.disabled,
            'range--focused': this.hasFocus,
            'range--tooltip-visible': this.hasTooltip,
            'range--tooltip-top': this.tooltip === 'top',
            'range--tooltip-bottom': this.tooltip === 'bottom'
          })}
          ontouchstart=${this.handleTouchStart.bind(this)}
        >
          <input
            part="input"
            ref=${(el: HTMLInputElement) => (this.input = el)}
            type="range"
            class="range__control"
            name=${this.name}
            disabled=${this.disabled ? true : null}
            min=${this.min}
            max=${this.max}
            step=${this.step}
            .value=${this.value}
            oninput=${this.handleInput.bind(this)}
            onfocus=${this.handleFocus.bind(this)}
            onblur=${this.handleBlur.bind(this)}
          />
          ${this.tooltip !== 'none'
            ? html`
                <output part="tooltip" ref=${(el: HTMLOutputElement) => (this.output = el)} class="range__tooltip">
                  ${this.tooltipFormatter(this.value)}
                </output>
              `
            : ''}
        </div>
      `
    );
  }
}
