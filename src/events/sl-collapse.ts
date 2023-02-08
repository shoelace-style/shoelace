type SlCollapseEvent = CustomEvent<Record<string, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-collapse': SlCollapseEvent;
  }
}

export default SlCollapseEvent;
