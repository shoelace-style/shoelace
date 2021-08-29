import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addYears, addMonths, addDays } from '../../internal/date';

/**
 * @since 2.0
 * @status stable
 */
@customElement('sl-format-date')
export default class SlFormatDate extends LitElement {
  /** The date/time to format. If not set, the current date and time will be used. */
  @property() date: Date | string = new Date();

  /** The locale to use when formatting the date/time. */
  @property() locale: string;

  /** The format for displaying the weekday. */
  @property() weekday: 'narrow' | 'short' | 'long';

  /** The format for displaying the era. */
  @property() era: 'narrow' | 'short' | 'long';

  /** The format for displaying the year. */
  @property() year: 'numeric' | '2-digit';

  /** The format for displaying the month. */
  @property() month: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';

  /** The format for displaying the day. */
  @property() day: 'numeric' | '2-digit';

  /** The format for displaying the hour. */
  @property() hour: 'numeric' | '2-digit';

  /** The format for displaying the minute. */
  @property() minute: 'numeric' | '2-digit';

  /** The format for displaying the second. */
  @property() second: 'numeric' | '2-digit';

  /** The format for displaying the time. */
  @property({ attribute: 'time-zone-name' }) timeZoneName: 'short' | 'long';

  /** The time zone to express the time in. */
  @property({ attribute: 'time-zone' }) timeZone: string;

  /** When set, 24 hour time will always be used. */
  @property({ attribute: 'hour-format' }) hourFormat: 'auto' | '12' | '24' = 'auto';

  render() {
    const date = new Date(this.date);
    const hour12 = this.hourFormat === 'auto' ? undefined : this.hourFormat === '12';

    // Check for an invalid date
    if (isNaN(date.getMilliseconds())) {
      return;
    }

    return new Intl.DateTimeFormat(this.locale, {
      weekday: this.weekday,
      era: this.era,
      year: this.year,
      month: this.month,
      day: this.day,
      hour: this.hour,
      minute: this.minute,
      second: this.second,
      timeZoneName: this.timeZoneName,
      timeZone: this.timeZone,
      hour12: hour12
    }).format(date);
  }

  calculate = (
    actions:
      | 'start-of-month'
      | 'end-of-month'
      | 'start-of-week'
      | 'end-of-week'
      | 'add-years'
      | 'add-months'
      | 'add-days',
    value?: number
  ): void => {
    const date = new Date(this.date);

    switch (actions) {
      case 'start-of-month':
        this.date = startOfMonth(date);
        break;
      case 'end-of-month':
        this.date = endOfMonth(date);
        break;
      case 'start-of-week':
        this.date = startOfWeek(date);
        break;
      case 'end-of-week':
        this.date = endOfWeek(date);
        break;
      case 'add-years':
        this.date = addYears(date, value!);
        break;
      case 'add-months':
        this.date = addMonths(date, value!);
        break;
      case 'add-days':
        this.date = addDays(date, value!);
        break;
    }
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-format-date': SlFormatDate;
  }
}
