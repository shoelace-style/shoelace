import { classMap, html, styleMap, Shoemaker } from '@shoelace-style/shoemaker';
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
export default class SlProgressBar extends Shoemaker {
  static tag = 'sl-progress-bar';
  static props = ['percentage', 'indeterminate'];
  static styles = styles;

  /** The progress bar's percentage, 0 to 100. */
  percentage = 0;

  /** When true, percentage is ignored, the label is hidden, and the progress bar is drawn in an indeterminate state. */
  indeterminate = false;

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
        aria-valuenow="${this.indeterminate ? null : this.percentage}"
      >
        <div part="indicator" class="progress-bar__indicator" style=${styleMap({ width: this.percentage + '%' })}>
          ${!this.indeterminate
            ? html`
                <span part="label" class="progress-bar__label">
                  <slot />
                </span>
              `
            : ''}
        </div>
      </div>
    `;
  }
}
