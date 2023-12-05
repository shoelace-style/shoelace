import SlMutationObserver from './mutation-observer.component.js';

export * from './mutation-observer.component.js';
export default SlMutationObserver;

SlMutationObserver.define('sl-mutation-observer');

declare global {
  interface HTMLElementTagNameMap {
    'sl-mutation-observer': SlMutationObserver;
  }
}
