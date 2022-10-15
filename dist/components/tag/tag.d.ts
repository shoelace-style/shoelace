import ShoelaceElement from '../../internal/shoelace-element';
import '../icon-button/icon-button';
import type { CSSResultGroup } from 'lit';
export default class SlTag extends ShoelaceElement {
    static styles: CSSResultGroup;
    private readonly localize;
    variant: 'primary' | 'success' | 'neutral' | 'warning' | 'danger' | 'text';
    size: 'small' | 'medium' | 'large';
    pill: boolean;
    removable: boolean;
    handleRemoveClick(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-tag': SlTag;
    }
}
