export type SlInitialFocusEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-initial-focus': SlInitialFocusEvent;
  }
}
