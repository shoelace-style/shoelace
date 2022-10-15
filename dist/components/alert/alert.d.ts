import ShoelaceElement from '../../internal/shoelace-element';
import '../icon-button/icon-button';
import type { CSSResultGroup } from 'lit';
export default class SlAlert extends ShoelaceElement {
    static styles: CSSResultGroup;
    private autoHideTimeout;
    private readonly hasSlotController;
    private readonly localize;
    base: HTMLElement;
    open: boolean;
    closable: boolean;
    variant: 'primary' | 'success' | 'neutral' | 'warning' | 'danger';
    duration: number;
    firstUpdated(): void;
    show(): Promise<void>;
    hide(): Promise<void>;
    toast(): Promise<void>;
    restartAutoHide(): void;
    handleCloseClick(): void;
    handleMouseMove(): void;
    handleOpenChange(): Promise<void>;
    handleDurationChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-alert': SlAlert;
    }
}
