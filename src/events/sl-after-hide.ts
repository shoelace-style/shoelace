type SlAfterHideEvent = CustomEvent<Record<string, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-after-hide': SlAfterHideEvent;
  }
}

export default SlAfterHideEvent;
