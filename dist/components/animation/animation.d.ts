import ShoelaceElement from '../../internal/shoelace-element';
import type { CSSResultGroup } from 'lit';
export default class SlAnimation extends ShoelaceElement {
    static styles: CSSResultGroup;
    private animation?;
    private hasStarted;
    defaultSlot: Promise<HTMLSlotElement>;
    name: string;
    play: boolean;
    delay: number;
    direction: PlaybackDirection;
    duration: number;
    easing: string;
    endDelay: number;
    fill: FillMode;
    iterations: number;
    iterationStart: number;
    keyframes?: Keyframe[];
    playbackRate: number;
    get currentTime(): number;
    set currentTime(time: number);
    connectedCallback(): void;
    disconnectedCallback(): void;
    handleAnimationChange(): void;
    handleAnimationFinish(): void;
    handleAnimationCancel(): void;
    handlePlayChange(): boolean;
    handlePlaybackRateChange(): void;
    handleSlotChange(): void;
    createAnimation(): Promise<boolean>;
    destroyAnimation(): void;
    cancel(): void;
    finish(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-animation': SlAnimation;
    }
}
