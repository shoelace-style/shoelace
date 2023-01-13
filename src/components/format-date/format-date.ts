import { customElement, property } from 'lit/decorators.js';
import { html } from 'lit';
import { LocalizeController } from '../../utilities/localize';
import ShoelaceElement from '../../internal/shoelace-element';

/**
 * @summary Formats a date/time using the specified locale and options.
 * @documentation https://shoelace.style/components/format-date
 * @status stable
 * @since 2.0
 */
@customElement('sl-format-date')
export default class SlFormatDate extends ShoelaceElement {
  private readonly localize = new LocalizeController(this);

  /**
   * The date/time to format. If not set, the current date and time will be used. When passing a string, it's strongly
   * recommended to use the ISO 8601 format to ensure timezones are handled correctly. To convert a date to this format
   * in JavaScript, use [`date.toISOString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString).
   */
  @property() date: Date | string = new Date();

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

  /** The format for displaying the hour. */
  @property({ attribute: 'hour-format' }) hourFormat: 'auto' | '12' | '24' = 'auto';

  render() {
    const date = new Date(this.date);
    const hour12 = this.hourFormat === 'auto' ? undefined : this.hourFormat === '12';

    // Check for an invalid date
    if (isNaN(date.getMilliseconds())) {
      return undefined;
    }

    return html`
      <time datetime=${date.toISOString()}>
        ${this.localize.date(date, {
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
        })}
      </time>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-format-date': SlFormatDate;
  }
}
