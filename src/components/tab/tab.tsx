import { Component, Element, Host, Method, Prop, h } from '@stencil/core';

let id = 0;

/**
 * @since 1.0
 * @status stable
 *
 * @slot - The tab's label.
 *
 * @part base - The component's base wrapper.
 */

@Component({
  tag: 'sl-tab',
  styleUrl: 'tab.scss',
  shadow: true
})
export class Tab {
  id = `tab-${++id}`;
  tab: HTMLElement;

  @Element() host: HTMLSlTabElement;

  /** The name of the tab panel the tab will control. The panel must be located in the same tab group. */
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
          part="base"
          ref={el => (this.tab = el)}
          class={{
            tab: true,

            // States
            'tab--active': this.active,
            'tab--disabled': this.disabled
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
