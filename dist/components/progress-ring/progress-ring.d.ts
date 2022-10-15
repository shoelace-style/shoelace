import ShoelaceElement from '../../internal/shoelace-element';
import type { CSSResultGroup } from 'lit';
export default class SlProgressRing extends ShoelaceElement {
    static styles: CSSResultGroup;
    private readonly localize;
    indicator: SVGCircleElement;
    indicatorOffset: string;
    value: number;
    label: string;
    updated(changedProps: Map<string, unknown>): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-progress-ring': SlProgressRing;
    }
}
