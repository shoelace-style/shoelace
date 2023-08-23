export type SlTabHideEvent = CustomEvent<{ name: string }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-tab-hide': SlTabHideEvent;
  }
}
