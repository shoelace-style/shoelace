import ShoelaceElement from '../../internal/shoelace-element';
import type { CSSResultGroup } from 'lit';
export default class SlIcon extends ShoelaceElement {
    static styles: CSSResultGroup;
    private svg;
    name?: string;
    src?: string;
    label: string;
    library: string;
    connectedCallback(): void;
    firstUpdated(): void;
    disconnectedCallback(): void;
    private getUrl;
    redraw(): void;
    setIcon(): Promise<void>;
    handleChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-icon': SlIcon;
    }
}
