import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators';
import { classMap } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit-html/directives/if-defined';
import { event, EventEmitter, watch } from '../../internal/decorators';
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
 * @part base - The component's base wrapper.
 * @part input - The native range input.
 * @part tooltip - The range tooltip.
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
  @property() tooltipFormatter = (value: number) => value.toString();

  /** Emitted when the control's value changes. */
  @event('sl-change') slChange: EventEmitter<void>;

  /** Emitted when the control loses focus. */
  @event('sl-blur') slBlur: EventEmitter<void>;

  /** Emitted when the control gains focus. */
  @event('sl-focus') slFocus: EventEmitter<void>;

  connectedCallback() {
    super.connectedCallback();
    this.handleSlotChange = this.handleSlotChange.bind(this);
    this.shadowRoot!.addEventListener('slotchange', this.handleSlotChange);

    if (this.value === undefined || this.value === null) this.value = this.min;
    if (this.value < this.min) this.value = this.min;
    if (this.value > this.max) this.value = this.max;

    this.handleSlotChange();
  }

  firstUpdated() {
    this.syncTooltip();
    this.resizeObserver = new ResizeObserver(() => this.syncTooltip());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
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

  @watch('label')
  @watch('helpText')
  handleSlotChange() {
    this.hasHelpTextSlot = hasSlot(this, 'help-text');
    this.hasLabelSlot = hasSlot(this, 'label');
  }

  handleTouchStart() {
    this.focus();
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
          @touchstart=${this.handleTouchStart.bind(this)}
        >
          <input
            part="input"
            type="range"
            class="range__control"
            name=${this.name}
            .value=${this.value + ''}
            ?disabled=${this.disabled}
            min=${ifDefined(this.min)}
            max=${ifDefined(this.max)}
            step=${ifDefined(this.step)}
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
            @input=${this.handleInput.bind(this)}
            @focus=${this.handleFocus.bind(this)}
            @blur=${this.handleBlur.bind(this)}
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
