import SlCheckbox from './checkbox.component.js';

export * from './checkbox.component.js';
export default SlCheckbox;

SlCheckbox.define('sl-checkbox');

declare global {
  interface HTMLElementTagNameMap {
    'sl-checkbox': SlCheckbox;
  }
}
