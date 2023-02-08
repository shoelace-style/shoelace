type SlLoadEvent = CustomEvent<null>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-load': SlLoadEvent;
  }
}

export default SlLoadEvent;
