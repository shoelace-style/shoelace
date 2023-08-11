import SlDetails from './details.component.js';

export * from './details.component.js';
export default SlDetails;

SlDetails.define('sl-details');

declare global {
  interface HTMLElementTagNameMap {
    'sl-details': SlDetails;
  }
}
