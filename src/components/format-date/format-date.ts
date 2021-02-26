import { Shoemaker } from '@shoelace-style/shoemaker';

/**
 * @since 2.0
 * @status stable
 */
export default class SlFormatDate extends Shoemaker {
  static tag = 'sl-format-date';
  static props = [
    'date',
    'locale',
    'weekday',
    'era',
    'year',
    'month',
    'day',
    'hour',
    'minute',
    'second',
    'timeZoneName',
    'timeZone',
    'hourFormat'
  ];

  /** The date/time to format. If not set, the current date and time will be used. */
  date: Date | string = new Date();

  /** The locale to use when formatting the date/time. */
  locale: string;

  /** The format for displaying the weekday. */
  weekday: 'narrow' | 'short' | 'long';

  /** The format for displaying the era. */
  era: 'narrow' | 'short' | 'long';

  /** The format for displaying the year. */
  year: 'numeric' | '2-digit';

  /** The format for displaying the month. */
  month: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';

  /** The format for displaying the day. */
  day: 'numeric' | '2-digit';

  /** The format for displaying the hour. */
  hour: 'numeric' | '2-digit';

  /** The format for displaying the minute. */
  minute: 'numeric' | '2-digit';

  /** The format for displaying the second. */
  second: 'numeric' | '2-digit';

  /** The format for displaying the time. */
  timeZoneName: 'short' | 'long';

  /** The time zone to express the time in. */
  timeZone: string;

  /** When set, 24 hour time will always be used. */
  hourFormat: 'auto' | '12' | '24' = 'auto';

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
}
