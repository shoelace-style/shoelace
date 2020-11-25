import { Component, Prop } from '@stencil/core';

/**
 * @since 2.0
 * @status stable
 */

@Component({
  tag: 'sl-format-date',
  shadow: true
})
export class FormatBytes {
  /** The date/time to format. If not set, the current date and time will be used. */
  @Prop() date: Date | string = new Date();

  /** The locale to use when formatting the date/time. */
  @Prop() locale: string;

  /** The format for displaying the weekday. */
  @Prop() weekday: 'narrow' | 'short' | 'long';

  /** The format for displaying the era. */
  @Prop() era: 'narrow' | 'short' | 'long';

  /** The format for displaying the year. */
  @Prop() year: 'numeric' | '2-digit';

  /** The format for displaying the month. */
  @Prop() month: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';

  /** The format for displaying the day. */
  @Prop() day: 'numeric' | '2-digit';

  /** The format for displaying the hour. */
  @Prop() hour: 'numeric' | '2-digit';

  /** The format for displaying the minute. */
  @Prop() minute: 'numeric' | '2-digit';

  /** The format for displaying the second. */
  @Prop() second: 'numeric' | '2-digit';

  /** The format for displaying the time. */
  @Prop() timeZoneName: 'short' | 'long';

  /** The time zone to express the time in. */
  @Prop() timeZone: string;

  /** When set, 24 hour time will always be used. */
  @Prop() hourFormat: 'auto' | '12' | '24' = 'auto';

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
