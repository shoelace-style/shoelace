import { html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { emit } from '../../internal/event';
import { FormSubmitController } from '../../internal/form';
import { HasSlotController } from '../../internal/slot';
import { watch } from '../../internal/watch';
import styles from './range.styles';

/**
 * @since 2.0
 * @status stable
 *
 * @slot label - The input's label. Alternatively, you can use the label prop.
 * @slot help-text - Help text that describes how to use the input. Alternatively, you can use the help-text prop.
 *
 * @event sl-change - Emitted when the control's value changes.
 * @event sl-blur - Emitted when the control loses focus.
 * @event sl-focus - Emitted when the control gains focus.
 *
 * @csspart form-control - The form control that wraps the label, input, and help-text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The range's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart base - The component's internal wrapper.
 * @csspart input - The native range input.
 * @csspart tooltip - The range tooltip.
 *
 * @cssproperty --thumb-size - The size of the thumb.
 * @cssproperty --tooltip-offset - The vertical distance the tooltip is offset from the track.
 * @cssproperty --track-color-active - The color of the portion of the track that represents the current value.
 * @cssproperty --track-color-inactive - The of the portion of the track that represents the remaining value.
 * @cssproperty --track-height - The height of the track.
 */
@customElement('sl-range')
export default class SlRange extends LitElement {
  static styles = styles;

  @query('.range__control') input: HTMLInputElement;
  @query('.range__tooltip') output: HTMLOutputElement | null;

  // @ts-expect-error -- Controller is currently unused
  private readonly formSubmitController = new FormSubmitController(this);
  private readonly hasSlotController = new HasSlotController(this, 'help-text', 'label');
  private resizeObserver: ResizeObserver;

  @state() private hasFocus = false;
  @state() private hasTooltip = false;

  /** The input's name attribute. */
  @property() name = '';

  /** The input's value attribute. */
  @property({ type: Number }) value = 0;

  /** The range's label. Alternatively, you can use the label slot. */
  @property() label = '';

  /** The range's help text. Alternatively, you can use the help-text slot. */
  @property({ attribute: 'help-text' }) helpText = '';

  /** Disables the input. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * This will be true when the control is in an invalid state. Validity in range inputs is determined by the message
   * provided by the `setCustomValidity` method.
   */
  @property({ type: Boolean, reflect: true }) invalid = false;

  /** The input's min attribute. */
  @property({ type: Number }) min = 0;

  /** The input's max attribute. */
  @property({ type: Number }) max = 100;

  /** The input's step attribute. */
  @property({ type: Number }) step = 1;

  /** The preferred placement of the tooltip. */
  @property() tooltip: 'top' | 'bottom' | 'none' = 'top';

  /** A function used to format the tooltip's value. */
  @property({ attribute: false }) tooltipFormatter: (value: number) => string = (value: number) => value.toString();

  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver(() => this.syncRange());

    if (!this.value) {
      this.value = this.min;
    }
    if (this.value < this.min) {
      this.value = this.min;
    }
    if (this.value > this.max) {
      this.value = this.max;
    }

    this.updateComplete.then(() => {
      this.syncRange();
      this.resizeObserver.observe(this.input);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.unobserve(this.input);
  }

  /** Sets focus on the input. */
  focus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the input. */
  blur() {
    this.input.blur();
  }

  /** Sets a custom validation message. If `message` is not empty, the field will be considered invalid. */
  setCustomValidity(message: string) {
    this.input.setCustomValidity(message);
    this.invalid = !this.input.checkValidity();
  }

  handleInput() {
    this.value = parseFloat(this.input.value);
    emit(this, 'sl-change');

    this.syncRange();
  }

  handleBlur() {
    this.hasFocus = false;
    this.hasTooltip = false;
    emit(this, 'sl-blur');
  }

  @watch('value', { waitUntilFirstUpdate: true })
  handleValueChange() {
    this.invalid = !this.input.checkValidity();

    // The value may have constraints, so we set the native control's value and sync it back to ensure it adhere's to
    // min, max, and step properly
    this.input.value = this.value.toString();
    this.value = parseFloat(this.input.value);

    this.syncRange();
  }

  @watch('disabled', { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    // Disabled form controls are always valid, so we need to recheck validity when the state changes
    this.input.disabled = this.disabled;
    this.invalid = !this.input.checkValidity();
  }

  handleFocus() {
    this.hasFocus = true;
    this.hasTooltip = true;
    emit(this, 'sl-focus');
  }

  handleThumbDragStart() {
    this.hasTooltip = true;
  }

  handleThumbDragEnd() {
    this.hasTooltip = false;
  }

  syncRange() {
    const percent = Math.max(0, (this.value - this.min) / (this.max - this.min));

    this.syncProgress(percent);

    if (this.tooltip !== 'none') {
      this.syncTooltip(percent);
    }
  }

  syncProgress(percent: number) {
    this.input.style.background = `linear-gradient(to right, var(--track-color-active) 0%, var(--track-color-active) ${
      percent * 100
    }%, var(--track-color-inactive) ${percent * 100}%, var(--track-color-inactive) 100%)`;
  }

  syncTooltip(percent: number) {
    if (this.output !== null) {
      const inputWidth = this.input.offsetWidth;
      const tooltipWidth = this.output.offsetWidth;
      const thumbSize = getComputedStyle(this.input).getPropertyValue('--thumb-size');
      const x = `calc(${inputWidth * percent}px - calc(calc(${percent} * ${thumbSize}) - calc(${thumbSize} / 2)))`;

      this.output.style.transform = `translateX(${x})`;
      this.output.style.marginLeft = `-${tooltipWidth / 2}px`;
    }
  }

  render() {
    const hasLabelSlot = this.hasSlotController.test('label');
    const hasHelpTextSlot = this.hasSlotController.test('help-text');
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;

    // NOTE - always bind value after min/max, otherwise it will be clamped
    return html`
      <div
        part="form-control"
        class=${classMap({
          'form-control': true,
          'form-control--medium': true, // range only has one size
          'form-control--has-label': hasLabel,
          'form-control--has-help-text': hasHelpText
        })}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${hasLabel ? 'false' : 'true'}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
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
            @mousedown=${this.handleThumbDragStart}
            @mouseup=${this.handleThumbDragEnd}
            @touchstart=${this.handleThumbDragStart}
            @touchend=${this.handleThumbDragEnd}
          >
            <input
              part="input"
              id="input"
              type="range"
              class="range__control"
              name=${ifDefined(this.name)}
              ?disabled=${this.disabled}
              min=${ifDefined(this.min)}
              max=${ifDefined(this.max)}
              step=${ifDefined(this.step)}
              .value=${live(this.value.toString())}
              aria-describedby="help-text"
              @input=${this.handleInput}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />
            ${this.tooltip !== 'none' && !this.disabled
              ? html`
                  <output part="tooltip" class="range__tooltip">
                    ${typeof this.tooltipFormatter === 'function' ? this.tooltipFormatter(this.value) : this.value}
                  </output>
                `
              : ''}
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${hasHelpText ? 'false' : 'true'}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-range': SlRange;
  }
}
