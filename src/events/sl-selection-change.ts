import type SlTreeItem from '../components/tree-item/tree-item';

export type SlSelectionChangeEvent = CustomEvent<{ selection: SlTreeItem[] }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-selection-change': SlSelectionChangeEvent;
  }
}
