import ShoelaceElement from '../../internal/shoelace-element';
import type { CSSResultGroup } from 'lit';
export default class SlDivider extends ShoelaceElement {
    static styles: CSSResultGroup;
    vertical: boolean;
    connectedCallback(): void;
    handleVerticalChange(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-divider': SlDivider;
    }
}
