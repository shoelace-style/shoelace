import SlSearchSelect from './search-select.component.js';

export * from './search-select.component.js';
export default SlSearchSelect;

SlSearchSelect.define('sl-search-select');

declare global {
  interface HTMLElementTagNameMap {
    'sl-search-select': SlSearchSelect;
  }
}
