type SlRepositionEvent = CustomEvent<Record<string, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-reposition': SlRepositionEvent;
  }
}

export default SlRepositionEvent;
