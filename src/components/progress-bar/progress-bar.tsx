import { Component, Prop, h } from '@stencil/core';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - A label to show inside the indicator.
 *
 * @part base - The component's base wrapper.
 * @part indicator - The progress bar indicator.
 * @part label - The progress bar label.
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
        part="base"
        class="progress-bar"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={this.percentage}
      >
        <div
          part="indicator"
          class="progress-bar__indicator"
          style={{
            width: `${this.percentage}%`
          }}
        >
          <span part="label" class="progress-bar__label">
            <slot />
          </span>
        </div>
      </div>
    );
  }
}
