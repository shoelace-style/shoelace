export type SlRequestCloseEvent = CustomEvent<{ source: 'close-button' | 'keyboard' | 'overlay' }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-request-close': SlRequestCloseEvent;
  }
}
