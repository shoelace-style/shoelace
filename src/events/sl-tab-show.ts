type SlTabShowEvent = CustomEvent<{ name: string }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-tab-show': SlTabShowEvent;
  }
}

export default SlTabShowEvent;
