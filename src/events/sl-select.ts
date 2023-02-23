import type SlMenuItem from '../components/menu-item/menu-item';

type SlSelectEvent = CustomEvent<{ item: SlMenuItem }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-select': SlSelectEvent;
  }
}

export default SlSelectEvent;
