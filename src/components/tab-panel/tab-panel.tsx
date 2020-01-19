import { Component, Element, Host, Prop, h } from '@stencil/core';

let id = 0;

@Component({
  tag: 'sl-tab-panel',
  styleUrl: 'tab-panel.scss',
  shadow: true
})
export class TabPanel {
  id = `sl-tab-panel-${++id}`;

  @Element() host: HTMLElement;

  /** The tab panel's name. */
  @Prop() name = '';

  /** Set to true to show the tab panel. */
  @Prop() active = false;

  render() {
    return (
      // If the user didn't provide an ID, we'll set one so we can link tabs and tab panels with aria labels
      <Host id={this.host.id || this.id}>
        <div
          class="sl-tab-panel"
          role="tabpanel"
          aria-selected={this.active}
          aria-hidden={!this.active}
          hidden={!this.active}
        >
          <slot />
        </div>
      </Host>
    );
  }
}
