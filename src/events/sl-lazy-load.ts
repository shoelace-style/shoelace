export type SlLazyLoadEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-lazy-load': SlLazyLoadEvent;
  }
}
