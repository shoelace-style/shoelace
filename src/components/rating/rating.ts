import SlRating from './rating.component.js';

export * from './rating.component.js';
export default SlRating;

SlRating.define('sl-rating');

declare global {
  interface HTMLElementTagNameMap {
    'sl-rating': SlRating;
  }
}
