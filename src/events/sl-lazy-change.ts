type SlLazyChangeEvent = CustomEvent<null>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-lazy-change': SlLazyChangeEvent;
  }
}

export default SlLazyChangeEvent;
