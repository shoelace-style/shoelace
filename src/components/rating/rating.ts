import { html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../../components/icon/icon';
import { emit } from '../../internal/event';
import { clamp } from '../../internal/math';
import { watch } from '../../internal/watch';
import { LocalizeController } from '../../utilities/localize';
import styles from './rating.styles';
import type { CSSResultGroup } from 'lit';

/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon
 *
 * @event sl-change - Emitted when the rating's value changes.
 *
 * @csspart base - The component's internal wrapper.
 *
 * @cssproperty --symbol-color - The inactive color for symbols.
 * @cssproperty --symbol-color-active - The active color for symbols.
 * @cssproperty --symbol-size - The size of symbols.
 * @cssproperty --symbol-spacing - The spacing to use around symbols.
 */
@customElement('sl-rating')
export default class SlRating extends LitElement {
  static styles: CSSResultGroup = styles;

  @query('.rating') rating: HTMLElement;

  private readonly localize = new LocalizeController(this);

  @state() private hoverValue = 0;
  @state() private isHovering = false;

  /** The current rating. */
  @property({ type: Number }) value = 0;

  /** The highest rating to show. */
  @property({ type: Number }) max = 5;

  /** The minimum increment value allowed by the control. */
  @property({ type: Number }) precision = 1;

  /** Makes the rating readonly. */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /** Disables the rating. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** The name of the icon to display as the symbol. */
  @property() getSymbol: (value: number) => string = () => '<sl-icon name="star-fill" library="system"></sl-icon>';

  /** Sets focus on the rating. */
  focus(options?: FocusOptions) {
    this.rating.focus(options);
  }

  /** Removes focus from the rating. */
  blur() {
    this.rating.blur();
  }

  getValueFromMousePosition(event: MouseEvent) {
    return this.getValueFromXCoordinate(event.clientX);
  }

  getValueFromTouchPosition(event: TouchEvent) {
    return this.getValueFromXCoordinate(event.touches[0].clientX);
  }

  getValueFromXCoordinate(coordinate: number) {
    const isRtl = this.localize.dir() === 'rtl';
    const { left, right, width } = this.rating.getBoundingClientRect();
    const value = isRtl
      ? this.roundToPrecision(((right - coordinate) / width) * this.max, this.precision)
      : this.roundToPrecision(((coordinate - left) / width) * this.max, this.precision);

    return clamp(value, 0, this.max);
  }

  handleClick(event: MouseEvent) {
    this.setValue(this.getValueFromMousePosition(event));
  }

  setValue(newValue: number) {
    if (this.disabled || this.readonly) {
      return;
    }

    this.value = newValue === this.value ? 0 : newValue;
    this.isHovering = false;
  }

  handleKeyDown(event: KeyboardEvent) {
    const isLtr = this.localize.dir() === 'ltr';
    const isRtl = this.localize.dir() === 'rtl';

    if (this.disabled || this.readonly) {
      return;
    }

    if ((isLtr && event.key === 'ArrowLeft') || (isRtl && event.key === 'ArrowRight')) {
      const decrement = event.shiftKey ? 1 : this.precision;
      this.value = Math.max(0, this.value - decrement);
      event.preventDefault();
    }

    if ((isLtr && event.key === 'ArrowRight') || (isRtl && event.key === 'ArrowLeft')) {
      const increment = event.shiftKey ? 1 : this.precision;
      this.value = Math.min(this.max, this.value + increment);
      event.preventDefault();
    }

    if (event.key === 'Home') {
      this.value = 0;
      event.preventDefault();
    }

    if (event.key === 'End') {
      this.value = this.max;
      event.preventDefault();
    }
  }

  handleMouseEnter() {
    this.isHovering = true;
  }

  handleMouseMove(event: MouseEvent) {
    this.hoverValue = this.getValueFromMousePosition(event);
  }

  handleMouseLeave() {
    this.isHovering = false;
  }

  handleTouchStart(event: TouchEvent) {
    this.hoverValue = this.getValueFromTouchPosition(event);

    // Prevent scrolling when touch is initiated
    event.preventDefault();
  }

  handleTouchMove(event: TouchEvent) {
    this.isHovering = true;
    this.hoverValue = this.getValueFromTouchPosition(event);
  }

  handleTouchEnd(event: TouchEvent) {
    this.isHovering = false;
    this.setValue(this.hoverValue);

    // Prevent click on mobile devices
    event.preventDefault();
  }

  @watch('value', { waitUntilFirstUpdate: true })
  handleValueChange() {
    emit(this, 'sl-change');
  }

  roundToPrecision(numberToRound: number, precision = 0.5) {
    const multiplier = 1 / precision;
    return Math.ceil(numberToRound * multiplier) / multiplier;
  }

  render() {
    const isRtl = this.localize.dir() === 'rtl';
    const counter = Array.from(Array(this.max).keys());
    let displayValue = 0;

    if (this.disabled || this.readonly) {
      displayValue = this.value;
    } else {
      displayValue = this.isHovering ? this.hoverValue : this.value;
    }

    return html`
      <div
        part="base"
        class=${classMap({
          rating: true,
          'rating--readonly': this.readonly,
          'rating--disabled': this.disabled,
          'rating--rtl': isRtl
        })}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        aria-readonly=${this.readonly ? 'true' : 'false'}
        aria-valuenow=${this.value}
        aria-valuemin=${0}
        aria-valuemax=${this.max}
        tabindex=${this.disabled ? '-1' : '0'}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mouseenter=${this.handleMouseEnter}
        @touchstart=${this.handleTouchStart}
        @mouseleave=${this.handleMouseLeave}
        @touchend=${this.handleTouchEnd}
        @mousemove=${this.handleMouseMove}
        @touchmove=${this.handleTouchMove}
      >
        <span class="rating__symbols rating__symbols--inactive">
          ${counter.map(index => {
            // Users can click the current value to clear the rating. When this happens, we set this.isHovering to
            // false to prevent the hover state from confusing them as they move the mouse out of the control. This
            // extra mouseenter will reinstate it if they happen to mouse over an adjacent symbol.
            return html`
              <span
                class=${classMap({
                  rating__symbol: true,
                  'rating__symbol--hover': this.isHovering && Math.ceil(displayValue) === index + 1
                })}
                role="presentation"
                @mouseenter=${this.handleMouseEnter}
              >
                ${unsafeHTML(this.getSymbol(index + 1))}
              </span>
            `;
          })}
        </span>

        <span class="rating__symbols rating__symbols--indicator">
          ${counter.map(index => {
            return html`
              <span
                class=${classMap({
                  rating__symbol: true,
                  'rating__symbol--hover': this.isHovering && Math.ceil(displayValue) === index + 1
                })}
                style=${styleMap({
                  clipPath:
                    displayValue > index + 1
                      ? 'none'
                      : isRtl
                      ? `inset(0 0 0 ${100 - ((displayValue - index) / 1) * 100}%)`
                      : `inset(0 ${100 - ((displayValue - index) / 1) * 100}% 0 0)`
                })}
                role="presentation"
              >
                ${unsafeHTML(this.getSymbol(index + 1))}
              </span>
            `;
          })}
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-rating': SlRating;
  }
}
