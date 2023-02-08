type SlAfterShowEvent = CustomEvent<null>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-after-show': SlAfterShowEvent;
  }
}

export default SlAfterShowEvent;
