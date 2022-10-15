import ShoelaceElement from '../../internal/shoelace-element';
import type { CSSResultGroup } from 'lit';
export default class SlSplitPanel extends ShoelaceElement {
    static styles: CSSResultGroup;
    private cachedPositionInPixels;
    private readonly localize;
    private resizeObserver;
    private size;
    divider: HTMLElement;
    position: number;
    positionInPixels: number;
    vertical: boolean;
    disabled: boolean;
    primary?: 'start' | 'end';
    snap?: string;
    snapThreshold: number;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private detectSize;
    private percentageToPixels;
    private pixelsToPercentage;
    handleDrag(event: PointerEvent): void;
    handleKeyDown(event: KeyboardEvent): void;
    handlePositionChange(): void;
    handlePositionInPixelsChange(): void;
    handleVerticalChange(): void;
    handleResize(entries: ResizeObserverEntry[]): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-split-panel': SlSplitPanel;
    }
}
