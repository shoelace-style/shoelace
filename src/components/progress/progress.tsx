import { Component, Host, Prop, h } from '@stencil/core';

/**
 * @slot - A label to show inside the indicator.
 */

@Component({
  tag: 'sl-progress',
  styleUrl: 'progress.scss',
  shadow: true
})
export class Progress {
  /** The indicator's percentage. */
  @Prop() percentage = 0;

  /** The indicator's color. */
  @Prop() color = 'var(--sl-color-primary-50)';

  /** The progress bar's height including unit (e.g. `20px`). */
  @Prop() height = '6px';

  render() {
    return (
      <Host style={{ '--height': this.height }}>
        <div class="sl-progress">
          <div
            class="sl-progress__indicator"
            style={{
              backgroundColor: this.color,
              width: `${this.percentage}%`
            }}
          >
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}
