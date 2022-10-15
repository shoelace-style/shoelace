import ShoelaceElement from '../../internal/shoelace-element';
import type { CSSResultGroup } from 'lit';
export default class SlTextarea extends ShoelaceElement {
    static styles: CSSResultGroup;
    input: HTMLTextAreaElement;
    private readonly formSubmitController;
    private readonly hasSlotController;
    private resizeObserver;
    private hasFocus;
    size: 'small' | 'medium' | 'large';
    name: string;
    value: string;
    filled: boolean;
    label: string;
    helpText: string;
    placeholder: string;
    rows: number;
    resize: 'none' | 'vertical' | 'auto';
    disabled: boolean;
    readonly: boolean;
    minlength: number;
    maxlength: number;
    required: boolean;
    invalid: boolean;
    autocapitalize: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
    autocorrect: string;
    autocomplete: string;
    autofocus: boolean;
    enterkeyhint: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
    spellcheck: boolean;
    inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
    defaultValue: string;
    connectedCallback(): void;
    firstUpdated(): void;
    disconnectedCallback(): void;
    focus(options?: FocusOptions): void;
    blur(): void;
    select(): void;
    scrollPosition(position?: {
        top?: number;
        left?: number;
    }): {
        top: number;
        left: number;
    } | undefined;
    setSelectionRange(selectionStart: number, selectionEnd: number, selectionDirection?: 'forward' | 'backward' | 'none'): void;
    setRangeText(replacement: string, start: number, end: number, selectMode?: 'select' | 'start' | 'end' | 'preserve'): void;
    reportValidity(): boolean;
    setCustomValidity(message: string): void;
    handleBlur(): void;
    handleChange(): void;
    handleDisabledChange(): void;
    handleFocus(): void;
    handleInput(): void;
    handleRowsChange(): void;
    handleValueChange(): void;
    setTextareaHeight(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-textarea': SlTextarea;
    }
}
