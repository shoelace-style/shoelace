import { Component, h } from '@stencil/core';

/**
 * @since 1.0.0
 * @status ready
 */

@Component({
  tag: 'sl-dropdown-divider',
  styleUrl: 'dropdown-divider.scss',
  shadow: true
})
export class DropdownDivider {
  render() {
    return <div class="sl-dropdown-divider" role="separator" />;
  }
}
