import SlFormatNumber from './format-number.component.js';

export * from './format-number.component.js';
export default SlFormatNumber;

SlFormatNumber.define('sl-format-number');

declare global {
  interface HTMLElementTagNameMap {
    'sl-format-number': SlFormatNumber;
  }
}
