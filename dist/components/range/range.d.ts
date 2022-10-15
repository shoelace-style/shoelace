import ShoelaceElement from '../../internal/shoelace-element';
import type { CSSResultGroup } from 'lit';
export default class SlRange extends ShoelaceElement {
    static styles: CSSResultGroup;
    input: HTMLInputElement;
    output: HTMLOutputElement | null;
    private readonly formSubmitController;
    private readonly hasSlotController;
    private readonly localize;
    private resizeObserver;
    private hasFocus;
    private hasTooltip;
    name: string;
    value: number;
    label: string;
    helpText: string;
    disabled: boolean;
    invalid: boolean;
    min: number;
    max: number;
    step: number;
    tooltip: 'top' | 'bottom' | 'none';
    tooltipFormatter: (value: number) => string;
    defaultValue: number;
    connectedCallback(): void;
    disconnectedCallback(): void;
    focus(options?: FocusOptions): void;
    blur(): void;
    setCustomValidity(message: string): void;
    handleInput(): void;
    handleBlur(): void;
    handleValueChange(): void;
    handleDisabledChange(): void;
    handleFocus(): void;
    handleThumbDragStart(): void;
    handleThumbDragEnd(): void;
    syncRange(): void;
    syncProgress(percent: number): void;
    syncTooltip(percent: number): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-range': SlRange;
    }
}
