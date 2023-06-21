import type SlTreeItem from '../components/tree-item/tree-item.js';

type SlSelectionChangeEvent = CustomEvent<{ selection: SlTreeItem[] }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-selection-change': SlSelectionChangeEvent;
  }
}

export default SlSelectionChangeEvent;
