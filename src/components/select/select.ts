import SlSelect from './select.component.js';

export * from './select.component.js';
export default SlSelect;

SlSelect.define('sl-select');

declare global {
  interface HTMLElementTagNameMap {
    'sl-select': SlSelect;
  }
}
