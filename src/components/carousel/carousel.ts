import SlCarousel from './carousel.component.js';

export * from './carousel.component.js';
export default SlCarousel;

SlCarousel.define('sl-carousel');

declare global {
  interface HTMLElementTagNameMap {
    'sl-carousel': SlCarousel;
  }
}
