import SlSpinner from './spinner.component.js';

export * from './spinner.component.js';
export default SlSpinner;

SlSpinner.define('sl-spinner');

declare global {
  interface HTMLElementTagNameMap {
    'sl-spinner': SlSpinner;
  }
}
