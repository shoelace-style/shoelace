import ShoelaceElement from '../../internal/shoelace-element';
export default class SlRelativeTime extends ShoelaceElement {
    private readonly localize;
    private updateTimeout;
    private isoTime;
    private relativeTime;
    private titleTime;
    date: Date | string;
    format: 'long' | 'short' | 'narrow';
    numeric: 'always' | 'auto';
    sync: boolean;
    disconnectedCallback(): void;
    render(): "" | import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-relative-time': SlRelativeTime;
    }
}
