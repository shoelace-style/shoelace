import { Component, h } from '@stencil/core';

/**
 * @since 1.0.0
 * @status ready
 */

@Component({
  tag: 'sl-menu-label',
  styleUrl: 'menu-label.scss',
  shadow: true
})
export class MenuLabel {
  render() {
    return (
      <div class="sl-menu-label">
        <slot />
      </div>
    );
  }
}
