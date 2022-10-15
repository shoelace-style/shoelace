import ShoelaceElement from '../../internal/shoelace-element';
import type { CSSResultGroup } from 'lit';
export default class SlSpinner extends ShoelaceElement {
    static styles: CSSResultGroup;
    private readonly localize;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-spinner': SlSpinner;
    }
}
