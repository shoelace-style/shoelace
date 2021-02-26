import { html, Shoemaker } from '@shoelace-style/shoemaker';
import styles from 'sass:./spinner.scss';

/**
 * @since 2.0
 * @status stable
 *
 * @part base - The component's base wrapper.
 */
export default class SlSpinner extends Shoemaker {
  static tag = 'sl-spinner';
  static styles = styles;

  render() {
    return html` <span part="base" class="spinner" aria-busy="true" aria-live="polite"></span> `;
  }
}
