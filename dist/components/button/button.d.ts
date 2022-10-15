import ShoelaceElement from '../../internal/shoelace-element';
import '../spinner/spinner';
import type { CSSResultGroup } from 'lit';
export default class SlButton extends ShoelaceElement {
    static styles: CSSResultGroup;
    button: HTMLButtonElement | HTMLLinkElement;
    private readonly formSubmitController;
    private readonly hasSlotController;
    private readonly localize;
    private hasFocus;
    variant: 'default' | 'primary' | 'success' | 'neutral' | 'warning' | 'danger' | 'text';
    size: 'small' | 'medium' | 'large';
    caret: boolean;
    disabled: boolean;
    loading: boolean;
    outline: boolean;
    pill: boolean;
    circle: boolean;
    type: 'button' | 'submit' | 'reset';
    name?: string;
    value?: string;
    href?: string;
    target?: '_blank' | '_parent' | '_self' | '_top';
    download?: string;
    form: string;
    formAction: string;
    formMethod: 'post' | 'get';
    formNoValidate: boolean;
    formTarget: '_self' | '_blank' | '_parent' | '_top' | string;
    click(): void;
    focus(options?: FocusOptions): void;
    blur(): void;
    handleBlur(): void;
    handleFocus(): void;
    handleClick(event: MouseEvent): void;
    render(): import("lit-html").TemplateResult<1 | 2>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-button': SlButton;
    }
}
