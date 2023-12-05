import SlTag from './tag.component.js';

export * from './tag.component.js';
export default SlTag;

SlTag.define('sl-tag');

declare global {
  interface HTMLElementTagNameMap {
    'sl-tag': SlTag;
  }
}
