import ShoelaceElement from '../../internal/shoelace-element';
import '../checkbox/checkbox';
import '../icon/icon';
import '../spinner/spinner';
import type { CSSResultGroup, PropertyValueMap } from 'lit';
export declare function isTreeItem(element: Element): boolean;
export default class SlTreeItem extends ShoelaceElement {
    static styles: CSSResultGroup;
    private readonly localize;
    indeterminate: boolean;
    isLeaf: boolean;
    loading: boolean;
    selectable: boolean;
    expanded: boolean;
    selected: boolean;
    disabled: boolean;
    lazy: boolean;
    defaultSlot: HTMLSlotElement;
    childrenSlot: HTMLSlotElement;
    itemElement: HTMLDivElement;
    childrenContainer: HTMLDivElement;
    expandButtonSlot: HTMLSlotElement;
    connectedCallback(): void;
    firstUpdated(): void;
    handleLoadingChange(): void;
    handleDisabledChange(): void;
    handleSelectedChange(): void;
    handleExpandedChange(): void;
    handleExpandAnimation(): void;
    handleLazyChange(): void;
    private animateExpand;
    private animateCollapse;
    getChildrenItems({ includeDisabled }?: {
        includeDisabled?: boolean;
    }): SlTreeItem[];
    private isNestedItem;
    handleChildrenSlotChange(): void;
    protected willUpdate(changedProperties: PropertyValueMap<SlTreeItem> | Map<PropertyKey, unknown>): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-tree-item': SlTreeItem;
    }
}
