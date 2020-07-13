import { Component, h } from '@stencil/core';

/**
 * @since 1.0
 * @status stable
 *
 * @slot - The menu label's content.
 *
 * @part base - The base element of the menu label.
 */

@Component({
  tag: 'sl-menu-label',
  styleUrl: 'menu-label.scss',
  shadow: true
})
export class MenuLabel {
  render() {
    return (
      <div part="base" class="menu-label">
        <slot />
      </div>
    );
  }
}
