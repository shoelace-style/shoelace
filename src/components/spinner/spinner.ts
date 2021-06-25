import { LitElement, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from 'sass:./spinner.scss';

/**
 * @since 2.0
 * @status stable
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --track-color - The color of the spinner's track.
 * @cssproperty --indicator-color - The color of the spinner's indicator.
 * @cssproperty --stroke-width - The width of the indicator.
 */
@customElement('sl-spinner')
export default class SlSpinner extends LitElement {
  static styles = unsafeCSS(styles);

  render() {
    return html` <span part="base" class="spinner" aria-busy="true" aria-live="polite"></span> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-spinner': SlSpinner;
  }
}
