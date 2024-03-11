import { classMap } from 'lit/directives/class-map.js';
import { HasSlotController } from '../../internal/slot.js';
import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { property, query, queryAll } from 'lit/decorators.js';
import formControlStyles from '../../styles/form-control.styles.js';
import ShoelaceElement from '../../internal/shoelace-element.js';
import styles from './multi-range.styles.js';
import type { CSSResultGroup, PropertyValues } from 'lit';

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
 * @cssproperty --thumb-size - The size of the thumb.
 * @cssproperty --tooltip-offset - The vertical distance the tooltip is offset from the track.
 * @cssproperty --track-color-active - The color of the portion of the track that represents the current value.
 * @cssproperty --track-color-inactive - The of the portion of the track that represents the remaining value.
 * @cssproperty --track-height - The height of the track.
 */
export default class SlMultiRange extends ShoelaceElement {
  static styles: CSSResultGroup = [formControlStyles, styles];

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

  /** The current values of the range */
  @property({ type: Array })
  set value(value: readonly number[]) {
    this.#value = value || [];
  }
  get value() {
    return this.#value;
  }

  /**
   * A function used to format the tooltip's value. The range's value is passed as the first and only argument. The
   * function should return a string to display in the tooltip.
   */
  @property({ attribute: false }) tooltipFormatter: (value: number) => string = (value: number) => value.toString();

  @query('.base') baseDiv: HTMLDivElement;
  @query('.active-track') activeTrack: HTMLDivElement;
  @query('.tooltip') tooltipElem: HTMLDivElement | undefined;
  @queryAll('.handle') handles: NodeListOf<HTMLDivElement>;

  #hasSlotController = new HasSlotController(this, 'help-text', 'label');
  #value: readonly number[] = [0, 100];
  #sliderValues = new Map<number, number>();
  #hasFocus = false;
  #nextId = 1;

  override render(): unknown {
    const hasLabel = !!(this.label || this.#hasSlotController.test('label'));
    const hasHelpText = !!(this.helpText || this.#hasSlotController.test('help-text'));

    const tooltip = this.tooltip !== 'none' ? html`<div class="tooltip" aria-hidden="true"></div>` : nothing;

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
        class=${classMap({
          'form-control': true,
          'form-control--medium': true, // range only has one size
          'form-control--has-label': hasLabel,
          'form-control--has-help-text': hasHelpText,
          'tooltip-top': this.tooltip === 'top',
          'tooltip-bottom': this.tooltip === 'bottom'
        })}
        @focusin=${this.#onFocus}
        @focusout=${this.#onBlur}
      >
        <label id="label" class="form-control__label" aria-hidden=${hasLabel ? 'false' : 'true'}>
          <slot name="label">${this.label}</slot>
        </label>
        <div class="base">
          <div class="track"></div>
          <div class="active-track"></div>
          ${handles} ${tooltip}
        </div>
        <div class="form-control__help-text" aria-hidden=${hasHelpText ? 'false' : 'true'}>
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
  }

  protected override willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

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
      this.value = adjustedValue;
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

  #onClickHandle(event: PointerEvent): void {
    if (this.disabled) return;
    this.baseDiv?.classList?.add('tooltip-visible');
    const handle = event.target as HTMLDivElement;

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
    if (x <= 0) return 0;
    if (x >= size) return 1;
    return x / size;
  }

  #updateActiveTrack(): void {
    const activeTrack = this.activeTrack;
    if (!activeTrack) return;

    if (this.min === this.max || this.value.length < 2) {
      activeTrack.style.display = 'none';
      activeTrack.style.left = '0';
      activeTrack.style.width = '0';
      return;
    }

    const start = (100 * (this.value[0] - this.min)) / (this.max - this.min);
    const span = (100 * (this.value[this.value.length - 1] - this.value[0])) / (this.max - this.min);

    activeTrack.style.display = 'inline-block';
    activeTrack.style.left = `${start}%`;
    activeTrack.style.width = `${span}%`;
  }

  #onKeyPress(event: KeyboardEvent): void {
    const handle = event.target as HTMLDivElement;
    const sliderId = +handle.dataset.sliderId!;

    let value = this.#sliderValues.get(sliderId);
    if (value === undefined) return;

    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowRight':
      case 'Up':
      case 'Right':
        value = Math.min(value + this.step, this.max);
        break;
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'Down':
      case 'Left':
        value = Math.max(value - this.step, this.min);
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
    handle.style.left = `calc( ${100 * pos}% - var(--thumb-size) * ${pos} )`;
    this.#updateTooltip(+handle.dataset.sliderId!);
  }

  #onFocus(): void {
    if (this.disabled) return;
    this.baseDiv?.classList?.add('tooltip-visible');
    if (this.#hasFocus) return;
    this.emit('sl-focus');
    this.#hasFocus = true;
  }

  #onBlur(event: FocusEvent): void {
    this.baseDiv?.classList?.remove('tooltip-visible');
    this.baseDiv?.classList?.remove('keyboard-focus');
    if (event.relatedTarget && this.shadowRoot?.contains(event.relatedTarget as Node)) return;
    this.emit('sl-blur');
    this.#hasFocus = false;
  }

  #updateTooltip(sliderId: number): void {
    if (!this.tooltipElem) return;
    if (!this.#sliderValues.has(sliderId)) return;
    const value = this.#sliderValues.get(sliderId)!;
    const pos = (value - this.min) / (this.max - this.min);
    this.tooltipElem.style.translate = `calc( ${pos} * ( ${this.baseDiv.offsetWidth}px - var(--thumb-size) ) - 50% + (var(--thumb-size) / 2) )`;
    this.tooltipElem.innerText = this.tooltipFormatter(value);
  }

  #onFocusHandle(event: FocusEvent): void {
    if (this.disabled) return;
    const handle = event.target as HTMLDivElement;
    if (!handle?.dataset?.sliderId) return;
    this.#updateTooltip(+handle.dataset.sliderId);
  }
}
