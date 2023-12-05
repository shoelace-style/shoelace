import SlMenuLabel from './menu-label.component.js';

export * from './menu-label.component.js';
export default SlMenuLabel;

SlMenuLabel.define('sl-menu-label');

declare global {
  interface HTMLElementTagNameMap {
    'sl-menu-label': SlMenuLabel;
  }
}
