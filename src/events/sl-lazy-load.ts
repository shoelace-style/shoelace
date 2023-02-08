type SlLazyLoadEvent = CustomEvent<null>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-lazy-load': SlLazyLoadEvent;
  }
}

export default SlLazyLoadEvent;
