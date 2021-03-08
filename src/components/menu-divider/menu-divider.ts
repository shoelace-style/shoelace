import { LitElement, html, unsafeCSS } from 'lit-element';
import { tag } from '../../internal/decorators';
import styles from 'sass:./menu-divider.scss';

/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-menu
 *
 * @part base - The component's base wrapper.
 */
@tag('sl-menu-divider')
export class SlMenuDivider extends LitElement {
  static styles = unsafeCSS(styles);

  render() {
    return html` <div part="base" class="menu-divider" role="separator" aria-hidden="true"></div> `;
  }
}
