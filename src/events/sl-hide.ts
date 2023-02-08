type SlHideEvent = CustomEvent<Record<string, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-hide': SlHideEvent;
  }
}

export default SlHideEvent;
