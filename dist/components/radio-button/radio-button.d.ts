import ShoelaceElement from '../../internal/shoelace-element';
import type { CSSResultGroup } from 'lit';
export default class SlRadioButton extends ShoelaceElement {
    static styles: CSSResultGroup;
    input: HTMLInputElement;
    hiddenInput: HTMLInputElement;
    private readonly hasSlotController;
    protected hasFocus: boolean;
    checked: boolean;
    value: string;
    disabled: boolean;
    size: 'small' | 'medium' | 'large';
    pill: boolean;
    connectedCallback(): void;
    handleDisabledChange(): void;
    handleBlur(): void;
    handleClick(e: MouseEvent): void;
    handleFocus(): void;
    render(): import("lit-html").TemplateResult<1 | 2>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-radio-button': SlRadioButton;
    }
}
