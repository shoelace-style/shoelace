import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './spinner.styles';

/**
 * @since 2.0
 * @status stable
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --track-width - The width of the track.
 * @cssproperty --track-color - The color of the track.
 * @cssproperty --indicator-color - The color of the indicator.
 * @cssproperty --speed - The time it takes for the spinner to complete one animation cycle.
 */
@customElement('sl-spinner')
export default class SlSpinner extends LitElement {
  static styles = styles;

  render() {
    return html`
      <svg part="base" class="spinner" role="status">
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-spinner': SlSpinner;
  }
}
