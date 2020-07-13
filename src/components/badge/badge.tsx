import { Component, Prop, h } from '@stencil/core';

/**
 * @since 1.0
 * @status experimental
 *
 * @slot - The badge's content.
 *
 * @part base - The badge base element.
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
        part="base"
        class={{
          badge: true,

          // Types
          'badge--primary': this.type === 'primary',
          'badge--success': this.type === 'success',
          'badge--info': this.type === 'info',
          'badge--warning': this.type === 'warning',
          'badge--danger': this.type === 'danger',
          'badge--text': this.type === 'text'
        }}
        role="status"
      >
        <slot />
      </span>
    );
  }
}
