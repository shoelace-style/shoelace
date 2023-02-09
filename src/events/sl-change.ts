type SlChangeEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-change': SlChangeEvent;
  }
}

export default SlChangeEvent;
