type SlExpandEvent = CustomEvent<Record<string, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-expand': SlExpandEvent;
  }
}

export default SlExpandEvent;
