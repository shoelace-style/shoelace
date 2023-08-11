import SlInput from './input.component.js';

export * from './input.component.js';
export default SlInput;

SlInput.define('sl-input');

declare global {
  interface HTMLElementTagNameMap {
    'sl-input': SlInput;
  }
}
