type SlFocusEvent = CustomEvent<Record<string, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-focus': SlFocusEvent;
  }
}

export default SlFocusEvent;
