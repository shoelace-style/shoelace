type SlAfterExpandEvent = CustomEvent<null>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-after-expand': SlAfterExpandEvent;
  }
}

export default SlAfterExpandEvent;
