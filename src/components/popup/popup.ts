import SlPopup from './popup.component.js';

export * from './popup.component.js';
export default SlPopup;

SlPopup.define('sl-popup');

declare global {
  interface HTMLElementTagNameMap {
    'sl-popup': SlPopup;
  }
}
