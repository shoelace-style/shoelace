import SlDialog from './dialog.component.js';

export * from './dialog.component.js';
export default SlDialog;

SlDialog.define('sl-dialog');

declare global {
  interface HTMLElementTagNameMap {
    'sl-dialog': SlDialog;
  }
}
