import SlIconButton from './icon-button.component.js';

export * from './icon-button.component.js';
export default SlIconButton;

SlIconButton.define('sl-icon-button');

declare global {
  interface HTMLElementTagNameMap {
    'sl-icon-button': SlIconButton;
  }
}
