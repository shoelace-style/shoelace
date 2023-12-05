import SlSkeleton from './skeleton.component.js';

export * from './skeleton.component.js';
export default SlSkeleton;

SlSkeleton.define('sl-skeleton');

declare global {
  interface HTMLElementTagNameMap {
    'sl-skeleton': SlSkeleton;
  }
}
