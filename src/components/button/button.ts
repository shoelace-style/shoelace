import SlButton from './button.component.js';

export * from './button.component.js';
export default SlButton;

SlButton.define('sl-button');

declare global {
  interface HTMLElementTagNameMap {
    'sl-button': SlButton;
  }
}
