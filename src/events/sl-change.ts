type SlChangeEvent = CustomEvent<null>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-change': SlChangeEvent;
  }
}

export default SlChangeEvent;
