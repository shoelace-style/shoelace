import { Component, Element, Host, Method, Prop, h } from '@stencil/core';

let id = 0;

/** @slot - The tab's label. */

@Component({
  tag: 'sl-tab',
  styleUrl: 'tab.scss',
  shadow: true
})
export class Tab {
  id = `sl-tab-${++id}`;
  tab: HTMLElement;

  @Element() host: HTMLSlTabElement;

  /** The name of the tab panel the tab will control. The panel must exist in the same tab group. */
  @Prop() panel = '';

  /** Set to true to draw the tab in an active state. */
  @Prop() active = false;

  /** Set to true to draw the tab in a disabled state. */
  @Prop() disabled = false;

  /** Sets focus to the tab. */
  @Method()
  async setFocus() {
    this.tab.focus({ preventScroll: true });
  }

  /** Removes focus from the tab. */
  @Method()
  async removeFocus() {
    this.tab.blur();
  }

  render() {
    return (
      // If the user didn't provide an ID, we'll set one so we can link tabs and tab panels with aria labels
      <Host id={this.host.id || this.id}>
        <div
          ref={el => (this.tab = el)}
          class={{
            'sl-tab': true,

            // States
            'sl-tab--active': this.active,
            'sl-tab--disabled': this.disabled
          }}
          role="tab"
          aria-disabled={this.disabled}
          aria-selected={this.active}
          tabindex={this.disabled || !this.active ? '-1' : '0'}
        >
          <slot />
        </div>
      </Host>
    );
  }
}
