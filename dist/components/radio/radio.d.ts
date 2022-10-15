import ShoelaceElement from '../../internal/shoelace-element';
import type { CSSResultGroup } from 'lit';
export default class SlRadio extends ShoelaceElement {
    static styles: CSSResultGroup;
    checked: boolean;
    protected hasFocus: boolean;
    value: string;
    disabled: boolean;
    connectedCallback(): void;
    handleCheckedChange(): void;
    handleDisabledChange(): void;
    private handleBlur;
    private handleClick;
    private handleFocus;
    private addEventListeners;
    private setInitialAttributes;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-radio': SlRadio;
    }
}
