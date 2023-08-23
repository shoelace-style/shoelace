import type SlCarouselItem from '../components/carousel-item/carousel-item';

export type SlSlideChangeEvent = CustomEvent<{ index: number; slide: SlCarouselItem }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-slide-change': SlSlideChangeEvent;
  }
}
