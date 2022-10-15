import ShoelaceElement from '../../internal/shoelace-element';
import type { CSSResultGroup } from 'lit';
export default class SlBreadcrumbItem extends ShoelaceElement {
    static styles: CSSResultGroup;
    private readonly hasSlotController;
    href?: string;
    target?: '_blank' | '_parent' | '_self' | '_top';
    rel: string;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-breadcrumb-item': SlBreadcrumbItem;
    }
}
