import { Component, h } from '@stencil/core';

/**
 * @since 1.0
 * @status stable
 */

@Component({
  tag: 'sl-menu-divider',
  styleUrl: 'menu-divider.scss',
  shadow: true
})
export class MenuDivider {
  render() {
    return <div class="menu-divider" role="separator" />;
  }
}
