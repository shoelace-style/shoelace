type SlStartEvent = CustomEvent<null>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-start': SlStartEvent;
  }
}

export default SlStartEvent;
