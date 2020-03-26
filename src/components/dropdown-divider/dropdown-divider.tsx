import { Component, h } from '@stencil/core';

@Component({
  tag: 'sh-dropdown-divider',
  styleUrl: 'dropdown-divider.scss',
  shadow: true
})
export class DropdownDivider {
  render() {
    return <div class="sh-dropdown-divider" />;
  }
}
