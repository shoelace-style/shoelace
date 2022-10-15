import ShoelaceElement from '../../internal/shoelace-element';
import type { CSSResultGroup } from 'lit';
export default class SlProgressBar extends ShoelaceElement {
    static styles: CSSResultGroup;
    private readonly localize;
    value: number;
    indeterminate: boolean;
    label: string;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-progress-bar': SlProgressBar;
    }
}
