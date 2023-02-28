type SlFinishEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-finish': SlFinishEvent;
  }
}

export default SlFinishEvent;
