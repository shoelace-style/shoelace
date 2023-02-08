type SlFinishEvent = CustomEvent<null>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-finish': SlFinishEvent;
  }
}

export default SlFinishEvent;
