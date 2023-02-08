type SlShowEvent = CustomEvent<Record<string, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-show': SlShowEvent;
  }
}

export default SlShowEvent;
