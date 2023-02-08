type SlRepositionEvent = CustomEvent<null>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-reposition': SlRepositionEvent;
  }
}

export default SlRepositionEvent;
