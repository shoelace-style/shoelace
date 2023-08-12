import SlCard from './card.component.js';

export * from './card.component.js';
export default SlCard;

SlCard.define('sl-card');

declare global {
  interface HTMLElementTagNameMap {
    'sl-card': SlCard;
  }
}
