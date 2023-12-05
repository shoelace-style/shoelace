import SlDrawer from './drawer.component.js';

export * from './drawer.component.js';
export default SlDrawer;

SlDrawer.define('sl-drawer');

declare global {
  interface HTMLElementTagNameMap {
    'sl-drawer': SlDrawer;
  }
}
