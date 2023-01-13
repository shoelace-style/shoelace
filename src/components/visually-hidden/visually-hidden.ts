import { customElement } from 'lit/decorators.js';
import { html } from 'lit';
import ShoelaceElement from '../../internal/shoelace-element';
import styles from './visually-hidden.styles';
import type { CSSResultGroup } from 'lit';

/**
 * @summary The visually hidden utility makes content accessible to assistive devices without displaying it on the screen.
 * @documentation https://shoelace.style/components/visually-hidden
 * @status stable
 * @since 2.0
 *
 * @slot - The content to be visually hidden.
 */
@customElement('sl-visually-hidden')
export default class SlVisuallyHidden extends ShoelaceElement {
  static styles: CSSResultGroup = styles;

  render() {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-visually-hidden': SlVisuallyHidden;
  }
}
