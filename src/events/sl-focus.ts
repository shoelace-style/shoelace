type SlFocusEvent = CustomEvent<null>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-focus': SlFocusEvent;
  }
}

export default SlFocusEvent;
