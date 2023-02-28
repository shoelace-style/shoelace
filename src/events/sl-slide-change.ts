import type SlCarouselItem from '../components/carousel-item/carousel-item';

type SlSlideChange = CustomEvent<{ index: number; slide: SlCarouselItem }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-slide-change': SlSlideChange;
  }
}

export default SlSlideChange;
