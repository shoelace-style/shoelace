import ShoelaceElement from '../../internal/shoelace-element';
import '../icon/icon';
import type { CSSResultGroup } from 'lit';
export default class SlIconButton extends ShoelaceElement {
    static styles: CSSResultGroup;
    private hasFocus;
    button: HTMLButtonElement | HTMLLinkElement;
    name?: string;
    library?: string;
    src?: string;
    href?: string;
    target?: '_blank' | '_parent' | '_self' | '_top';
    download?: string;
    label: string;
    disabled: boolean;
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
        'sl-icon-button': SlIconButton;
    }
}
