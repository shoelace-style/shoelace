type SlClearEvent = CustomEvent<Record<string, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-clear': SlClearEvent;
  }
}

export default SlClearEvent;
