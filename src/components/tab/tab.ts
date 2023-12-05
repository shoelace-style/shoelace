import SlTab from './tab.component.js';

export * from './tab.component.js';
export default SlTab;

SlTab.define('sl-tab');

declare global {
  interface HTMLElementTagNameMap {
    'sl-tab': SlTab;
  }
}
