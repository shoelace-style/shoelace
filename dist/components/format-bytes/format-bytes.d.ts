import ShoelaceElement from '../../internal/shoelace-element';
export default class SlFormatBytes extends ShoelaceElement {
    private readonly localize;
    value: number;
    unit: 'byte' | 'bit';
    display: 'long' | 'short' | 'narrow';
    render(): string;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-format-bytes': SlFormatBytes;
    }
}
