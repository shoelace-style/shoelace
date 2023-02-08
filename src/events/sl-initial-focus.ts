type SlInitialFocusEvent = CustomEvent<null>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-initial-focus': SlInitialFocusEvent;
  }
}

export default SlInitialFocusEvent;
