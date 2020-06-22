import { Component, Host, Prop, Watch, h } from '@stencil/core';

/**
 * @since 1.0.0
 * @status ready
 */

@Component({
  tag: 'sl-progress-ring',
  styleUrl: 'progress-ring.scss',
  shadow: true
})
export class Progress {
  indicator: SVGCircleElement;

  /** The size of the progress ring in pixels. */
  @Prop() size = 128;

  /** The stroke width of the progress ring in pixels. */
  @Prop() strokeWidth = 6;

  /** The current progress percentage, 0 - 100. */
  @Prop() percentage: number;

  @Watch('percentage')
  handlePercentageChange() {
    this.updateProgress();
  }

  componentDidLoad() {
    this.updateProgress();
  }

  updateProgress() {
    const radius = this.indicator.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (this.percentage / 100) * circumference;

    this.indicator.style.strokeDasharray = `${circumference} ${circumference}`;
    this.indicator.style.strokeDashoffset = `${offset}`;
  }

  render() {
    return (
      <Host>
        <svg class="progress-ring" width={this.size} height={this.size}>
          <circle
            class="progress-ring__track"
            stroke-width={this.strokeWidth}
            stroke-linecap="round"
            fill="transparent"
            r={(this.size - this.strokeWidth) / 2}
            cx={this.size / 2}
            cy={this.size / 2}
          />

          <circle
            ref={(el: SVGCircleElement) => (this.indicator = el)}
            class="progress-ring__indicator"
            stroke-width={this.strokeWidth}
            stroke-linecap="round"
            fill="transparent"
            r={(this.size - this.strokeWidth) / 2}
            cx={this.size / 2}
            cy={this.size / 2}
          />
        </svg>

        <span class="progress-ring__label">
          <slot />
        </span>
      </Host>
    );
  }
}
