import { LitElement, html, unsafeCSS } from 'lit-element';
import { tag } from '../../internal/decorators';
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
@tag('sl-menu-label')
export default class SlMenuLabel extends LitElement {
  static styles = unsafeCSS(styles);

  render() {
    return html`
      <div part="base" class="menu-label">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-menu-label': SlMenuLabel;
  }
}
