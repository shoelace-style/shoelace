import ShoelaceElement from '../../internal/shoelace-element';
import type { CSSResultGroup } from 'lit';
export default class SlPopup extends ShoelaceElement {
    static styles: CSSResultGroup;
    popup: HTMLElement;
    private arrowEl;
    private anchorEl;
    private cleanup;
    anchor: Element | string;
    active: boolean;
    placement: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'right' | 'right-start' | 'right-end' | 'left' | 'left-start' | 'left-end';
    strategy: 'absolute' | 'fixed';
    distance: number;
    skidding: number;
    arrow: boolean;
    arrowPlacement: 'start' | 'end' | 'center' | 'anchor';
    arrowPadding: number;
    flip: boolean;
    flipFallbackPlacements: string;
    flipFallbackStrategy: 'best-fit' | 'initial';
    flipBoundary: Element | Element[];
    flipPadding: number;
    shift: boolean;
    shiftBoundary: Element | Element[];
    shiftPadding: number;
    autoSize: 'horizontal' | 'vertical' | 'both';
    sync: 'width' | 'height' | 'both';
    autoSizeBoundary: Element | Element[];
    autoSizePadding: number;
    connectedCallback(): Promise<void>;
    disconnectedCallback(): void;
    handleAnchorChange(): Promise<void>;
    private start;
    private stop;
    updated(changedProps: Map<string, unknown>): Promise<void>;
    reposition(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-popup': SlPopup;
    }
}
