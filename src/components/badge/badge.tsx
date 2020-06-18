import { Component, Prop, h } from '@stencil/core';

/**
 * @since 1.0.0
 * @status experimental
 *
 * @slot - The badge's content.
 */

//
// TODO:
//
// - transition in/out when label disappears
// - prevent initial rerender if possible (requestAnimationFrame hack)
//

@Component({
  tag: 'sl-badge',
  styleUrl: 'badge.scss',
  shadow: true
})
export class Badge {
  badge: HTMLElement;
  hasSlot: boolean;

  /** The badge's type. */
  @Prop() type: 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'text' = 'primary';

  render() {
    return (
      <span
        ref={el => (this.badge = el)}
        class={{
          'sl-badge': true,

          // Types
          'sl-badge--primary': this.type === 'primary',
          'sl-badge--success': this.type === 'success',
          'sl-badge--info': this.type === 'info',
          'sl-badge--warning': this.type === 'warning',
          'sl-badge--danger': this.type === 'danger',
          'sl-badge--text': this.type === 'text'
        }}
        role="status"
      >
        <slot />
      </span>
    );
  }
}
