export type SlAfterShowEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-after-show': SlAfterShowEvent;
  }
}
