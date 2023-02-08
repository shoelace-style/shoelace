type SlClearEvent = CustomEvent<null>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-clear': SlClearEvent;
  }
}

export default SlClearEvent;
