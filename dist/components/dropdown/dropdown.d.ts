import ShoelaceElement from '../../internal/shoelace-element';
import '../popup/popup';
import type SlMenu from '../menu/menu';
import type SlPopup from '../popup/popup';
import type { CSSResultGroup } from 'lit';
export default class SlDropdown extends ShoelaceElement {
    static styles: CSSResultGroup;
    popup: SlPopup;
    trigger: HTMLElement;
    panel: HTMLElement;
    private readonly localize;
    open: boolean;
    placement: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'right' | 'right-start' | 'right-end' | 'left' | 'left-start' | 'left-end';
    disabled: boolean;
    stayOpenOnSelect: boolean;
    containingElement?: HTMLElement;
    distance: number;
    skidding: number;
    hoist: boolean;
    connectedCallback(): void;
    firstUpdated(): void;
    disconnectedCallback(): void;
    focusOnTrigger(): void;
    getMenu(): SlMenu | undefined;
    handleDocumentKeyDown(event: KeyboardEvent): void;
    handleDocumentMouseDown(event: MouseEvent): void;
    handleMenuItemActivate(event: CustomEvent): void;
    handlePanelSelect(event: CustomEvent): void;
    handleTriggerClick(): void;
    handleTriggerKeyDown(event: KeyboardEvent): void;
    handleTriggerKeyUp(event: KeyboardEvent): void;
    handleTriggerSlotChange(): void;
    updateAccessibleTrigger(): void;
    show(): Promise<void>;
    hide(): Promise<void>;
    reposition(): void;
    addOpenListeners(): void;
    removeOpenListeners(): void;
    handleOpenChange(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-dropdown': SlDropdown;
    }
}
