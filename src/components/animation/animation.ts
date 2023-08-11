import SlAnimation from './animation.component.js';

export * from './animation.component.js';
export default SlAnimation;

SlAnimation.define('sl-animation');

declare global {
  interface HTMLElementTagNameMap {
    'sl-animation': SlAnimation;
  }
}
