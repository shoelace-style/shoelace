import { Component, h } from '@stencil/core';

/**
 * @since 2.0
 * @status stable
 *
 * @part base - The component's base wrapper.
 */

@Component({
  tag: 'sl-menu-divider',
  styleUrl: 'menu-divider.scss',
  shadow: true
})
export class MenuDivider {
  render() {
    return <div part="base" class="menu-divider" role="separator" aria-hidden="true" />;
  }
}
