import { html, Shoemaker } from '@shoelace-style/shoemaker';
import styles from 'sass:./menu-divider.scss';

/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-menu
 *
 * @part base - The component's base wrapper.
 */
export default class SlMenuDivider extends Shoemaker {
  static tag = 'sl-menu-divider';
  static styles = styles;

  render() {
    return html` <div part="base" class="menu-divider" role="separator" aria-hidden="true" /> `;
  }
}
