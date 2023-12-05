import { html } from 'lit';
import ShoelaceElement from '../../internal/shoelace-element.js';
import styles from './carousel-item.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * @summary A carousel item represent a slide within a [carousel](/components/carousel).
 *
 * @since 2.0
 * @status experimental
 * @pattern hide
 * @figma hide
 *
 * @slot - The carousel item's content..
 *
 * @cssproperty --aspect-ratio - The slide's aspect ratio. Inherited from the carousel by default.
 *
 */
export default class SlCarouselItem extends ShoelaceElement {
  static styles: CSSResultGroup = styles;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'group');
  }

  render() {
    return html` <slot></slot> `;
  }
}
