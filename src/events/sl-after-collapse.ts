type SlAfterCollapseEvent = CustomEvent<Record<string, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-after-collapse': SlAfterCollapseEvent;
  }
}

export default SlAfterCollapseEvent;
