import SlMenuItem from './menu-item.component.js';

export * from './menu-item.component.js';
export default SlMenuItem;

SlMenuItem.define('sl-menu-item');

declare global {
  interface HTMLElementTagNameMap {
    'sl-menu-item': SlMenuItem;
  }
}
