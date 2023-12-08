import type SlMenuItem from '../components/menu-item/menu-item.js';

export type SlSelectEvent = CustomEvent<{ item: SlMenuItem }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-select': SlSelectEvent;
  }
}
