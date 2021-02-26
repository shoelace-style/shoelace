import { classMap, html, Shoemaker } from '@shoelace-style/shoemaker';
import styles from 'sass:./badge.scss';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The badge's content.
 *
 * @part base - The base wrapper
 */
export default class SlBadge extends Shoemaker {
  static tag = 'sl-badge';
  static props = ['type', 'pill', 'pulse'];
  static reflect = ['type', 'pill', 'pulse'];
  static styles = styles;

  /** The badge's type. */
  type: 'primary' | 'success' | 'info' | 'warning' | 'danger' = 'primary';

  /** Draws a pill-style badge with rounded edges. */
  pill = false;

  /** Makes the badge pulsate to draw attention. */
  pulse = false;

  render() {
    return html`
      <span
        part="base"
        class=${classMap({
          badge: true,
          'badge--primary': this.type === 'primary',
          'badge--success': this.type === 'success',
          'badge--info': this.type === 'info',
          'badge--warning': this.type === 'warning',
          'badge--danger': this.type === 'danger',
          'badge--pill': this.pill,
          'badge--pulse': this.pulse
        })}
        role="status"
      >
        <slot />
      </span>
    `;
  }
}
