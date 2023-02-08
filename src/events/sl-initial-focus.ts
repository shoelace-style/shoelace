type SlInitialFocusEvent = CustomEvent<Record<string, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-initial-focus': SlInitialFocusEvent;
  }
}

export default SlInitialFocusEvent;
