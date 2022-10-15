import ShoelaceElement from '../../internal/shoelace-element';
import type { CSSResultGroup } from 'lit';
export default class SlButtonGroup extends ShoelaceElement {
    static styles: CSSResultGroup;
    defaultSlot: HTMLSlotElement;
    disableRole: boolean;
    label: string;
    handleFocus(event: CustomEvent): void;
    handleBlur(event: CustomEvent): void;
    handleMouseOver(event: CustomEvent): void;
    handleMouseOut(event: CustomEvent): void;
    handleSlotChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-button-group': SlButtonGroup;
    }
}
