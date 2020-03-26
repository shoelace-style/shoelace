import { Component, Prop, h } from '@stencil/core';

/**
 * @slot - A label to show inside the indicator.
 */

@Component({
  tag: 'sh-progress-bar',
  styleUrl: 'progress-bar.scss',
  shadow: true
})
export class ProgressBar {
  /** The progress bar's percentage, 0 to 100. */
  @Prop() percentage = 0;

  /** The height of the progress bar in pixels. */
  @Prop() height = 18;

  render() {
    return (
      <div
        class="sh-progress-bar"
        style={{
          '--height': `${this.height}px`
        }}
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={this.percentage}
      >
        <div
          class="sh-progress-bar__indicator"
          style={{
            width: `${this.percentage}%`
          }}
        >
          <span class="sh-progress-bar__label">
            <slot />
          </span>
        </div>
      </div>
    );
  }
}
