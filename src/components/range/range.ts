import SlRange from './range.component.js';

export * from './range.component.js';
export default SlRange;

SlRange.define('sl-range');

declare global {
  interface HTMLElementTagNameMap {
    'sl-range': SlRange;
  }
}
