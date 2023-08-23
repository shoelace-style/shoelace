export type SlAfterExpandEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-after-expand': SlAfterExpandEvent;
  }
}
