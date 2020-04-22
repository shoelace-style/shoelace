import { Component, h } from '@stencil/core';

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
