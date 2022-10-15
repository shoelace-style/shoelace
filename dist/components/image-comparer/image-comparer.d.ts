import ShoelaceElement from '../../internal/shoelace-element';
import '../icon/icon';
import type { CSSResultGroup } from 'lit';
export default class SlImageComparer extends ShoelaceElement {
    static styles: CSSResultGroup;
    base: HTMLElement;
    handle: HTMLElement;
    private readonly localize;
    position: number;
    handleDrag(event: PointerEvent): void;
    handleKeyDown(event: KeyboardEvent): void;
    handlePositionChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-image-comparer': SlImageComparer;
    }
}
