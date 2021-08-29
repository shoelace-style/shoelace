import { LitElement, html } from 'lit';
import { customElement, property, queryAll, state } from 'lit/decorators.js';
import { classMap } from 'lit-html/directives/class-map';
import { repeat } from 'lit-html/directives/repeat';
import { ifDefined } from 'lit-html/directives/if-defined';
import { Calendar, CalendarDate } from '../../utilities/calendar';
import { chunk } from '../../internal/array';
import { emit } from '../../internal/event';
import {
  addDays,
  addMonths,
  compareDate,
  endOfWeek,
  isBetween,
  parseDate,
  startOfWeek,
  datesRange,
  attributeToDate,
  diffDate
} from '../../internal/date';
import styles from './calendar.styles';

/**
 * @since 2.X
 * @status beta
 *
 * @dependency sl-icon
 *
 * @event {{ start: Date, end: Date, disabled?: Date[], range: Date[] }} sl-calendar-range-selected - Emitted when a dates range is selected.
 * @event {{ Date }} sl-calendar-date-selected - Emitted when a date is selected (start or end).
 * @event {{ number }} sl-calendar-month-changed - Emitted when the month is changed.
 * @event {{ number }} sl-calendar-year-changed - Emitted when the year is changed.
 *
 * @cssproperty --table-cell-width - Calendar table cell width.
 * @cssproperty --table-cell-height - Calendar table cell height.
 */
@customElement('sl-calendar')
export default class SlCalendar extends LitElement {
  static styles = styles;

  calendar: Calendar;

  private selectionEnable: boolean = false;

  @state()
  private hovered?: Date;

  @state()
  private dates: CalendarDate[] = [];

  @state()
  private month: number;

  @state()
  private year: number;

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

  @queryAll('td.day')
  days: NodeListOf<HTMLElement>;

  connectedCallback() {
    const { start, firstDayOfWeek, lang, dateTimeFormat } = this;

    super.connectedCallback();
    this.calendar = new Calendar(firstDayOfWeek, lang, dateTimeFormat);
    this.updateCalendar(start);
  }

  update(changedProps: Map<string, any>) {
    const { calendar } = this;

    if (changedProps.has('start')) calendar.startDate = this.start;
    if (changedProps.has('end')) calendar.endDate = this.end;
    if (changedProps.has('min')) calendar.minDate = this.min;
    if (changedProps.has('max')) calendar.maxDate = this.max;
    if (changedProps.has('range')) calendar.allowRange = this.range;
    if (changedProps.has('limitRange')) calendar.maxRangeLength = this.limitRange;
    if (changedProps.has('disabledDates')) calendar.disabledDates = this.disabledDates;

    super.update(changedProps);
  }

  render() {
    return html`
      <div class="header">
        ${this.renderNavigation(
          this.calendar,
          this.month,
          this.year,
          this.handleChangeYear,
          this.handleChangeMonth,
          this.handleSelectMonth
        )}
      </div>
      ${this.renderCalendar(
        this.calendar,
        this.today,
        this.start,
        this.end,
        this.hovered,
        this.disabledDates,
        this.handleClick,
        this.handleHover,
        this.handleKeyDown
      )}
    `;
  }

  getDayElement = (date: Date): HTMLElement | undefined => {
    return [...this.days].find(element => {
      const selectedDate = parseDate(element.getAttribute('date')!);
      return compareDate(selectedDate, date) === 0;
    });
  };

  focusDay = (date: Date) => {
    this.getDayElement(date)?.focus();
  };

  private renderNavigation = (
    calendar: Calendar,
    month: number,
    year: number,
    changeYear: (e: MouseEvent) => void,
    changeMonth: (e: MouseEvent) => void,
    selectMonth: (e: MouseEvent) => void
  ) => {
    return html`
      <div class="navigation">
        <sl-icon library="system" data-action="prev" name="chevron-compact-left" @click=${changeMonth}></sl-icon>
        <select aria-label="month" tabindex="-1" @change=${selectMonth}>
          ${calendar
            .getMonthsNames()
            .map(
              item =>
                html`<option
                  value=${item.index}
                  .disabled=${!this.checkDateLimits({ month: item.index, year })}
                  .selected=${month === item.index}
                >
                  ${item.name}
                </option>`
            )}
        </select>
        <div class="spinner">
          <input
            type="number"
            min=${this.min?.getFullYear() || 1900}
            max=${ifDefined(this.max?.getFullYear())}
            pattern="[0-9]*"
            inputmode="numeric"
            tabindex="-1"
            aria-label="year"
            .value=${year.toString()}
            @input=${changeYear}
            onkeydown="return false"
          />
          <span class="up" data-action="next" @click=${changeYear}></span>
          <span class="down" data-action="prev" @click=${changeYear}></span>
        </div>
        <sl-icon library="system" data-action="next" name="chevron-compact-right" @click=${changeMonth}></sl-icon>
      </div>
    `;
  };

  private renderCalendar = (
    calendar: Calendar,
    highlightToday: boolean,
    startDate: Date,
    endDate: Date | undefined,
    hoveredDate: Date | undefined,
    disabledDates: Date[] | undefined,
    mouseClick: (e: MouseEvent) => void,
    mouseHover: (e: MouseEvent) => void,
    keyDown: (e: KeyboardEvent) => void
  ) => {
    const { isToday, isStartDate, isEndDate, isDateInRange, isDisabledDate, isDateOutsideLimits, getDaysNames } =
      calendar;

    return html`<div class="calendar">
      <table>
        <thead>
          <tr>
            ${repeat(getDaysNames(), day => html`<th class="week-day" aria-label=${day}>${day}</th>`)}
          </tr>
        </thead>
        <tbody @click=${mouseClick} @mouseover=${mouseHover} @keydown=${keyDown}>
          ${chunk(this.dates, 7).map(
            week =>
              html`<tr>
                ${repeat(week, day => {
                  const date = calendar.convertToDate(day);
                  const strDate = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');

                  return html` <td
                    tabindex="-1"
                    date=${strDate}
                    class=${classMap({
                      day: true,
                      today: highlightToday ? isToday(date) : false,
                      start: isStartDate(date),
                      'start-range':
                        isStartDate(date) && ((this.selectionEnable && this.range) || this.end !== undefined),
                      end: isEndDate(date),
                      disabled: disabledDates ? isDisabledDate(date) : false,
                      range: isDateInRange(date, startDate, hoveredDate || endDate),
                      outside: isDateOutsideLimits(date),
                      sibling: day.siblingMonth || false
                    })}
                  >
                    ${day.day}
                  </td>`;
                })}
              </tr>`
          )}
        </tbody>
      </table>
    </div>`;
  };

  private handleClick = (e: MouseEvent) => {
    const { calendar } = this;
    const date = parseDate((e.target as HTMLElement).getAttribute('date')!);

    if (calendar.isDateOutsideLimits(date) || calendar.isDisabledDate(date)) return;
    if (this.range) {
      this.handleDateRange(date);
    } else {
      this.start = date;
      emit<Date>(this, 'sl-calendar-date-selected', { detail: date });
    }
  };

  private handleHover = (e: MouseEvent) => {
    const date = parseDate((e.target as HTMLElement).getAttribute('date')!);
    this.highlightDates(date);
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    const value = (e.target as HTMLElement).getAttribute('date')!;
    let date = parseDate(value);

    let key = e.key;
    if (e.code === 'Space') key = e.code;

    // KEYBOARD SUPPORT
    // Space, Enter: Selects a date, closes the dialog.
    // Arrow up: Moves focus to the same day of the previous week.
    // Arrow down: Moves focus to the same day of the next week.
    // Arrow right: Moves focus to the next day.
    // Arrow left: Moves focus to the previous day.
    // Home: Moves focus to the first day of the current week.
    // End: Moves focus to the last day of the current week.
    // Page Up: Changes to the previous month and sets focus on the same day of the same week.
    // Page Down: Changes to the next month and sets focus on the same day of the same week.
    const { calendar } = this;

    let handled = true;
    switch (key) {
      case 'ArrowRight':
        date = addDays(date, 1);
        break;
      case 'ArrowLeft':
        date = addDays(date, -1);
        break;
      case 'ArrowDown':
        date = addDays(date, 7);
        break;
      case 'ArrowUp':
        date = addDays(date, -7);
        break;
      case 'PageUp':
        date = addMonths(date, -1);
        break;
      case 'PageDown':
        date = addMonths(date, 1);
        break;
      case 'Home':
        date = startOfWeek(date, calendar.firstDayOfWeek);
        break;
      case 'End':
        date = endOfWeek(date, calendar.firstDayOfWeek);
        break;
      case 'Enter':
      case 'Space':
        if (calendar.isDateOutsideLimits(date) || calendar.isDisabledDate(date)) return;
        if (this.range) {
          this.handleDateRange(date);
        } else {
          this.start = date;
          emit<Date>(this, 'sl-calendar-date-selected', { detail: date });
        }
        break;
      default:
        handled = false;
    }

    if (handled) {
      e.preventDefault();

      if (this.getDayElement(date) === undefined) {
        // date don't exist in this calendar view
        // we switch to the next or prev month
        // when the element update is compleated
        this.updateCalendar(date);
        this.updateComplete.then(() => this.focusDay(date));
      } else {
        this.focusDay(date);
        this.highlightDates(date);
      }
    }
  };

  private handleSelectMonth = (e: MouseEvent) => {
    let newMonth = Number((e.target as HTMLSelectElement).value);
    this.updateCalendar({ month: newMonth, year: this.year });
  };

  private handleChangeMonth = (e: MouseEvent) => {
    const value = (e.target as HTMLElement).dataset.action === 'next' ? 1 : -1;

    let newMonth = this.month + value;
    let newYear = this.year;

    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    } else if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }

    this.updateCalendar({ month: newMonth, year: newYear });
  };

  private handleChangeYear = (e: MouseEvent) => {
    let newYear: number;

    if (e.target instanceof HTMLInputElement) {
      newYear = Number(e.target.value);
    } else {
      const value = (e.target as HTMLElement).dataset.action === 'next' ? 1 : -1;
      newYear = this.year + value;
    }

    this.updateCalendar({ month: this.month, year: newYear });
  };

  private handleDateRange = (date: Date) => {
    if (this.selectionEnable) {
      const { calendar } = this;
      // check selected date:
      // not a disabled date
      // not outside the min and max date limits
      // inside the range limits
      let invalid = false;
      if (calendar.isDateOutsideLimits(date) || calendar.isDisabledDate(date)) invalid = true;
      if (this.limitRange) {
        let days = Math.abs(diffDate(this.start, date));
        if (days > this.limitRange + 1) invalid = true;
      }
      if (invalid) {
        this.hovered = date;
        this.start = date;
        return;
      }
    }

    this.selectionEnable = !this.selectionEnable;

    if (this.selectionEnable) {
      // start dates selection
      this.hovered = date;
      this.start = date;
      this.end = undefined;

      // selected date
      emit<Date>(this, 'sl-calendar-date-selected', { detail: this.start });
    } else {
      // end dates selection
      // and swap dates when
      // start date > end date
      if (this.start > date) {
        this.end = this.start;
        this.start = date;
      } else this.end = date;

      this.hovered = undefined;

      // dates range
      emit<{ start: Date; end: Date; disabled?: Date[]; range: Date[] }>(this, 'sl-calendar-range-selected', {
        detail: {
          start: this.start,
          end: this.end,
          disabled: this.disabledDates?.filter(date => isBetween(date, this.start, this.end)),
          range: datesRange(this.start, this.end)
        }
      });
    }
  };

  private highlightDates = (date: Date) => {
    if (this.range) this.hovered = this.selectionEnable ? date : undefined;
  };

  private updateCalendar = (date: Date | { month: number; year: number }) => {
    const { calendar } = this;

    if (date instanceof Date)
      date = {
        month: date.getMonth() + 1,
        year: date.getFullYear()
      };

    // check date boundaries limits
    if (!this.checkDateLimits(date)) return;

    // create new calendar
    this.dates = calendar.createCalendar(date);

    // dispatch events
    if (calendar.month !== this.month) {
      emit<Number>(this, 'sl-calendar-month-changed', { detail: calendar.month });
    }
    if (calendar.year !== this.year) {
      emit<Number>(this, 'sl-calendar-year-changed', { detail: calendar.year });
    }

    // update internal properties
    this.month = calendar.month;
    this.year = calendar.year;
  };

  private checkDateLimits = (date: { month: number; year: number }) => {
    if (
      (this.min !== undefined && date.year < this.min.getFullYear()) ||
      (this.min !== undefined && date.month < this.min.getMonth() + 1)
    )
      return false;

    if (
      (this.max !== undefined && date.year > this.max.getFullYear()) ||
      (this.max !== undefined && date.month > this.max.getMonth() + 1)
    )
      return false;

    return true;
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-calendar': SlCalendar;
  }
}
