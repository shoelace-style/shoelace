import SlCarouselItem from './carousel-item.component.js';

export * from './carousel-item.component.js';
export default SlCarouselItem;

SlCarouselItem.define('sl-carousel-item');

declare global {
  interface HTMLElementTagNameMap {
    'sl-carousel-item': SlCarouselItem;
  }
}
