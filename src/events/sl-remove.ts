type SlRemoveEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-remove': SlRemoveEvent;
  }
}

export default SlRemoveEvent;
