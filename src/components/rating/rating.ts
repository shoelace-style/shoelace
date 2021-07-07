import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { emit } from '../../internal/event';
import { watch } from '../../internal/watch';
import { focusVisible } from '../../internal/focus-visible';
import { clamp } from '../../internal/math';
import styles from 'sass:./rating.scss';

/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon
 *
 * @event sl-change - Emitted when the rating's value changes.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --symbol-color - The inactive color for symbols.
 * @cssproperty --symbol-color-active - The active color for symbols.
 * @cssproperty --symbol-size - The size of symbols.
 * @cssproperty --symbol-spacing - The spacing to use around symbols.
 */
@customElement('sl-rating')
export default class SlRating extends LitElement {
  static styles = unsafeCSS(styles);

  @query('.rating') rating: HTMLElement;

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
  // @ts-ignore
  @property() getSymbol: (value: number) => string = (value: number) =>
    '<sl-icon name="star-fill" library="system"></sl-icon>';

  /** Sets focus on the rating. */
  focus(options?: FocusOptions) {
    this.rating.focus(options);
  }

  /** Removes focus from the rating. */
  blur() {
    this.rating.blur();
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(() => focusVisible.observe(this.rating));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    focusVisible.unobserve(this.rating);
  }

  getValueFromMousePosition(event: MouseEvent) {
    return this.getValueFromXCoordinate(event.clientX);
  }

  getValueFromTouchPosition(event: TouchEvent) {
    return this.getValueFromXCoordinate(event.touches[0].clientX);
  }

  getValueFromXCoordinate(coordinate: number) {
    const containerLeft = this.rating.getBoundingClientRect().left;
    const containerWidth = this.rating.getBoundingClientRect().width;
    return clamp(
      this.roundToPrecision(((coordinate - containerLeft) / containerWidth) * this.max, this.precision),
      0,
      this.max
    );
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
    if (this.disabled || this.readonly) {
      return;
    }

    if (event.key === 'ArrowLeft') {
      const decrement = event.shiftKey ? 1 : this.precision;
      this.value = Math.max(0, this.value - decrement);
      event.preventDefault();
    }

    if (event.key === 'ArrowRight') {
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
          'rating--disabled': this.disabled
        })}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        aria-readonly=${this.readonly ? 'true' : 'false'}
        aria-value=${this.value}
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
                    displayValue > index + 1 ? 'none' : `inset(0 ${100 - ((displayValue - index) / 1) * 100}% 0 0)`
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
