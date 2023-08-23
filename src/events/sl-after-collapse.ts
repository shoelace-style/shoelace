export type SlAfterCollapseEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-after-collapse': SlAfterCollapseEvent;
  }
}
