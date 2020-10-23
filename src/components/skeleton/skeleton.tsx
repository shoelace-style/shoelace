import { Component, Prop, h } from '@stencil/core';

/**
 * @since 2.0
 * @status stable
 *
 * @part base - The component's base wrapper.
 * @part indicator - The skeleton's indicator which is responsible for its color and animation.
 */

@Component({
  tag: 'sl-skeleton',
  styleUrl: 'skeleton.scss',
  shadow: true
})
export class Skeleton {
  /** Determines which effect the skeleton will use. */
  @Prop() effect: 'pulse' | 'sheen' | 'none' = 'sheen';

  render() {
    return (
      <div
        part="base"
        class={{
          skeleton: true,
          'skeleton--pulse': this.effect === 'pulse',
          'skeleton--sheen': this.effect === 'sheen'
        }}
        aria-busy="true"
        aria-live="polite"
      >
        <div part="indicator" class="skeleton__indicator" />
      </div>
    );
  }
}
