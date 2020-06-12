import { Component, Prop, h } from '@stencil/core';

/**
 * @since 1.0.0
 * @status ready
 */

@Component({
  tag: 'sl-select',
  styleUrl: 'select.scss',
  shadow: true
})
export class Select {
  /** Set to true to disable the select control. */
  @Prop() disabled = false;

  /** The select's size. */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  render() {
    return (
      <sl-dropdown>
        <div slot="trigger" class="sl-select__input" role="button" tabIndex={this.disabled ? -1 : 0}>
          Select
        </div>
        <slot />
      </sl-dropdown>
    );
  }
}
