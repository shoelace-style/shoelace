import { Component, Element, Host, Prop, h } from '@stencil/core';

let id = 0;

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The tab panel's content.
 *
 * @part base - The component's base wrapper.
 */

@Component({
  tag: 'sl-tab-panel',
  styleUrl: 'tab-panel.scss',
  shadow: true
})
export class TabPanel {
  componentId = `tab-panel-${++id}`;

  @Element() host: HTMLSlTabPanelElement;

  /** The tab panel's name. */
  @Prop() name = '';

  /** When true, the tab panel will be shown. */
  @Prop({ reflect: true }) active = false;

  render() {
    return (
      // If the user didn't provide an ID, we'll set one so we can link tabs and tab panels with aria labels
      <Host id={this.host.id || this.componentId} style={{ display: this.active ? 'block' : 'none' }}>
        <div
          part="base"
          class="tab-panel"
          role="tabpanel"
          aria-selected={this.active ? 'true' : 'false'}
          aria-hidden={this.active ? 'false' : 'true'}
        >
          <slot />
        </div>
      </Host>
    );
  }
}
