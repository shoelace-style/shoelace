type SlResizeEvent = CustomEvent<{ entries: ResizeObserverEntry[] }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-resize': SlResizeEvent;
  }
}

export default SlResizeEvent;
