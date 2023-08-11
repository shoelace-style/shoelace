import SlCalendar from './calendar.component.js';

export * from './calendar.component.js';
export default SlCalendar;

SlCalendar.define('sl-calendar');

declare global {
  interface HTMLElementTagNameMap {
    'sl-calendar': SlCalendar;
  }
}
