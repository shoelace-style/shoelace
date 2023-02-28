import type SlTreeItem from '../components/tree-item/tree-item';

type SlSelectionChangeEvent = CustomEvent<{ selection: SlTreeItem[] }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-selection-change': SlSelectionChangeEvent;
  }
}

export default SlSelectionChangeEvent;
