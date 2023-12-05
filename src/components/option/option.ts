import SlOption from './option.component.js';

export * from './option.component.js';
export default SlOption;

SlOption.define('sl-option');

declare global {
  interface HTMLElementTagNameMap {
    'sl-option': SlOption;
  }
}
