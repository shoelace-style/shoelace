type SlStartEvent = CustomEvent<Record<string, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-start': SlStartEvent;
  }
}

export default SlStartEvent;
