import ShoelaceElement from '../../internal/shoelace-element';
import type { CSSResultGroup } from 'lit';
export default class SlCard extends ShoelaceElement {
    static styles: CSSResultGroup;
    private readonly hasSlotController;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-card': SlCard;
    }
}
