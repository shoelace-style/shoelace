type SlExpandEvent = CustomEvent<null>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-expand': SlExpandEvent;
  }
}

export default SlExpandEvent;
