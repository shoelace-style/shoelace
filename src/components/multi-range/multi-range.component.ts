import { classMap } from 'lit/directives/class-map.js';
import { defaultValue } from '../../internal/default-value.js';
import { FormControlController } from '../../internal/form.js';
import { HasSlotController } from '../../internal/slot.js';
import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { LocalizeController } from '../../utilities/localize.js';
import { property, query, queryAll } from 'lit/decorators.js';
import componentStyles from '../../styles/component.styles.js';
import formControlStyles from '../../styles/form-control.styles.js';
import ShoelaceElement from '../../internal/shoelace-element.js';
import styles from './multi-range.styles.js';
import type { CSSResultGroup, PropertyValues } from 'lit';
import type { ShoelaceFormControl } from '../../internal/shoelace-element.js';

const numericSort = function (a: number, b: number): number {
  return a - b;
};

const arraysDiffer = function (a: readonly number[], b: readonly number[]): boolean {
  a ||= [];
  b ||= [];
  if (a.length !== b.length) return true;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return true;
  }
  return false;
};

/**
 * @summary Multi-Ranges allow the user to select multiple values within a given range using a slider with multiple handles.
 * @documentation https://shoelace.style/components/multi-range
 * @status experimental
 * @since next
 *
 * @slot label - The range's label. Alternatively, you can use the `label` attribute.
 * @slot help-text - Text that describes how to use the input. Alternatively, you can use the `help-text` attribute.
 *
 * @event sl-blur - Emitted when the control loses focus.
 * @event sl-change - Emitted when an alteration to the control's value is committed by the user.
 * @event sl-focus - Emitted when the control gains focus.
 * @event sl-input - Emitted when the control receives input.
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart base - The component's base wrapper.
 * @csspart tooltip - The range's tooltip.
 *
 * @cssproperty --thumb-size - The size of the thumb.
 * @cssproperty --tooltip-offset - The vertical distance the tooltip is offset from the track.
 * @cssproperty --track-color-active - The color of the portion of the track that represents the current value.
 * @cssproperty --track-color-inactive - The of the portion of the track that represents the remaining value.
 * @cssproperty --track-height - The height of the track.
 */
export default class SlMultiRange extends ShoelaceElement implements ShoelaceFormControl {
  static styles: CSSResultGroup = [componentStyles, formControlStyles, styles];

  /** The name of the range, submitted as a name/value pair with form data. */
  @property() name = '';

  /** The range's label. If you need to display HTML, use the `label` slot instead. */
  @property() label = '';

  /** The range's help text. If you need to display HTML, use the help-text slot instead. */
  @property({ attribute: 'help-text' }) helpText = '';

  /** Disables the range. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** The minimum acceptable value of the range. */
  @property({ type: Number }) min = 0;

  /** The maximum acceptable value of the range. */
  @property({ type: Number }) max = 100;

  /** The interval at which the range will increase and decrease. */
  @property({ type: Number }) step = 1;

  /** The preferred placement of the range's tooltip. */
  @property() tooltip: 'top' | 'bottom' | 'none' = 'top';

  /** The current values of the input (in ascending order) as a string of comma-separated values */
  @property({ type: String })
  set value(value: string | null) {
    this.#value = value ? value.split(',').map(n => +n) : [];
  }

  get value() {
    return this.#value.join(',');
  }

  /** Gets or sets the current values of the range as an array of numbers */
  set valueAsArray(value: readonly number[] | null) {
    const oldValue = this.#value;
    this.#value = value || [];
    if (arraysDiffer(oldValue, this.#value)) {
      this.requestUpdate('value', oldValue.join(','));
    }
  }

  get valueAsArray() {
    return this.#value;
  }

  /** The default value of the form control. Primarily used for resetting the form control. */
  @defaultValue() defaultValue = '0,100';

  /**
   * A function used to format the tooltip's value. The range's value is passed as the first and only argument. The
   * function should return a string to display in the tooltip.
   */
  @property({ attribute: false }) tooltipFormatter: (value: number) => string;

  @query('.base') baseDiv: HTMLDivElement;
  @query('.active-track') activeTrack: HTMLDivElement;
  @query('.tooltip') tooltipElem: HTMLDivElement | undefined;
  @queryAll('.handle') handles: NodeListOf<HTMLDivElement>;

  #hasSlotController = new HasSlotController(this, 'help-text', 'label');
  #formControlController = new FormControlController(this, { assumeInteractionOn: ['sl-change'] });
  #localize = new LocalizeController(this);
  #resizeObserver: ResizeObserver | null = null;
  #value: readonly number[] = [0, 100];
  #sliderValues = new Map<number, number>();
  #hasFocus = false;
  #validationError = '';
  #nextId = 1;

  get #rtl() {
    return this.#localize.dir() === 'rtl';
  }

  constructor() {
    super();
    this.tooltipFormatter = this.#localize.number.bind(this.#localize);
  }

  override render(): unknown {
    const hasLabel = !!(this.label || this.#hasSlotController.test('label'));
    const hasHelpText = !!(this.helpText || this.#hasSlotController.test('help-text'));

    const tooltip =
      this.tooltip !== 'none' ? html`<div class="tooltip" part="tooltip" aria-hidden="true"></div>` : nothing;

    this.#sliderValues.clear();
    const handles = this.#value.map(value => {
      const sliderId = this.#nextId++;
      this.#sliderValues.set(sliderId, value);
      return html`
        <div
          class="handle"
          tabindex="${this.disabled ? -1 : 0}"
          role="slider"
          aria-labelledby=${ifDefined(hasLabel ? 'label' : undefined)}
          aria-valuemin="${this.min}"
          aria-valuemax="${this.max}"
          aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
          aria-valuenow="${value}"
          data-slider-id="${sliderId}"
          @pointerdown=${this.#onClickHandle}
          @pointermove=${this.#onDragHandle}
          @pointerup=${this.#onReleaseHandle}
          @pointercancel=${this.#onReleaseHandle}
          @keydown=${this.#onKeyPress}
          @focus=${this.#onFocusHandle}
        ></div>
      `;
    });

    return html`
      <div
        part="form-control"
        class=${classMap({
          'form-control': true,
          'form-control--medium': true, // range only has one size
          'form-control--has-label': hasLabel,
          'form-control--has-help-text': hasHelpText,
          'tooltip-top': this.tooltip === 'top',
          'tooltip-bottom': this.tooltip === 'bottom'
        })}
        @focusout=${this.#onBlur}
      >
        <label
          id="label"
          part="form-control-label"
          class="form-control__label"
          aria-hidden=${hasLabel ? 'false' : 'true'}
        >
          <slot name="label">${this.label}</slot>
        </label>
        <div class="base" part="base">
          <div class="track"></div>
          <div class="active-track"></div>
          ${handles} ${tooltip}
        </div>
        <div
          part="form-control-help-text"
          class="form-control__help-text"
          aria-hidden=${hasHelpText ? 'false' : 'true'}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
  }

  protected override willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (this.tooltip !== 'none' && !this.#resizeObserver) {
      this.#resizeObserver = new ResizeObserver(this.#onResize.bind(this));
      this.updateComplete.then(() => {
        this.#resizeObserver?.observe(this.baseDiv);
      });
    } else if (this.tooltip === 'none' && this.#resizeObserver) {
      this.#resizeObserver.disconnect();
      this.#resizeObserver = null;
    }

    if (this.min > this.max) {
      [this.min, this.max] = [this.max, this.min];
    }

    if (this.step > this.max - this.min) {
      this.step = this.max - this.min;
    }

    if (this.step <= 0) {
      this.step = 1;
    }

    const adjustedValue = this.#value
      .map(value => {
        if (value <= this.min) return this.min;
        if (value >= this.max) return this.max;
        value = this.min + this.step * Math.round((value - this.min) / this.step);
        if (value > this.max) return this.max;
        return value;
      })
      .sort(numericSort);

    if (arraysDiffer(this.#value, adjustedValue)) {
      this.#value = adjustedValue;
      if (!changedProperties.has('value')) {
        this.emit('sl-change');
      }
    }
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    for (const handle of this.handles) {
      const sliderId = +handle.dataset.sliderId!;
      if (!this.#sliderValues.has(sliderId)) continue;
      this.#moveHandle(handle, this.#sliderValues.get(sliderId)!);
    }
    this.#updateActiveTrack();
  }

  override focus(options?: FocusOptions): void {
    const firstHandle = this.handles.item(0);
    if (firstHandle) {
      firstHandle.focus(options);
    } else {
      super.focus(options);
    }
  }

  /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
  public checkValidity(): boolean {
    return !this.#validationError;
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  public reportValidity(): boolean {
    this.#validationError = '';
    return true;
  }

  /** Sets a custom validation message. Pass an empty string to restore validity. */
  public setCustomValidity(message: string): void {
    this.#validationError = message;
    this.#formControlController.updateValidity();
  }

  /** Gets the associated form, if one exists. */
  public getForm(): HTMLFormElement | null {
    return this.#formControlController.getForm();
  }

  /** Gets the validity state object */
  public get validity(): ValidityState {
    return {
      badInput: false,
      customError: !!this.#validationError,
      patternMismatch: false,
      rangeOverflow: false,
      rangeUnderflow: false,
      stepMismatch: false,
      tooLong: false,
      tooShort: false,
      typeMismatch: false,
      valid: !this.#validationError,
      valueMissing: false
    };
  }

  /** Gets the validation message */
  public get validationMessage(): string {
    return this.#validationError;
  }

  #onClickHandle(event: PointerEvent): void {
    if (this.disabled) return;
    this.baseDiv?.classList?.add('tooltip-visible');
    const handle = event.target as HTMLDivElement;
    this.#updateTooltip(handle);

    if (handle.dataset.pointerId) {
      handle.releasePointerCapture(+handle.dataset.pointerId);
    }

    if (this.disabled) return;

    handle.dataset.pointerId = event.pointerId.toString();
    handle.setPointerCapture(event.pointerId);
    handle.classList.add('grabbed');
  }

  #onDragHandle(event: PointerEvent): void {
    if (this.disabled) return;

    const handle = event.target as HTMLDivElement;
    const sliderId = +handle.dataset.sliderId!;
    if (!this.#sliderValues.has(sliderId)) return;

    const pointerId = handle.dataset.pointerId ? +handle.dataset.pointerId : null;
    if (pointerId !== event.pointerId) return;

    const pos = this.#getNormalizedValueFromClientX(handle, event.clientX);
    const unit = this.step / (this.max - this.min);
    const value = this.min + this.step * Math.round(pos / unit);
    this.#sliderValues.set(sliderId, value);
    this.#moveHandle(handle, value);

    const prevValue = this.#value;
    this.#value = Array.from(this.#sliderValues.values()).sort(numericSort);
    this.#updateActiveTrack();

    if (arraysDiffer(prevValue, this.#value)) {
      this.emit('sl-input');
    }
  }

  #getNormalizedValueFromClientX(handle: HTMLDivElement, x: number): number {
    const bounds = this.baseDiv.getBoundingClientRect();
    const size = bounds.width - handle.clientWidth;
    if (size <= 0) return 0;
    x -= bounds.left + handle.clientWidth / 2;
    if (x <= 0) return this.#rtl ? 1 : 0;
    if (x >= size) return this.#rtl ? 0 : 1;
    x /= size;
    return this.#rtl ? 1.0 - x : x;
  }

  #updateActiveTrack(): void {
    const activeTrack = this.activeTrack;
    if (!activeTrack) return;

    if (this.min === this.max || this.#value.length < 2) {
      activeTrack.style.display = 'none';
      activeTrack.style.insetInlineStart = '0';
      activeTrack.style.width = '0';
      return;
    }

    const start = (100 * (this.#value[0] - this.min)) / (this.max - this.min);
    const span = (100 * (this.#value[this.#value.length - 1] - this.#value[0])) / (this.max - this.min);

    activeTrack.style.display = 'inline-block';
    activeTrack.style.insetInlineStart = `${start}%`;
    activeTrack.style.width = `${span}%`;
  }

  #onKeyPress(event: KeyboardEvent): void {
    const handle = event.target as HTMLDivElement;
    const sliderId = +handle.dataset.sliderId!;

    let value = this.#sliderValues.get(sliderId);
    if (value === undefined) return;

    switch (event.key) {
      case 'ArrowUp':
      case 'Up':
        value = Math.min(value + this.step, this.max);
        break;
      case 'ArrowDown':
      case 'Down':
        value = Math.max(value - this.step, this.min);
        break;
      case 'ArrowLeft':
      case 'Left':
        value = this.#rtl ? Math.min(value + this.step, this.max) : Math.max(value - this.step, this.min);
        break;
      case 'ArrowRight':
      case 'Right':
        value = this.#rtl ? Math.max(value - this.step, this.min) : Math.min(value + this.step, this.max);
        break;
      case 'PageUp':
        value = Math.min(value + 10 * this.step, this.max);
        break;
      case 'PageDown':
        value = Math.max(value - 10 * this.step, this.min);
        break;
      case 'Home':
        value = this.min;
        break;
      case 'End':
        value = this.max;
        break;
      default:
        return;
    }

    this.baseDiv.classList.add('keyboard-focus');

    if (value !== this.#sliderValues.get(sliderId)) {
      this.#moveHandle(handle, value);

      this.#sliderValues.set(sliderId, value);
      this.#value = Array.from(this.#sliderValues.values()).sort(numericSort);
      this.#updateActiveTrack();

      this.emit('sl-input');
      this.emit('sl-change');
    }

    event.stopPropagation();
    event.preventDefault();
  }

  #onReleaseHandle(event: PointerEvent) {
    this.baseDiv?.classList?.remove('tooltip-visible');

    const handle = event.target as HTMLDivElement;
    if (!handle.dataset.pointerId || event.pointerId !== +handle.dataset.pointerId) return;

    handle.classList.remove('grabbed');
    handle.releasePointerCapture(event.pointerId);
    delete handle.dataset.pointerId;
    this.emit('sl-change');
  }

  #moveHandle(handle: HTMLDivElement, value: number): void {
    handle.setAttribute('aria-valuenow', value.toString());
    handle.setAttribute('aria-valuetext', this.tooltipFormatter(value));
    const pos = (value - this.min) / (this.max - this.min);
    handle.style.insetInlineStart = `calc( ${100 * pos}% - var(--thumb-size) * ${pos} )`;
    this.#updateTooltip(handle);
  }

  #onBlur(event: FocusEvent): void {
    this.baseDiv?.classList?.remove('tooltip-visible');
    this.baseDiv?.classList?.remove('keyboard-focus');
    if (event.relatedTarget && this.shadowRoot?.contains(event.relatedTarget as Node)) return;
    this.emit('sl-blur');
    this.#hasFocus = false;
  }

  #updateTooltip(handle: HTMLDivElement): void {
    const sliderId = +handle.dataset.sliderId!;
    if (!this.tooltipElem) return;
    if (!this.baseDiv?.classList?.contains('tooltip-visible')) return;
    if (!this.#sliderValues.has(sliderId)) return;
    const value = this.#sliderValues.get(sliderId)!;
    let pos = (value - this.min) / (this.max - this.min);
    if (this.#rtl) pos = 1.0 - pos;
    this.tooltipElem.style.translate = `calc( ${pos} * ( ${this.baseDiv.offsetWidth}px - var(--thumb-size) ) - 50% + (var(--thumb-size) / 2) )`;
    this.tooltipElem.innerText = this.tooltipFormatter(value);
  }

  #onFocusHandle(event: FocusEvent): void {
    if (this.disabled) return;
    if (!this.#hasFocus) {
      this.#hasFocus = true;
      this.emit('sl-focus');
    }
    const handle = event.target as HTMLDivElement;
    if (!handle?.dataset?.sliderId) return;
    this.baseDiv?.classList?.add('tooltip-visible');
    this.#updateTooltip(handle);
  }

  #onResize(): void {
    const handle = this.shadowRoot?.querySelector('.tooltip-visible .handle:focus');
    if (handle) this.#updateTooltip(handle as HTMLDivElement);
  }
}
