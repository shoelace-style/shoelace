import ShoelaceElement from '../../internal/shoelace-element';
import '../icon-button/icon-button';
import type { CSSResultGroup } from 'lit';
export default class SlDialog extends ShoelaceElement {
    static styles: CSSResultGroup;
    dialog: HTMLElement;
    panel: HTMLElement;
    overlay: HTMLElement;
    private readonly hasSlotController;
    private readonly localize;
    private modal;
    private originalTrigger;
    open: boolean;
    label: string;
    noHeader: boolean;
    connectedCallback(): void;
    firstUpdated(): void;
    disconnectedCallback(): void;
    show(): Promise<void>;
    hide(): Promise<void>;
    private requestClose;
    handleKeyDown(event: KeyboardEvent): void;
    handleOpenChange(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-dialog': SlDialog;
    }
}
