import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import ShoelaceElement from '../../internal/shoelace-element';
import styles from './visually-hidden.styles';
import type { CSSResultGroup } from 'lit';

/**
 * @summary The visually hidden utility makes content accessible to assistive devices without displaying it on the screen.
 *
 * @since 2.0
 * @status stable
 *
 * @slot - The content you'd like to be visually hidden.
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
