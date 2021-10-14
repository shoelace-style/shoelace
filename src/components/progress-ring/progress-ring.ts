import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import styles from './progress-ring.styles';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - A label to show inside the ring.
 *
 * @csspart base - The component's base wrapper.
 * @csspart label - The progress ring label.
 *
 * @cssproperty --size - The diameter of the progress ring (cannot be a percentage).
 * @cssproperty --track-width - The width of the track.
 * @cssproperty --track-color - The color of the track.
 * @cssproperty --indicator-color - The indicator color.
 */
@customElement('sl-progress-ring')
export default class SlProgressRing extends LitElement {
  static styles = styles;

  @query('.progress-ring__indicator') indicator: SVGCircleElement;

  @state() indicatorOffset: string;

  /** The current progress, 0 to 100. */
  @property({ type: Number, reflect: true }) value = 0;

  /** The progress ring's aria label. */
  @property() label = 'Progress'; // TODO - i18n

  updated(changedProps: Map<string, any>) {
    super.updated(changedProps);

    //
    // This block is only required for Safari because it doesn't transition the circle when the custom properties
    // change, possibly because of a mix of pixel + unitless values in the calc() function. It seems like a Safari bug,
    // but I couldn't pinpoint it so this works around the problem.
    //
    if (changedProps.has('percentage')) {
      const radius = parseFloat(getComputedStyle(this.indicator).getPropertyValue('r'));
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (this.value / 100) * circumference;

      this.indicatorOffset = String(offset) + 'px';
    }
  }

  render() {
    return html`
      <div
        part="base"
        class="progress-ring"
        role="progressbar"
        aria-label=${ifDefined(this.label)}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${this.value}"
        style="--percentage: ${this.value / 100}"
      >
        <svg class="progress-ring__image">
          <circle class="progress-ring__track"></circle>
          <circle class="progress-ring__indicator" style="stroke-dashoffset: ${this.indicatorOffset}"></circle>
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
