import { Component, h } from '@stencil/core';

@Component({
  tag: 's-dropdown-divider',
  styleUrl: 'dropdown-divider.scss',
  scoped: true
})
export class DropdownDivider {
  render() {
    return <div class="s-dropdown-divider" />;
  }
}
