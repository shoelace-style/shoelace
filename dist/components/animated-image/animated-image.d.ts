import ShoelaceElement from '../../internal/shoelace-element';
import '../icon/icon';
import type { CSSResultGroup } from 'lit';
export default class SlAnimatedImage extends ShoelaceElement {
    static styles: CSSResultGroup;
    frozenFrame: string;
    isLoaded: boolean;
    animatedImage: HTMLImageElement;
    src: string;
    alt: string;
    play: boolean;
    handleClick(): void;
    handleLoad(): void;
    handleError(): void;
    handlePlayChange(): void;
    handleSrcChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-animated-image': SlAnimatedImage;
    }
}
