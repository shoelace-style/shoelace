import { Component, Host, Prop, Watch, h } from '@stencil/core';

@Component({
  tag: 'sh-progress-ring',
  styleUrl: 'progress-ring.scss',
  shadow: true
})
export class Progress {
  indicator: SVGCircleElement;

  /** The diameter of the progress ring in pixels. */
  @Prop() diameter = 128;

  /** The stroke width of the progress ring in pixels. */
  @Prop() stroke = 6;

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
        <svg class="sh-progress-ring" width={this.diameter} height={this.diameter}>
          <circle
            class="sh-progress-ring__track"
            stroke-width={this.stroke}
            stroke-linecap="round"
            fill="transparent"
            r={(this.diameter - this.stroke) / 2}
            cx={this.diameter / 2}
            cy={this.diameter / 2}
          />

          <circle
            ref={(el: SVGCircleElement) => (this.indicator = el)}
            class="sh-progress-ring__indicator"
            stroke-width={this.stroke}
            stroke-linecap="round"
            fill="transparent"
            r={(this.diameter - this.stroke) / 2}
            cx={this.diameter / 2}
            cy={this.diameter / 2}
          />
        </svg>

        <span class="sh-progress-ring__label">
          <slot />
        </span>
      </Host>
    );
  }
}
