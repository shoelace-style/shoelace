import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import ShoelaceElement from '../../internal/shoelace-element';
import styles from './badge.styles';
import type { CSSResultGroup } from 'lit';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The badge's content.
 *
 * @csspart base - The component's internal wrapper.
 */
@customElement('sl-badge')
export default class SlBadge extends ShoelaceElement {
  static styles: CSSResultGroup = styles;

  /** The badge's variant. */
  @property({ reflect: true }) variant: 'primary' | 'success' | 'neutral' | 'warning' | 'danger' | 'inverse' =
    'primary';

  /** Draws a pill-style badge with rounded edges. */
  @property({ type: Boolean, reflect: true }) pill = false;

  /** Makes the badge pulsate to draw attention. */
  @property({ type: Boolean, reflect: true }) pulse = false;

  /** Creates a transparent pulsing ring to direct the user to something on screen. */
  @property({ type: Boolean, reflect: true }) coachmark = false;

  render() {
    return html`
      <span
        part="base"
        class=${classMap({
          badge: true,
          'badge--primary': this.variant === 'primary',
          'badge--success': this.variant === 'success',
          'badge--neutral': this.variant === 'neutral',
          'badge--warning': this.variant === 'warning',
          'badge--danger': this.variant === 'danger',
          'badge--inverse': this.variant === 'inverse',
          'badge--pill': this.pill,
          'badge--pulse': this.pulse,
          'badge--coachmark badge--pill badge--pulse': this.coachmark
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
