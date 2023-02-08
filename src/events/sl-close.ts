type SlCloseEvent = CustomEvent<Record<string, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-close': SlCloseEvent;
  }
}

export default SlCloseEvent;
