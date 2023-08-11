import SlTabGroup from './tab-group.component.js';

export * from './tab-group.component.js';
export default SlTabGroup;

SlTabGroup.define('sl-tab-group');

declare global {
  interface HTMLElementTagNameMap {
    'sl-tab-group': SlTabGroup;
  }
}
