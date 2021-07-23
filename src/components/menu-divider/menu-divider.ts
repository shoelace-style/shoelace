import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './menu-divider.styles';

/**
 * @since 2.0
 * @status stable
 *
 * @csspart base - The component's base wrapper.
 */
@customElement('sl-menu-divider')
export default class SlMenuDivider extends LitElement {
  static styles = styles;

  render() {
    return html` <div part="base" class="menu-divider" role="separator" aria-hidden="true"></div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-menu-divider': SlMenuDivider;
  }
}
