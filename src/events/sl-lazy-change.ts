export type SlLazyChangeEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-lazy-change': SlLazyChangeEvent;
  }
}
