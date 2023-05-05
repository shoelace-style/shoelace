type SlLoadEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-load': SlLoadEvent;
  }
}

export default SlLoadEvent;
