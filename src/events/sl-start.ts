type SlStartEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-start': SlStartEvent;
  }
}

export default SlStartEvent;
