type SlRemoveEvent = CustomEvent<null>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-remove': SlRemoveEvent;
  }
}

export default SlRemoveEvent;
