import SlRadioButton from './radio-button.component.js';

export * from './radio-button.component.js';
export default SlRadioButton;

SlRadioButton.define('sl-radio-button');

declare global {
  interface HTMLElementTagNameMap {
    'sl-radio-button': SlRadioButton;
  }
}
