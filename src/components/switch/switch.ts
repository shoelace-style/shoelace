import SlSwitch from './switch.component.js';

export * from './switch.component.js';
export default SlSwitch;

SlSwitch.define('sl-switch');

declare global {
  interface HTMLElementTagNameMap {
    'sl-switch': SlSwitch;
  }
}
