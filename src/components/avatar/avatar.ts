import SlAvatar from './avatar.component.js';

export * from './avatar.component.js';
export default SlAvatar;

SlAvatar.define('sl-avatar');

declare global {
  interface HTMLElementTagNameMap {
    'sl-avatar': SlAvatar;
  }
}
