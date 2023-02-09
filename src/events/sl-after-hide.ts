type SlAfterHideEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-after-hide': SlAfterHideEvent;
  }
}

export default SlAfterHideEvent;
