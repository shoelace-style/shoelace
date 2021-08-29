import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit-html/directives/if-defined';
import { attributeToDate } from '../../internal/date';
import type SlDropdown from '../dropdown/dropdown';
import type SlCalendar from '../calendar/calendar';
import '../calendar/calendar';
import styles from './date-picker.styles';

/**
 * @since 2.X
 * @status beta
 *
 * @dependency sl-dropdown
 * @dependency sl-calendar
 * @dependency sl-button
 * @dependency sl-icon
 *
 * @csspart base - The component's base wrapper.
 */
@customElement('sl-date-picker')
export default class SlDatePicker extends LitElement {
  static styles = styles;

  /** Initial date to display (YYY-MM-DD). */
  @property({ type: Object, converter: attributeToDate })
  start: Date = new Date();

  /** End date when rage attribute is set (YYY-MM-DD). */
  @property({ type: Object, converter: attributeToDate })
  end?: Date;

  /** The minimum date that can be selected (YYY-MM-DD). */
  @property({ type: Object, converter: attributeToDate })
  max?: Date;

  /** The maximum date that can be selected (YYY-MM-DD). */
  @property({ type: Object, converter: attributeToDate })
  min?: Date;

  /** Disabled dates. */
  @property({ type: Array, attribute: 'disabled-dates' })
  disabledDates?: Date[];

  /** Highlight the current day. */
  @property({ type: Boolean, attribute: 'today' })
  today: boolean = false;

  /** Enable or disable date range. */
  @property({ type: Boolean })
  range: boolean = false;

  /** Locale language code. */
  @property({ type: String })
  lang: string = 'en-US';

  /** Date and time format. */
  @property({ type: Object, attribute: 'date-time-format' })
  dateTimeFormat: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'long' };

  /** Limit range dates selection. */
  @property({ type: Number, attribute: 'limit-range' })
  limitRange?: number;

  /** Week day start number. */
  @property({ type: Number, attribute: 'first-day-of-week' })
  firstDayOfWeek: number = 0;

  @query('sl-dropdown')
  dropdown: SlDropdown;

  @query('sl-calendar')
  calendar: SlCalendar;

  // private handleComponentNavigation(e: KeyboardEvent) {
  //   const el = (e.target as HTMLElement).classList;

  //   if (e.key === 'Tab') {
  //     if (el.contains('prev-button')) this.selectMonthButton.focus();
  //     else if (el.contains('months-button')) this.selectYearButton.focus();
  //     else if (el.contains('years-button')) this.nextButton.focus();
  //     else if (el.contains('next-button')) this.getDayElement(this._focusedDay)!.focus();
  //     // else if (el.contains('day')) this.prevButton.focus();
  //   }

  //   if (e.key === 'Enter') {
  //     (e.target as SlButton).click();
  //     this.updateComplete.then(() => {
  //       if (el.contains('prev-button')) this.prevButton.focus();
  //       if (el.contains('next-button')) this.nextButton.focus();
  //     });
  //   }

  //   e.preventDefault();
  // }

  render() {
    return html`
      <div class="container" part="base">
        <slot></slot>
        <sl-dropdown
          distance="5"
          placement="bottom-end"
          @sl-after-show=${this.focusDayElement}
          .containing-element=${this}
        >
          <sl-button exportparts="base:trigger-button" type="default" size="medium" slot="trigger">
            <sl-icon name=${this.range ? 'calendar4-range' : 'calendar3'} library="system"> </sl-icon>
          </sl-button>
          <sl-calendar
            .start=${this.start}
            .end=${this.end}
            .min=${this.min}
            .max=${this.max}
            .range=${this.range}
            limitRange=${ifDefined(this.limitRange)}
            firstDayOfWeek=${this.firstDayOfWeek}
            .dateTimeFormat=${this.dateTimeFormat}
            .disabledDates=${this.disabledDates}
            @sl-calendar-date-selected=${this.handleDateSelected}
            @sl-calendar-range-selected=${this.handleRangeSelected}
          ></sl-calendar>
        </sl-dropdown>
      </div>
    `;
  }

  private focusDayElement() {
    this.calendar.focusDay(this.start);
  }

  private handleRangeSelected(e: CustomEvent<{ start: Date; end: Date; disabled?: Date[]; range: Date[] }>) {
    this.start = e.detail.start;
    this.end = e.detail.end;
    this.dropdown.hide();
  }

  private handleDateSelected(e: CustomEvent<Date>) {
    if (!this.range) {
      this.start = e.detail;
      this.dropdown.hide();
    }
  }
}
