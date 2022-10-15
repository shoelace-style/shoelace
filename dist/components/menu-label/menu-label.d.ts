import ShoelaceElement from '../../internal/shoelace-element';
import type { CSSResultGroup } from 'lit';
export default class SlMenuLabel extends ShoelaceElement {
    static styles: CSSResultGroup;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-menu-label': SlMenuLabel;
    }
}
