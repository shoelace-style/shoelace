type SlHideEvent = CustomEvent<null>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-hide': SlHideEvent;
  }
}

export default SlHideEvent;
