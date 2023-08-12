import SlAlert from './alert.component.js';

export * from './alert.component.js';
export default SlAlert;

SlAlert.define('sl-alert');

declare global {
  interface HTMLElementTagNameMap {
    'sl-alert': SlAlert;
  }
}
