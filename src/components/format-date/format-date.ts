import SlFormatDate from './format-date.component.js';

export * from './format-date.component.js';
export default SlFormatDate;

SlFormatDate.define('sl-format-date');

declare global {
  interface HTMLElementTagNameMap {
    'sl-format-date': SlFormatDate;
  }
}
