type SlHideEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-hide': SlHideEvent;
  }
}

export default SlHideEvent;
