import SlBreadcrumb from './breadcrumb.component.js';

export * from './breadcrumb.component.js';
export default SlBreadcrumb;

SlBreadcrumb.define('sl-breadcrumb');

declare global {
  interface HTMLElementTagNameMap {
    'sl-breadcrumb': SlBreadcrumb;
  }
}
