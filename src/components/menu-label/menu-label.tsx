import { Component, h } from '@stencil/core';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The menu label's content.
 *
 * @part base - The component's base wrapper.
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
