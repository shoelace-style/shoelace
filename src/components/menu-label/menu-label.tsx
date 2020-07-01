import { Component, h } from '@stencil/core';

/**
 * @since 1.0
 * @status stable
 */

@Component({
  tag: 'sl-menu-label',
  styleUrl: 'menu-label.scss',
  shadow: true
})
export class MenuLabel {
  render() {
    return (
      <div class="menu-label">
        <slot />
      </div>
    );
  }
}
