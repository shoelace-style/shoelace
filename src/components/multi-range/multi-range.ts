import SlMultiRange from './multi-range.component.js';

export * from './multi-range.component.js';
export default SlMultiRange;

SlMultiRange.define('sl-multi-range');

declare global {
  interface HTMLElementTagNameMap {
    'sl-multi-range': SlMultiRange;
  }
}
