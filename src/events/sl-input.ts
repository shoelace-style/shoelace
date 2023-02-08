type SlInputEvent = CustomEvent<Record<string, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-input': SlInputEvent;
  }
}

export default SlInputEvent;
