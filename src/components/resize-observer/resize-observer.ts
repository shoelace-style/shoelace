import SlResizeObserver from './resize-observer.component.js';

export * from './resize-observer.component.js';
export default SlResizeObserver;

SlResizeObserver.define('sl-resize-observer');

declare global {
  interface HTMLElementTagNameMap {
    'sl-resize-observer': SlResizeObserver;
  }
}
