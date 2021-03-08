import { LitElement, html, property, query, unsafeCSS } from 'lit-element';
import { tag, watch } from '../../internal/decorators';
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
@tag('sl-progress-ring')
export class SlProgressRing extends LitElement {
  static styles = unsafeCSS(styles);

  @query('.progress-ring__indicator') indicator: SVGCircleElement;

  /** The size of the progress ring in pixels. */
  @property({ type: Number }) size = 128;

  /** The stroke width of the progress ring in pixels. */
  @property({ attribute: 'stroke-width', type: Number }) strokeWidth = 4;

  /** The current progress percentage, 0 - 100. */
  @property({ type: Number, reflect: true }) percentage: number;

  firstUpdated() {
    this.updateProgress();
  }

  @watch('percentage')
  handlePercentageChange() {
    if (this.indicator) {
      this.updateProgress();
    }
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
          ></circle>

          <circle
            class="progress-ring__indicator"
            stroke-width="${this.strokeWidth}"
            stroke-linecap="round"
            fill="transparent"
            r=${this.size / 2 - this.strokeWidth * 2}
            cx=${this.size / 2}
            cy=${this.size / 2}
          ></circle>
        </svg>

        <span part="label" class="progress-ring__label">
          <slot></slot>
        </span>
      </div>
    `;
  }
}
