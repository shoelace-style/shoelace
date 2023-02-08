type SlAfterCollapseEvent = CustomEvent<null>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-after-collapse': SlAfterCollapseEvent;
  }
}

export default SlAfterCollapseEvent;
