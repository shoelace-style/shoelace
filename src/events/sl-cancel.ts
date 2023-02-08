type SlCancelEvent = CustomEvent<Record<string, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-cancel': SlCancelEvent;
  }
}

export default SlCancelEvent;
