import SlVisuallyHidden from './visually-hidden.component.js';

export * from './visually-hidden.component.js';
export default SlVisuallyHidden;

SlVisuallyHidden.define('sl-visually-hidden');

declare global {
  interface HTMLElementTagNameMap {
    'sl-visually-hidden': SlVisuallyHidden;
  }
}
