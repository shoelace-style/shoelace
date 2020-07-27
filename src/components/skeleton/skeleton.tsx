import { Component, Prop, h } from '@stencil/core';

/**
 * @since 2.0
 * @status stable
 *
 * @part base - The component's base wrapper.
 */

@Component({
  tag: 'sl-skeleton',
  styleUrl: 'skeleton.scss',
  shadow: true
})
export class Skeleton {
  /** When enabled, the skeleton will be animated to indicate that content is loading. */
  @Prop() loading = false;

  render() {
    return (
      <div
        part="base"
        class={{
          skeleton: true,
          'skeleton--loading': this.loading
        }}
        aria-busy={this.loading}
        aria-live="polite"
      />
    );
  }
}
