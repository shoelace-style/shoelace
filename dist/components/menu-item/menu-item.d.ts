import ShoelaceElement from '../../internal/shoelace-element';
import '../icon/icon';
import type { CSSResultGroup } from 'lit';
export default class SlMenuItem extends ShoelaceElement {
    static styles: CSSResultGroup;
    private cachedTextLabel;
    defaultSlot: HTMLSlotElement;
    menuItem: HTMLElement;
    checked: boolean;
    value: string;
    disabled: boolean;
    firstUpdated(): void;
    getTextLabel(): string;
    handleCheckedChange(): void;
    handleDisabledChange(): void;
    handleDefaultSlotChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-menu-item': SlMenuItem;
    }
}
