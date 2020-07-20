import { Component, Event, EventEmitter, Prop, State, Watch, h } from '@stencil/core';
import { focusVisible } from '../../utilities/focus-visible';
import { clamp } from '../../utilities/math';

/**
 * @since 2.0
 * @status stable
 *
 * @part base - The component's base wrapper.
 */

//
// TODO:
//
// - sizing
// - labels
// - disabled
// - readonly
// - custom icons
// - icon should grow on hover
//

@Component({
  tag: 'sl-rating',
  styleUrl: 'rating.scss',
  shadow: true
})
export class Rating {
  constructor() {
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  rating: HTMLElement;

  @State() hoverValue = 0;
  @State() isHovering = false;

  /** The current rating. */
  @Prop({ mutable: true, reflect: true }) value = 2.5;

  /** The highest rating to show. */
  @Prop() max = 5;

  /** The minimum increment value allowed by the control. */
  @Prop() precision = 0.5;

  /** Makes the rating readonly. */
  @Prop() readonly = false;

  /** Disables the rating. */
  @Prop() disabled = false;

  @Watch('value')
  handleValueChange() {
    this.slChange.emit();
  }

  /** Emitted when the rating's value changes. */
  @Event() slChange: EventEmitter;

  componentDidLoad() {
    focusVisible.observe(this.rating);
  }

  componentDidUnload() {
    focusVisible.unobserve(this.rating);
  }

  getValueFromMousePosition(event: MouseEvent) {
    const containerLeft = this.rating.getBoundingClientRect().left;
    const containerWidth = this.rating.getBoundingClientRect().width;
    return clamp(this.roundToPrecision(((event.clientX - containerLeft) / containerWidth) * this.max), 0, this.max);
  }

  handleClick(event: MouseEvent) {
    this.value = this.getValueFromMousePosition(event);
  }

  handleKeyDown(event: KeyboardEvent) {
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

  handleMouseOver() {
    this.isHovering = true;
  }

  handleMouseOut() {
    this.isHovering = false;
  }

  handleMouseMove(event: MouseEvent) {
    this.hoverValue = this.getValueFromMousePosition(event);
  }

  roundToPrecision(numberToRound: number, precision = 0.5) {
    const multiplier = 1 / precision;
    return Math.ceil(numberToRound * multiplier) / multiplier;
  }

  render() {
    const counter = Array.from(Array(this.max));
    const displayValue = this.isHovering ? this.hoverValue : this.value;

    return (
      <div
        ref={el => (this.rating = el)}
        part="base"
        class="rating"
        aria-value={this.value}
        aria-valuemin={0}
        aria-valuemax={this.max}
        tabIndex={0}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        onMouseEnter={this.handleMouseOver}
        onMouseLeave={this.handleMouseOut}
        onMouseMove={this.handleMouseMove}
      >
        <span class="rating__symbols">
          {counter.map(() => (
            <span class="rating__symbol">
              <sl-icon name="star-fill" role="presentation" />
            </span>
          ))}
        </span>

        <span
          class="rating__symbols rating__indicator"
          style={{
            width: `${(displayValue / this.max) * 100}%`
          }}
        >
          {counter.map(() => (
            <span class="rating__symbol">
              <sl-icon name="star-fill" role="presentation" />
            </span>
          ))}
        </span>
      </div>
    );
  }
}
