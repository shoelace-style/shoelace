type SlLoadEvent = CustomEvent<Record<string, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-load': SlLoadEvent;
  }
}

export default SlLoadEvent;
