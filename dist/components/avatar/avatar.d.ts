import ShoelaceElement from '../../internal/shoelace-element';
import '../icon/icon';
import type { CSSResultGroup } from 'lit';
export default class SlAvatar extends ShoelaceElement {
    static styles: CSSResultGroup;
    private hasError;
    image: string;
    label: string;
    initials: string;
    shape: 'circle' | 'square' | 'rounded';
    handleImageChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-avatar': SlAvatar;
    }
}
