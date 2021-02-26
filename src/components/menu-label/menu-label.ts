import { html, Shoemaker } from '@shoelace-style/shoemaker';
import styles from 'sass:./menu-label.scss';

/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-menu
 *
 * @slot - The menu label's content.
 *
 * @part base - The component's base wrapper.
 */
export default class SlMenuLabel extends Shoemaker {
  static tag = 'sl-menu-label';
  static styles = styles;

  render() {
    return html`
      <div part="base" class="menu-label">
        <slot />
      </div>
    `;
  }
}
