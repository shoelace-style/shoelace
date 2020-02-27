import { Component, Prop, h } from '@stencil/core';

/**
 * @slot - A label to show inside the indicator.
 */

@Component({
  tag: 'sl-progress-bar',
  styleUrl: 'progress-bar.scss',
  shadow: true
})
export class ProgressBar {
  /** The progress bar's percentage, 0 to 100. */
  @Prop() percentage = 0;

  render() {
    return (
      <div
        class="sl-progress-bar"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={this.percentage}
      >
        <div
          class="sl-progress-bar__indicator"
          style={{
            width: `${this.percentage}%`
          }}
        >
          <slot />
        </div>
      </div>
    );
  }
}
