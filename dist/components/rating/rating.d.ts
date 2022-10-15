import ShoelaceElement from '../../internal/shoelace-element';
import '../icon/icon';
import type { CSSResultGroup } from 'lit';
export default class SlRating extends ShoelaceElement {
    static styles: CSSResultGroup;
    rating: HTMLElement;
    private readonly localize;
    private hoverValue;
    private isHovering;
    label: string;
    value: number;
    max: number;
    precision: number;
    readonly: boolean;
    disabled: boolean;
    getSymbol: (value: number) => string;
    focus(options?: FocusOptions): void;
    blur(): void;
    getValueFromMousePosition(event: MouseEvent): number;
    getValueFromTouchPosition(event: TouchEvent): number;
    getValueFromXCoordinate(coordinate: number): number;
    handleClick(event: MouseEvent): void;
    setValue(newValue: number): void;
    handleKeyDown(event: KeyboardEvent): void;
    handleMouseEnter(): void;
    handleMouseMove(event: MouseEvent): void;
    handleMouseLeave(): void;
    handleTouchStart(event: TouchEvent): void;
    handleTouchMove(event: TouchEvent): void;
    handleTouchEnd(event: TouchEvent): void;
    handleValueChange(): void;
    roundToPrecision(numberToRound: number, precision?: number): number;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-rating': SlRating;
    }
}
