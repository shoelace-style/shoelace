import { html, Shoemaker } from '@shoelace-style/shoemaker';
import styles from 'sass:./progress-ring.scss';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - A label to show inside the ring.
 *
 * @part base - The component's base wrapper.
 * @part label - The progress ring label.
 */
export default class SlProgressRing extends Shoemaker {
  static tag = 'sl-progress-ring';
  static props = ['size', 'strokeWidth', 'percentage'];
  static styles = styles;

  private indicator: SVGCircleElement;

  /** The size of the progress ring in pixels. */
  size = 128;

  /** The stroke width of the progress ring in pixels. */
  strokeWidth = 4;

  /** The current progress percentage, 0 - 100. */
  percentage: number;

  watchPercentage() {
    this.updateProgress();
  }

  onReady() {
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
    return html`
      <div part="base" class="progress-ring">
        <svg class="progress-ring__image" width=${this.size} height=${this.size}>
          <circle
            class="progress-ring__track"
            stroke-width="${this.strokeWidth}"
            stroke-linecap="round"
            fill="transparent"
            r=${this.size / 2 - this.strokeWidth * 2}
            cx=${this.size / 2}
            cy=${this.size / 2}
          />

          <circle
            ref=${(el: SVGCircleElement) => (this.indicator = el)}
            class="progress-ring__indicator"
            stroke-width="${this.strokeWidth}"
            stroke-linecap="round"
            fill="transparent"
            r=${this.size / 2 - this.strokeWidth * 2}
            cx=${this.size / 2}
            cy=${this.size / 2}
          />
        </svg>

        <span part="label" class="progress-ring__label">
          <slot />
        </span>
      </div>
    `;
  }
}
