export type SlCopyingEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-copying': SlCopyingEvent;
  }
}
