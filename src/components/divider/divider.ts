import SlDivider from './divider.component.js';

export * from './divider.component.js';
export default SlDivider;

SlDivider.define('sl-divider');

declare global {
  interface HTMLElementTagNameMap {
    'sl-divider': SlDivider;
  }
}
