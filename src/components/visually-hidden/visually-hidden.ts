import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './visually-hidden.styles';

/**
 * @since 2.0
 * @status experimental
 *
 * @slot - The content you'd like to be visually hidden.
 */
@customElement('sl-visually-hidden')
export default class SlVisuallyHidden extends LitElement {
  static styles = styles;

  render() {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-visually-hidden': SlVisuallyHidden;
  }
}
