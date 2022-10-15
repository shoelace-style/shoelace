import ShoelaceElement from '../../internal/shoelace-element';
import type { CSSResultGroup } from 'lit';
export default class SlSwitch extends ShoelaceElement {
    static styles: CSSResultGroup;
    input: HTMLInputElement;
    private readonly formSubmitController;
    private hasFocus;
    name: string;
    value: string;
    disabled: boolean;
    required: boolean;
    checked: boolean;
    invalid: boolean;
    defaultChecked: boolean;
    firstUpdated(): void;
    click(): void;
    focus(options?: FocusOptions): void;
    blur(): void;
    reportValidity(): boolean;
    setCustomValidity(message: string): void;
    handleBlur(): void;
    handleCheckedChange(): void;
    handleClick(): void;
    handleDisabledChange(): void;
    handleFocus(): void;
    handleKeyDown(event: KeyboardEvent): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-switch': SlSwitch;
    }
}
