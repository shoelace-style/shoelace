type SlAfterHideEvent = CustomEvent<null>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-after-hide': SlAfterHideEvent;
  }
}

export default SlAfterHideEvent;
