import SlMenu from './menu.component.js';

export * from './menu.component.js';
export default SlMenu;

SlMenu.define('sl-menu');

declare global {
  interface HTMLElementTagNameMap {
    'sl-menu': SlMenu;
  }
}
