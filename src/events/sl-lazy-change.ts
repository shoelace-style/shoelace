type SlLazyChangeEvent = CustomEvent<Record<string, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-lazy-change': SlLazyChangeEvent;
  }
}

export default SlLazyChangeEvent;
