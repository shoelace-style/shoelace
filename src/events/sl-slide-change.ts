import type SlCarouselItem from '../components/carousel-item/carousel-item.js';

type SlSlideChange = CustomEvent<{ index: number; slide: SlCarouselItem }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-slide-change': SlSlideChange;
  }
}

export default SlSlideChange;
