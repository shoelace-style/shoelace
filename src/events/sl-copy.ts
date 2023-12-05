export type SlCopyEvent = CustomEvent<{ value: string }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-copy': SlCopyEvent;
  }
}
