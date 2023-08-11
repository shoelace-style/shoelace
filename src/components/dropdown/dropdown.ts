import SlDropdown from './dropdown.component.js';

export * from './dropdown.component.js';
export default SlDropdown;

SlDropdown.define('sl-dropdown');

declare global {
  interface HTMLElementTagNameMap {
    'sl-dropdown': SlDropdown;
  }
}
