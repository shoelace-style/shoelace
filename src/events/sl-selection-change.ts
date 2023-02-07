import type SlTreeItem from '../components/tree-item/tree-item';

type SlSelectionChangeEvent = CustomEvent<{ selection: SlTreeItem[] }>;

export default SlSelectionChangeEvent;
