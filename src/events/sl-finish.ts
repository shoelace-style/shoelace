type SlFinishEvent = CustomEvent<Record<string, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-finish': SlFinishEvent;
  }
}

export default SlFinishEvent;
