import SlBreadcrumbItem from './breadcrumb-item.component.js';

export * from './breadcrumb-item.component.js';
export default SlBreadcrumbItem;

SlBreadcrumbItem.define('sl-breadcrumb-item');

declare global {
  interface HTMLElementTagNameMap {
    'sl-breadcrumb-item': SlBreadcrumbItem;
  }
}
