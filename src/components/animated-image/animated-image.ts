import SlAnimatedImage from './animated-image.component.js';

export * from './animated-image.component.js';
export default SlAnimatedImage;

SlAnimatedImage.define('sl-animated-image');

declare global {
  interface HTMLElementTagNameMap {
    'sl-animated-image': SlAnimatedImage;
  }
}
