import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import ShoelaceElement from '../../internal/shoelace-element';
import styles from './carousel-item.styles';
import type { CSSResultGroup } from 'lit';

/**
 * @summary A carousel item represent a slide within a [carousel](/components/carousel).
 *
 * @since 2.0
 * @status experimental
 *
 * @slot - The carousel item's content..
 *
 * @cssproperty --aspect-ratio - The aspect ratio of the slide.
 *
 */
@customElement('sl-carousel-item')
export default class SlCarouselItem extends ShoelaceElement {
  static styles: CSSResultGroup = styles;

  static isCarouselItem(node: Node) {
    return node instanceof Element && node.getAttribute('aria-roledescription') === 'slide';
  }

  connectedCallback() {
    super.connectedCallback();

    this.setAttribute('role', 'listitem');
    this.setAttribute('aria-roledescription', 'slide');
  }

  render() {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-carousel-item': SlCarouselItem;
  }
}
