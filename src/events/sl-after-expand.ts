type SlAfterExpandEvent = CustomEvent<Record<string, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-after-expand': SlAfterExpandEvent;
  }
}

export default SlAfterExpandEvent;
