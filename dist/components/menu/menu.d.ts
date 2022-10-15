import ShoelaceElement from '../../internal/shoelace-element';
import type SlMenuItem from '../menu-item/menu-item';
import type { CSSResultGroup } from 'lit';
export interface MenuSelectEventDetail {
    item: SlMenuItem;
}
export default class SlMenu extends ShoelaceElement {
    static styles: CSSResultGroup;
    defaultSlot: HTMLSlotElement;
    private typeToSelectString;
    private typeToSelectTimeout;
    connectedCallback(): void;
    getAllItems(options?: {
        includeDisabled: boolean;
    }): SlMenuItem[];
    getCurrentItem(): SlMenuItem | undefined;
    setCurrentItem(item: SlMenuItem): void;
    typeToSelect(event: KeyboardEvent): void;
    handleClick(event: MouseEvent): void;
    handleKeyDown(event: KeyboardEvent): void;
    handleMouseDown(event: MouseEvent): void;
    handleSlotChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-menu': SlMenu;
    }
}
