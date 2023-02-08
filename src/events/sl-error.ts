type SlErrorEvent = CustomEvent<null | { status: number }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-error': SlErrorEvent;
  }
}

export default SlErrorEvent;
