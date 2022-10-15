import ShoelaceElement from '../../internal/shoelace-element';
import type { CSSResultGroup } from 'lit';
export default class SlTabPanel extends ShoelaceElement {
    static styles: CSSResultGroup;
    private readonly attrId;
    private readonly componentId;
    name: string;
    active: boolean;
    connectedCallback(): void;
    handleActiveChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-tab-panel': SlTabPanel;
    }
}
