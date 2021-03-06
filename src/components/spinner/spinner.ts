import { LitElement, customElement, html, unsafeCSS } from 'lit-element';
import styles from 'sass:./spinner.scss';

/**
 * @since 2.0
 * @status stable
 *
 * @part base - The component's base wrapper.
 */
@customElement('sl-spinner')
export class SlSpinner extends LitElement {
  static styles = unsafeCSS(styles);

  render() {
    return html` <span part="base" class="spinner" aria-busy="true" aria-live="polite"></span> `;
  }
}
