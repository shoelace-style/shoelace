import ShoelaceElement from '../../internal/shoelace-element';
import '../icon-button/icon-button';
import type { CSSResultGroup } from 'lit';
export default class SlTab extends ShoelaceElement {
    static styles: CSSResultGroup;
    private readonly localize;
    tab: HTMLElement;
    private readonly attrId;
    private readonly componentId;
    panel: string;
    active: boolean;
    closable: boolean;
    disabled: boolean;
    connectedCallback(): void;
    focus(options?: FocusOptions): void;
    blur(): void;
    handleCloseClick(): void;
    handleActiveChange(): void;
    handleDisabledChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-tab': SlTab;
    }
}
