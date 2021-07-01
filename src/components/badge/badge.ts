import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit-html/directives/class-map';
import styles from 'sass:./badge.scss';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The badge's content.
 *
 * @csspart base - The base wrapper
 */
@customElement('sl-badge')
export default class SlBadge extends LitElement {
  static styles = unsafeCSS(styles);

  /** The badge's type. */
  @property({ reflect: true }) type: 'primary' | 'success' | 'info' | 'warning' | 'danger' = 'primary';

  /** Draws a pill-style badge with rounded edges. */
  @property({ type: Boolean, reflect: true }) pill = false;

  /** Makes the badge pulsate to draw attention. */
  @property({ type: Boolean, reflect: true }) pulse = false;

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
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-badge': SlBadge;
  }
}
