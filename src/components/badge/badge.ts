import SlBadge from './badge.component.js';

export * from './badge.component.js';
export default SlBadge;

SlBadge.define('sl-badge');

declare global {
  interface HTMLElementTagNameMap {
    'sl-badge': SlBadge;
  }
}
