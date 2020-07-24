import { Component, Prop, h } from '@stencil/core';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The badge's content.
 *
 * @part base - The base wrapper
 */

@Component({
  tag: 'sl-badge',
  styleUrl: 'badge.scss',
  shadow: true
})
export class Badge {
  badge: HTMLElement;

  /** The badge's type. */
  @Prop() type: 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'text' = 'primary';

  /** Set to true to draw a pill-style badge with rounded edges. */
  @Prop() pill = false;

  render() {
    return (
      <span
        ref={el => (this.badge = el)}
        part="base"
        class={{
          badge: true,

          // Types
          'badge--primary': this.type === 'primary',
          'badge--success': this.type === 'success',
          'badge--info': this.type === 'info',
          'badge--warning': this.type === 'warning',
          'badge--danger': this.type === 'danger',
          'badge--text': this.type === 'text',
          'badge--pill': this.pill
        }}
        role="status"
      >
        <slot />
      </span>
    );
  }
}
