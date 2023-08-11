import SlFileInput from './file-input.component.js';

export * from './file-input.component.js';
export default SlFileInput;

SlFileInput.define('sl-file-input');

declare global {
  interface HTMLElementTagNameMap {
    'sl-file-input': SlFileInput;
  }
}
