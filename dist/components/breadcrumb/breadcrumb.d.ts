import ShoelaceElement from '../../internal/shoelace-element';
import '../icon/icon';
import type { CSSResultGroup } from 'lit';
export default class SlBreadcrumb extends ShoelaceElement {
    static styles: CSSResultGroup;
    defaultSlot: HTMLSlotElement;
    separatorSlot: HTMLSlotElement;
    private readonly localize;
    private separatorDir;
    label: string;
    private getSeparator;
    handleSlotChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-breadcrumb': SlBreadcrumb;
    }
}
