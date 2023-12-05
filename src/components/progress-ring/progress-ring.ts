import SlProgressRing from './progress-ring.component.js';

export * from './progress-ring.component.js';
export default SlProgressRing;

SlProgressRing.define('sl-progress-ring');

declare global {
  interface HTMLElementTagNameMap {
    'sl-progress-ring': SlProgressRing;
  }
}
