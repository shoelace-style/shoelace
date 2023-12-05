import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import ShoelaceElement from '../../internal/shoelace-element.js';
import styles from './badge.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Badges are used to draw attention and display counts.
 * @documentation https://shoelace.style/components/badge
 * @status stable
 * @since 2.0
 * @pattern stable
 * @figma ready
 *
 * @slot - The badge's content.
 *
 * @csspart base - The component's base wrapper.
 */
export default class SlBadge extends ShoelaceElement {
  static styles: CSSResultGroup = styles;

  /** The badge's theme variant. */
  @property({ reflect: true }) variant: 'primary' | 'success' | 'neutral' | 'warning' | 'danger' | 'gray' | 'red' =
    'red';

  /** Draws a square-style badge with rounded edges. */
  @property({ type: Boolean, reflect: true }) square = false;

  /** Makes the badge pulsate to draw attention. */
  @property({ type: Boolean, reflect: true }) pulse = false;

  /** Property to hold the number value */
  @property({ type: Number }) value: number | null = null;

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('value') && this.value !== null) {
      this.value = Math.min(this.value, 9999); // Limit the value to 9999
    }
  }

  /** Method to format the number */
  formatNumber(value: number | null) {
    return value !== null ? (value > 99 ? '99+' : value.toString()) : '';
  }

  render() {
    return html`
      <span
        part="base"
        class=${classMap({
          badge: true,
          'badge--primary': this.variant === 'primary',
          'badge--success': this.variant === 'success',
          'badge--neutral': this.variant === 'neutral' || this.variant === 'gray',
          'badge--warning': this.variant === 'warning',
          'badge--danger': this.variant === 'danger' || this.variant === 'red',
          'badge--square': this.square,
          'badge--pulse': this.pulse
        })}
        role="status"
      >
        ${this.value !== null ? this.formatNumber(this.value) : html`<slot></slot>`}
      </span>
    `;
  }
}
