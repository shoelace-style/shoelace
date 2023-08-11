import SlFormatBytes from './format-bytes.component.js';

export * from './format-bytes.component.js';
export default SlFormatBytes;

SlFormatBytes.define('sl-format-bytes');

declare global {
  interface HTMLElementTagNameMap {
    'sl-format-bytes': SlFormatBytes;
  }
}
