import ShoelaceElement from '../../internal/shoelace-element';
import '../popup/popup';
import type SlPopup from '../popup/popup';
import type { CSSResultGroup } from 'lit';
export default class SlTooltip extends ShoelaceElement {
    static styles: CSSResultGroup;
    defaultSlot: HTMLSlotElement;
    body: HTMLElement;
    popup: SlPopup;
    private hoverTimeout;
    private readonly localize;
    content: string;
    placement: 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end';
    disabled: boolean;
    distance: number;
    open: boolean;
    skidding: number;
    trigger: string;
    hoist: boolean;
    connectedCallback(): void;
    firstUpdated(): void;
    disconnectedCallback(): void;
    show(): Promise<void>;
    hide(): Promise<void>;
    getTarget(): HTMLElement;
    handleBlur(): void;
    handleClick(): void;
    handleFocus(): void;
    handleKeyDown(event: KeyboardEvent): void;
    handleMouseOver(): void;
    handleMouseOut(): void;
    handleOpenChange(): Promise<void>;
    handleOptionsChange(): Promise<void>;
    handleDisabledChange(): void;
    hasTrigger(triggerType: string): boolean;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-tooltip': SlTooltip;
    }
}
