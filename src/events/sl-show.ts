type SlShowEvent = CustomEvent<null>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-show': SlShowEvent;
  }
}

export default SlShowEvent;
