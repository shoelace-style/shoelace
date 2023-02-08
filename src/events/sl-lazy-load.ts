type SlLazyLoadEvent = CustomEvent<Record<string, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-lazy-load': SlLazyLoadEvent;
  }
}

export default SlLazyLoadEvent;
