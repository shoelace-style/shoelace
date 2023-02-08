type SlAfterShowEvent = CustomEvent<Record<string, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-after-show': SlAfterShowEvent;
  }
}

export default SlAfterShowEvent;
