type SlCloseEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-close': SlCloseEvent;
  }
}

export default SlCloseEvent;
