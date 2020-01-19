import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'sl-tab-panel',
  styleUrl: 'tab-panel.scss',
  shadow: true
})
export class TabPanel {
  /** The tab panel's name. */
  @Prop() name = '';

  /** Set to true to show the tab panel. */
  @Prop() active = false;

  render() {
    return (
      <div class="sl-tab-panel" role="tabpanel" aria-selected={this.active} hidden={!this.active}>
        <slot />
      </div>
    );
  }
}
