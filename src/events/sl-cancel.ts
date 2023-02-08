type SlCancelEvent = CustomEvent<null>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-cancel': SlCancelEvent;
  }
}

export default SlCancelEvent;
