import { Component, Element, Host, Prop, h } from '@stencil/core';

let id = 0;

/** @slot - The tab panel's content. */

@Component({
  tag: 'sl-tab-panel',
  styleUrl: 'tab-panel.scss',
  shadow: true
})
export class TabPanel {
  id = `sl-tab-panel-${++id}`;

  @Element() host: HTMLSlTabPanelElement;

  /** The tab panel's name. */
  @Prop() name = '';

  /** When true, the tab panel will be shown. */
  @Prop() active = false;

  render() {
    return (
      // If the user didn't provide an ID, we'll set one so we can link tabs and tab panels with aria labels
      <Host id={this.host.id || this.id} style={{ display: this.active ? 'block' : 'none' }}>
        <div class="sl-tab-panel" role="tabpanel" aria-selected={this.active} aria-hidden={!this.active}>
          <slot />
        </div>
      </Host>
    );
  }
}
