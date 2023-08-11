import SlRadioGroup from './radio-group.component.js';

export * from './radio-group.component.js';
export default SlRadioGroup;

SlRadioGroup.define('sl-radio-group');

declare global {
  interface HTMLElementTagNameMap {
    'sl-radio-group': SlRadioGroup;
  }
}
