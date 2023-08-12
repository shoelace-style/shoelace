import SlColorPicker from './color-picker.component.js';

export * from './color-picker.component.js';
export default SlColorPicker;

SlColorPicker.define('sl-color-picker');

declare global {
  interface HTMLElementTagNameMap {
    'sl-color-picker': SlColorPicker;
  }
}
