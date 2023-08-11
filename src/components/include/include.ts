import SlInclude from './include.component.js';

export * from './include.component.js';
export default SlInclude;

SlInclude.define('sl-include');

declare global {
  interface HTMLElementTagNameMap {
    'sl-include': SlInclude;
  }
}
