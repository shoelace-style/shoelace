import { LitElement, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from 'sass:./menu-divider.scss';

/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-menu
 *
 * @csspart base - The component's base wrapper.
 */
@customElement('sl-menu-divider')
export default class SlMenuDivider extends LitElement {
  static styles = unsafeCSS(styles);

  render() {
    return html` <div part="base" class="menu-divider" role="separator" aria-hidden="true"></div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-menu-divider': SlMenuDivider;
  }
}
