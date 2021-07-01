import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { watch } from '../../internal/watch';
import styles from 'sass:./progress-ring.scss';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - A label to show inside the ring.
 *
 * @csspart base - The component's base wrapper.
 * @csspart label - The progress ring label.
 *
 * @cssproperty --track-color - The track color.
 * @cssproperty --indicator-color - The indicator color.
 */
@customElement('sl-progress-ring')
export default class SlProgressRing extends LitElement {
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

  @watch('percentage', { waitUntilFirstUpdate: true })
  updateProgress() {
    const radius = this.indicator.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (this.percentage / 100) * circumference;

    this.indicator.style.strokeDasharray = `${circumference} ${circumference}`;
    this.indicator.style.strokeDashoffset = `${offset}`;
  }

  render() {
    return html`
      <div
        part="base"
        class="progress-ring"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${this.percentage}"
      >
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

declare global {
  interface HTMLElementTagNameMap {
    'sl-progress-ring': SlProgressRing;
  }
}
