type SlCollapseEvent = CustomEvent<null>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-collapse': SlCollapseEvent;
  }
}

export default SlCollapseEvent;
