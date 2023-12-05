import SlImageComparer from './image-comparer.component.js';

export * from './image-comparer.component.js';
export default SlImageComparer;

SlImageComparer.define('sl-image-comparer');

declare global {
  interface HTMLElementTagNameMap {
    'sl-image-comparer': SlImageComparer;
  }
}
