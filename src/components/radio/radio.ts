import SlRadio from './radio.component.js';

export * from './radio.component.js';
export default SlRadio;

SlRadio.define('sl-radio');

declare global {
  interface HTMLElementTagNameMap {
    'sl-radio': SlRadio;
  }
}
