type SlInputEvent = CustomEvent<null>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-input': SlInputEvent;
  }
}

export default SlInputEvent;
