export interface ElementAnimation {
    keyframes: Keyframe[];
    rtlKeyframes?: Keyframe[];
    options?: KeyframeAnimationOptions;
}
export interface ElementAnimationMap {
    [animationName: string]: ElementAnimation;
}
export interface GetAnimationOptions {
    dir: string;
}
export declare function setDefaultAnimation(animationName: string, animation: ElementAnimation | null): void;
export declare function setAnimation(el: Element, animationName: string, animation: ElementAnimation | null): void;
export declare function getAnimation(el: Element, animationName: string, options: GetAnimationOptions): ElementAnimation;
