import ShoelaceElement from '../../internal/shoelace-element';
import '../button-group/button-group';
import '../button/button';
import '../dropdown/dropdown';
import '../icon/icon';
import '../input/input';
import '../visually-hidden/visually-hidden';
import type SlDropdown from '../dropdown/dropdown';
import type SlInput from '../input/input';
import type { CSSResultGroup } from 'lit';
export default class SlColorPicker extends ShoelaceElement {
    static styles: CSSResultGroup;
    input: SlInput;
    previewButton: HTMLButtonElement;
    dropdown: SlDropdown;
    private readonly formSubmitController;
    private isSafeValue;
    private lastValueEmitted;
    private readonly localize;
    private isDraggingGridHandle;
    private isEmpty;
    private inputValue;
    private hue;
    private saturation;
    private lightness;
    private brightness;
    private alpha;
    value: string;
    defaultValue: string;
    label: string;
    format: 'hex' | 'rgb' | 'hsl';
    inline: boolean;
    size: 'small' | 'medium' | 'large';
    noFormatToggle: boolean;
    name: string;
    disabled: boolean;
    invalid: boolean;
    hoist: boolean;
    opacity: boolean;
    uppercase: boolean;
    swatches: string[];
    connectedCallback(): void;
    getFormattedValue(format?: 'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla'): string;
    getBrightness(lightness: number): number;
    getLightness(brightness: number): number;
    reportValidity(): boolean | Promise<void>;
    setCustomValidity(message: string): void;
    handleCopy(): void;
    handleFormatToggle(): void;
    handleAlphaDrag(event: PointerEvent): void;
    handleHueDrag(event: PointerEvent): void;
    handleGridDrag(event: PointerEvent): void;
    handleAlphaKeyDown(event: KeyboardEvent): void;
    handleHueKeyDown(event: KeyboardEvent): void;
    handleGridKeyDown(event: KeyboardEvent): void;
    handleInputChange(event: CustomEvent): void;
    handleInputKeyDown(event: KeyboardEvent): void;
    normalizeColorString(colorString: string): string;
    parseColor(colorString: string): {
        hsl: {
            h: number;
            s: number;
            l: number;
            string: string;
        };
        hsla: {
            h: number;
            s: number;
            l: number;
            a: number;
            string: string;
        };
        rgb: {
            r: number;
            g: number;
            b: number;
            string: string;
        };
        rgba: {
            r: number;
            g: number;
            b: number;
            a: number;
            string: string;
        };
        hex: string;
        hexa: string;
    } | null;
    setColor(colorString: string): boolean;
    setLetterCase(string: string): string;
    syncValues(): Promise<void>;
    handleAfterHide(): void;
    handleEyeDropper(): void;
    handleFormatChange(): void;
    handleOpacityChange(): void;
    handleValueChange(oldValue: string | undefined, newValue: string): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-color-picker': SlColorPicker;
    }
}
