import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit-html/directives/if-defined';
import { emit } from '../../internal/event';
import { watch } from '../../internal/watch';
import { getLabelledBy, renderFormControl } from '../../internal/form-control';
import { hasSlot } from '../../internal/slot';
import styles from 'sass:./range.scss';

let id = 0;

/**
 * @since 2.0
 * @status stable
 *
 * @slot label - The input's label. Alternatively, you can use the label prop.
 * @slot help-text - Help text that describes how to use the input. Alternatively, you can use the help-text prop.
 *
 * @event sl-change - Emitted when the control's value changes.
 * @event sl-blur - Emitted when the control loses focus.
 * @event sl-focus - Emitted when the control gains focus. *
 *
 * @csspart base - The component's base wrapper.
 * @csspart input - The native range input.
 * @csspart tooltip - The range tooltip.
 */
@customElement('sl-range')
export default class SlRange extends LitElement {
  static styles = unsafeCSS(styles);

  @query('.range__control') input: HTMLInputElement;
  @query('.range__tooltip') output: HTMLOutputElement;

  private inputId = `input-${++id}`;
  private helpTextId = `input-help-text-${id}`;
  private labelId = `input-label-${id}`;
  private resizeObserver: ResizeObserver;

  @state() private hasFocus = false;
  @state() private hasHelpTextSlot = false;
  @state() private hasLabelSlot = false;
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

  /** The preferred placedment of the tooltip. */
  @property() tooltip: 'top' | 'bottom' | 'none' = 'top';

  /** A function used to format the tooltip's value. */
  @property({ attribute: false }) tooltipFormatter: (value: number) => string = (value: number) => value.toString();

  connectedCallback() {
    super.connectedCallback();
    this.handleSlotChange = this.handleSlotChange;
    this.resizeObserver = new ResizeObserver(() => this.syncTooltip());
    this.shadowRoot!.addEventListener('slotchange', this.handleSlotChange);

    if (this.value === undefined || this.value === null) this.value = this.min;
    if (this.value < this.min) this.value = this.min;
    if (this.value > this.max) this.value = this.max;

    this.handleSlotChange();

    this.updateComplete.then(() => {
      this.syncTooltip();
      this.resizeObserver.observe(this.input);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.unobserve(this.input);
    this.shadowRoot!.removeEventListener('slotchange', this.handleSlotChange);
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
    this.value = Number(this.input.value);
    emit(this, 'sl-change');

    requestAnimationFrame(() => this.syncTooltip());
  }

  handleBlur() {
    this.hasFocus = false;
    this.hasTooltip = false;
    emit(this, 'sl-blur');
  }

  @watch('disabled')
  handleDisabledChange() {
    // Disabled form controls are always valid, so we need to recheck validity when the state changes
    if (this.input) {
      this.input.disabled = this.disabled;
      this.invalid = !this.input.checkValidity();
    }
  }

  handleFocus() {
    this.hasFocus = true;
    this.hasTooltip = true;
    emit(this, 'sl-focus');
  }

  @watch('label')
  @watch('helpText')
  handleSlotChange() {
    this.hasHelpTextSlot = hasSlot(this, 'help-text');
    this.hasLabelSlot = hasSlot(this, 'label');
  }

  handleThumbStart() {
    this.hasTooltip = true;
  }

  handleThumbEnd() {
    this.hasTooltip = false;
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
    // NOTE - always bind value after min/max, otherwise it will be clamped
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
          @mousedown=${this.handleThumbStart}
          @mouseup=${this.handleThumbEnd}
          @touchstart=${this.handleThumbStart}
          @touchend=${this.handleThumbEnd}
        >
          <input
            part="input"
            type="range"
            class="range__control"
            name=${ifDefined(this.name)}
            ?disabled=${this.disabled}
            min=${ifDefined(this.min)}
            max=${ifDefined(this.max)}
            step=${ifDefined(this.step)}
            .value=${String(this.value)}
            aria-labelledby=${ifDefined(
              getLabelledBy({
                label: this.label,
                labelId: this.labelId,
                hasLabelSlot: this.hasLabelSlot,
                helpText: this.helpText,
                helpTextId: this.helpTextId,
                hasHelpTextSlot: this.hasHelpTextSlot
              })
            )}
            @input=${this.handleInput}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
          />
          ${this.tooltip !== 'none'
            ? html` <output part="tooltip" class="range__tooltip"> ${this.tooltipFormatter(this.value)} </output> `
            : ''}
        </div>
      `
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-range': SlRange;
  }
}
