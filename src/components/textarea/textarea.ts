import SlTextarea from './textarea.component.js';

export * from './textarea.component.js';
export default SlTextarea;

SlTextarea.define('sl-textarea');

declare global {
  interface HTMLElementTagNameMap {
    'sl-textarea': SlTextarea;
  }
}
