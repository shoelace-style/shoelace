export type SlErrorEvent = CustomEvent<{ status?: number }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-error': SlErrorEvent;
  }
}
