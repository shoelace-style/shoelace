import ShoelaceElement from '../../internal/shoelace-element';
import type { CSSResultGroup } from 'lit';
export default class SlSkeleton extends ShoelaceElement {
    static styles: CSSResultGroup;
    effect: 'pulse' | 'sheen' | 'none';
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-skeleton': SlSkeleton;
    }
}
