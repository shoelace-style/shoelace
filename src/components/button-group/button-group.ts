import SlButtonGroup from './button-group.component.js';

export * from './button-group.component.js';
export default SlButtonGroup;

SlButtonGroup.define('sl-button-group');

declare global {
  interface HTMLElementTagNameMap {
    'sl-button-group': SlButtonGroup;
  }
}
