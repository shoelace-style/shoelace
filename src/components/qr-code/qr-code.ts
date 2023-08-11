import SlQrCode from './qr-code.component.js';

export * from './qr-code.component.js';
export default SlQrCode;

SlQrCode.define('sl-qr-code');

declare global {
  interface HTMLElementTagNameMap {
    'sl-qr-code': SlQrCode;
  }
}
