import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators';
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';
import styles from 'sass:./progress-bar.scss';

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
@customElement('sl-progress-bar')
export default class SlProgressBar extends LitElement {
  static styles = unsafeCSS(styles);

  /** The progress bar's percentage, 0 to 100. */
  @property({ type: Number, reflect: true }) percentage = 0;

  /** When true, percentage is ignored, the label is hidden, and the progress bar is drawn in an indeterminate state. */
  @property({ type: Boolean, reflect: true }) indeterminate = false;

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          'progress-bar': true,
          'progress-bar--indeterminate': this.indeterminate
        })}
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${this.indeterminate ? '' : this.percentage}"
      >
        <div part="indicator" class="progress-bar__indicator" style=${styleMap({ width: this.percentage + '%' })}>
          ${!this.indeterminate
            ? html`
                <span part="label" class="progress-bar__label">
                  <slot></slot>
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
