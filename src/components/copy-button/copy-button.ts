import SlCopyButton from './copy-button.component.js';

export * from './copy-button.component.js';
export default SlCopyButton;

SlCopyButton.define('sl-copy-button');

declare global {
  interface HTMLElementTagNameMap {
    'sl-copy-button': SlCopyButton;
  }
}
