import { classMap, html, styleMap, Shoemaker } from '@shoelace-style/shoemaker';
import styles from 'sass:./rating.scss';
import { focusVisible } from '../../internal/focus-visible';
import { clamp } from '../../internal/math';

/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon
 *
 * @part base - The component's base wrapper.
 *
 * @emit sl-change - Emitted when the rating's value changes.
 */
export default class SlRating extends Shoemaker {
  static tag = 'sl-rating';
  static props = ['hoverValue', 'isHovering', 'value', 'max', 'precision', 'readonly', 'disabled', 'symbol'];
  static reflect = ['readonly', 'disabled'];
  static styles = styles;

  private hoverValue = 0;
  private isHovering = false;
  private rating: HTMLElement;

  /** The current rating. */
  value = 0;

  /** The highest rating to show. */
  max = 5;

  /** The minimum increment value allowed by the control. */
  precision = 1;

  /** Makes the rating readonly. */
  readonly = false;

  /** Disables the rating. */
  disabled = false;

  /** The name of the icon to display as the symbol. */
  symbol: string | ((value: number) => string) = 'star-fill';

  /** Sets focus on the rating. */
  setFocus(options?: FocusOptions) {
    this.rating.focus(options);
  }

  /** Removes focus from the rating. */
  removeFocus() {
    this.rating.blur();
  }

  onReady() {
    focusVisible.observe(this.rating);
  }

  onDisconnect() {
    focusVisible.unobserve(this.rating);
  }

  getValueFromMousePosition(event: MouseEvent) {
    const containerLeft = this.rating.getBoundingClientRect().left;
    const containerWidth = this.rating.getBoundingClientRect().width;
    return clamp(
      this.roundToPrecision(((event.clientX - containerLeft) / containerWidth) * this.max, this.precision),
      0,
      this.max
    );
  }

  handleClick(event: MouseEvent) {
    if (this.disabled || this.readonly) {
      return;
    }

    const newValue = this.getValueFromMousePosition(event);

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

  handleMouseLeave() {
    this.isHovering = false;
  }

  handleMouseMove(event: MouseEvent) {
    this.hoverValue = this.getValueFromMousePosition(event);
  }

  roundToPrecision(numberToRound: number, precision = 0.5) {
    const multiplier = 1 / precision;
    return Math.ceil(numberToRound * multiplier) / multiplier;
  }

  watchValue() {
    this.emit('sl-change');
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
        ref=${(el: HTMLElement) => (this.rating = el)}
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
        onclick=${this.handleClick.bind(this)}
        onkeydown=${this.handleKeyDown.bind(this)}
        onmouseenter=${this.handleMouseEnter.bind(this)}
        onmouseleave=${this.handleMouseLeave.bind(this)}
        onmousemove=${this.handleMouseMove.bind(this)}
      >
        <span class="rating__symbols rating__symbols--inactive">
          ${counter.map(index => {
            // Users can click the current value to clear the rating. When this happens, we set this.isHovering to
            // false to prevent the hover state from confusing them as they move the mouse out of the control. This
            // extra mouseenter will reinstate it if they happen to mouse over an adjacent symbol.
            const symbol = typeof this.symbol === 'function' ? this.symbol(index + 1) : this.symbol;
            return html`
              <span
                class=${classMap({
                  rating__symbol: true,
                  'rating__symbol--hover': this.isHovering && Math.ceil(displayValue) === index + 1
                })}
                role="presentation"
                onmouseenter=${this.handleMouseEnter.bind(this)}
              >
                <sl-icon .name=${symbol}></sl-icon>
              </span>
            `;
          })}
        </span>

        <span class="rating__symbols rating__symbols--indicator">
          ${counter.map(index => {
            const symbol = typeof this.symbol === 'function' ? this.symbol(index + 1) : this.symbol;
            return html`
              <span
                class=${classMap({
                  rating__symbol: true,
                  'rating__symbol--hover': this.isHovering && Math.ceil(displayValue) === index + 1
                })}
                style=${styleMap({
                  clipPath:
                    displayValue > index + 1 ? null : `inset(0 ${100 - ((displayValue - index) / 1) * 100}% 0 0)`
                })}
                role="presentation"
              >
                <sl-icon .name=${symbol}></sl-icon>
              </span>
            `;
          })}
        </span>
      </div>
    `;
  }
}
