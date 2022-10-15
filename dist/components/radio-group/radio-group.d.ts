import { FormSubmitController } from '../../internal/form';
import ShoelaceElement from '../../internal/shoelace-element';
import '../button-group/button-group';
import type { CSSResultGroup } from 'lit';
export default class SlRadioGroup extends ShoelaceElement {
    static styles: CSSResultGroup;
    protected readonly formSubmitController: FormSubmitController;
    defaultSlot: HTMLSlotElement;
    input: HTMLInputElement;
    private hasButtonGroup;
    private errorMessage;
    private customErrorMessage;
    private defaultValue;
    label: string;
    value: string;
    name: string;
    invalid: boolean;
    fieldset: boolean;
    required: boolean;
    handleValueChange(): void;
    connectedCallback(): void;
    setCustomValidity(message?: string): void;
    get validity(): ValidityState;
    reportValidity(): boolean;
    private getAllRadios;
    private handleRadioClick;
    private handleKeyDown;
    private handleSlotChange;
    private showNativeErrorMessage;
    private updateCheckedRadio;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-radio-group': SlRadioGroup;
    }
}
