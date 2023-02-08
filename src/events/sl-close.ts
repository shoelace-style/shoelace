type SlCloseEvent = CustomEvent<null>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-close': SlCloseEvent;
  }
}

export default SlCloseEvent;
