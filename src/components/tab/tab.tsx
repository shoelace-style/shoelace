import { Component, Method, Prop, h } from '@stencil/core';

@Component({
  tag: 'sl-tab',
  styleUrl: 'tab.scss',
  shadow: true
})
export class Tab {
  tab: HTMLElement;

  /** The name of the tab panel the tab will be synced to. The panel must exist in the same `<sl-tabs>` element. */
  @Prop() panel = '';

  /** Set to true to draw the tab in an active state. */
  @Prop() active = false;

  /** Set to true to draw the tab in a disabled state. */
  @Prop() disabled = false;

  /** Sets focus to the tab. */
  @Method()
  async setFocus() {
    this.tab.focus();
  }

  /** Removes focus from the tab. */
  @Method()
  async removeFocus() {
    this.tab.blur();
  }

  render() {
    return (
      <div
        ref={el => (this.tab = el)}
        class={{
          'sl-tab': true,
          'sl-tab--active': this.active,
          'sl-tab--disabled': this.disabled
        }}
        role="tab"
        aria-selected={this.active}
        tabindex={this.disabled || !this.active ? '-1' : '0'}
      >
        <slot />
      </div>
    );
  }
}
