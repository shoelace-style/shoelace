import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import styles from './progress-bar.styles';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - A label to show inside the indicator.
 *
 * @csspart base - The component's base wrapper.
 * @csspart indicator - The progress bar indicator.
 * @csspart label - The progress bar label.
 *
 * @cssproperty --height - The progress bar's height.
 * @cssproperty --track-color - The track color.
 * @cssproperty --indicator-color - The indicator color.
 * @cssproperty --label-color - The label color.
 */
@customElement('sl-progress-bar')
export default class SlProgressBar extends LitElement {
  static styles = styles;

  /** The current progress, 0 to 100. */
  @property({ type: Number, reflect: true }) value = 0;

  /** When true, percentage is ignored, the label is hidden, and the progress bar is drawn in an indeterminate state. */
  @property({ type: Boolean, reflect: true }) indeterminate = false;

  /** The progress bar's aria label. */
  @property() label = 'Progress'; // TODO - i18n

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          'progress-bar': true,
          'progress-bar--indeterminate': this.indeterminate
        })}
        role="progressbar"
        title=${ifDefined(this.title)}
        aria-label=${ifDefined(this.label)}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${this.indeterminate ? 0 : this.value}
      >
        <div part="indicator" class="progress-bar__indicator" style=${styleMap({ width: this.value + '%' })}>
          ${!this.indeterminate
            ? html`
                <span part="label" class="progress-bar__label">
                  <slot>${this.label}</slot>
                </span>
              `
            : ''}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-progress-bar': SlProgressBar;
  }
}
