import { Component, h } from '@stencil/core';

/**
 * @since 1.0
 * @status stable
 *
 * @part - The base element of the menu divider.
 */

@Component({
  tag: 'sl-menu-divider',
  styleUrl: 'menu-divider.scss',
  shadow: true
})
export class MenuDivider {
  render() {
    return <div part="base" class="menu-divider" role="separator" />;
  }
}
