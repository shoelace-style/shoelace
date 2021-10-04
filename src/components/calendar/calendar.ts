import { LitElement, html } from 'lit';
import { customElement, property, query, queryAll, state } from 'lit/decorators.js';
import { classMap } from 'lit-html/directives/class-map';
import { repeat } from 'lit-html/directives/repeat';
import { isTouchSupported } from '../../internal/support';
import { chunk } from '../../internal/array';
import { emit } from '../../internal/event';
import { Calendar, CalendarDate } from '../../utilities/calendar';
import {
  addDays,
  addMonths,
  addYears,
  compareDate,
  endOfWeek,
  isBetween,
  parseDate,
  startOfWeek,
  datesRange,
  attributeToDate,
  diffDate,
  yearsBetween,
  isBetweenLimit
} from '../../internal/date';
import styles from './calendar.styles';
import { scrollIntoView } from '../../internal/scroll';

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
 * @cssproperty --header-navigation-height - Calendar header navigation height.
 */
@customElement('sl-calendar')
export default class SlCalendar extends LitElement {
  static styles = styles;

  calendar: Calendar;

  private isDateSelection: boolean = false;

  @state()
  private isNavigationOpen: boolean = false;

  @state()
  private hoveredDay?: Date;

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
  tableDays: NodeListOf<HTMLElement>;

  @query('select[aria-label="year"]')
  selectYear: HTMLSelectElement;

  @query('select[aria-label="month"]')
  selectMonth: HTMLSelectElement;

  connectedCallback() {
    const { start, firstDayOfWeek, lang, dateTimeFormat } = this;

    super.connectedCallback();
    this.calendar = new Calendar(firstDayOfWeek, lang, dateTimeFormat);
    this.updateCalendar(start);
  }

  firstUpdated() {
    this.focusDay(this.start);
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
    if (changedProps.has('openNavigation') && changedProps.get('openNavigation')) {
      this.shadowRoot?.querySelectorAll('select').forEach(item => (item.size = 0));
    }

    super.update(changedProps);
  }

  getDayElement = (date: Date): HTMLElement | undefined => {
    return [...this.tableDays].find(element => {
      const selectedDate = parseDate(element.getAttribute('date')!);
      return compareDate(selectedDate, date) === 0;
    });
  };

  focusDay = (date: Date) => {
    this.getDayElement(date)?.focus();
  };

  render() {
    return html` <div class="container">
      <div @keydown=${this.handleKeyDown} class=${classMap({ navigation: true, open: this.isNavigationOpen })}>
        ${this.renderNavigation(
          this.calendar,
          this.min,
          this.max,
          this.month,
          this.year,
          this.handleSelectMonth,
          this.handleSelectYear,
          this.updateCalendarMonth
        )}
      </div>
      <div class="calendar">
        ${this.renderCalendar(
          this.calendar,
          this.today,
          this.dates,
          this.start,
          this.end,
          this.range,
          this.isDateSelection,
          this.hoveredDay,
          this.disabledDates,
          this.handleDayClick,
          this.handleDayHover,
          this.handleKeyDown
        )}
      </div>
    </div>`;
  }

  private renderNavigation = (
    calendar: Calendar,
    minDate: Date | undefined,
    maxDate: Date | undefined,
    currentMonth: number,
    currentYear: number,
    selectMonth: (e: MouseEvent) => void,
    selectYear: (e: MouseEvent) => void,
    changeMonth: (month: number) => void
  ) => {
    return html`
      <div class="buttons">
        <sl-icon
          library="system"
          tabindex="-1"
          name="chevron-compact-left"
          @click=${() => changeMonth(currentMonth - 1)}
        ></sl-icon>
        <div class="button" tabindex="-1" @click=${selectMonth}>${calendar.getMonthName(currentMonth)}</div>
        <div class="button" tabindex="-1" @click=${selectYear}>${currentYear}</div>
        <sl-icon
          library="system"
          tabindex="-1"
          name="chevron-compact-right"
          @click=${() => changeMonth(currentMonth + 1)}
        ></sl-icon>
      </div>
      <div class="dropdowns">
        <select aria-label="month" @click=${selectMonth} @change=${selectMonth}>
          ${calendar
            .getMonthsNames()
            .map(
              month =>
                html`<option
                  value=${month.index}
                  .disabled=${!isBetweenLimit({ month: month.index, year: currentYear }, minDate, maxDate)}
                  .selected=${currentMonth === month.index}
                >
                  ${month.name}
                </option>`
            )}
        </select>
        <select aria-label="year" @click=${selectYear} @change=${selectYear}>
          ${yearsBetween(minDate || addYears(new Date(), -10), maxDate || addYears(new Date(), 10)).map(
            year =>
              html`<option
                value=${year}
                .disabled=${!isBetweenLimit({ month: currentMonth, year: year }, minDate, maxDate)}
                .selected=${currentYear === year}
              >
                ${year}
              </option>`
          )}
        </select>
      </div>
    `;
  };

  private renderCalendar = (
    calendar: Calendar,
    highlightToday: boolean,
    dates: CalendarDate[],
    startDate: Date,
    endDate: Date | undefined,
    multiple: boolean,
    selection: boolean,
    hoveredDate: Date | undefined,
    disabledDates: Date[] | undefined,
    mouseClick: (e: MouseEvent) => void,
    mouseHover: (e: MouseEvent) => void,
    keyDown: (e: KeyboardEvent) => void
  ) => {
    const { isToday, isStartDate, isEndDate, isDateInRange, isDisabledDate, isDateOutsideLimits, getDaysNames } =
      calendar;

    return html` <table>
      <thead>
        <tr>
          ${repeat(getDaysNames(), day => html`<th class="week-day" aria-label=${day}>${day}</th>`)}
        </tr>
      </thead>
      <tbody @click=${mouseClick} @mouseover=${mouseHover} @keydown=${keyDown}>
        ${chunk(dates, 7).map(
          week =>
            html`<tr>
              ${repeat(week, day => {
                const date = calendar.convertToDate(day);
                const strDate = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');

                return html` <td
                  tabindex="-1"
                  aria-label="date"
                  date=${strDate}
                  class=${classMap({
                    day: true,
                    today: highlightToday ? isToday(date) : false,
                    start: isStartDate(date),
                    'start-range': isStartDate(date) && ((selection && multiple) || endDate !== undefined),
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
    </table>`;
  };

  private handleDayClick = (e: MouseEvent) => {
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

  private handleDayHover = (e: MouseEvent) => {
    const date = parseDate((e.target as HTMLElement).getAttribute('date')!);
    this.highlightDates(date);
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement;

    let key = e.key;
    if (e.code === 'Space') key = e.code;

    // KEYBOARD SUPPORT (header navigation)
    // Space, Enter: Selects month/year.
    // Arrow up, Page Up: Moves focus to the previous mounth/year.
    // Arrow down, Page Down: Moves focus to the next mounth/year.
    if (this.isNavigationOpen && ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Enter'].includes(key)) {
      let value = Number((target as HTMLSelectElement).value);
      switch (key) {
        case 'ArrowDown':
        case 'PageDown':
          ++value;
          break;
        case 'ArrowUp':
        case 'PageUp':
          --value;
          break;
        case 'Enter':
          this.isNavigationOpen = false;
          break;
      }

      if (target.getAttribute('aria-label') === 'month') {
        this.updateCalendarMonth(value);
      } else this.updateCalendar({ month: this.month, year: value });

      e.preventDefault();
      return;
    }

    // KEYBOARD SUPPORT (calendar navigation)
    // Space, Enter: Selects a date.
    // Arrow up: Moves focus to the same day of the previous week.
    // Arrow down: Moves focus to the same day of the next week.
    // Arrow right: Moves focus to the next day.
    // Arrow left: Moves focus to the previous day.
    // Home: Moves focus to the first day of the current week.
    // End: Moves focus to the last day of the current week.
    // Page Up: Changes to the previous month and sets focus on the same day of the same week.
    // Page Down: Changes to the next month and sets focus on the same day of the same week.
    const { calendar } = this;

    let date = parseDate(target.getAttribute('date')!);
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

  private handleSelectYear = (e: MouseEvent) => {
    if (e.type === 'change') {
      // mobile support
      if (isTouchSupported()) {
        let index = (e.target as HTMLSelectElement).selectedIndex;
        this.updateCalendarYear(Number(this.selectYear.options[index].value));
        return;
      }
    } else if (e.target instanceof HTMLOptionElement) {
      // on mobile this code is never executed
      this.isNavigationOpen = false;
      this.updateCalendar({ month: this.month, year: Number(e.target.value) });
      this.updateComplete.then(() => this.focusDay(this.start));
    } else {
      if (!isTouchSupported()) {
        this.isNavigationOpen = true;
        this.selectMonth.disabled = true;
        this.selectYear.disabled = false;
        this.selectMonth.size = 0;
        this.selectYear.size = 2;
        this.updateComplete.then(() => {
          scrollIntoView(this.selectYear.querySelector('option:checked')!, this.selectYear, 'vertical', 'smooth', 50);
        });
      }
      this.selectYear.focus();
    }
  };

  private handleSelectMonth = (e: MouseEvent) => {
    if (e.type === 'change') {
      // mobile support
      if (isTouchSupported()) {
        let index = (e.target as HTMLSelectElement).selectedIndex;
        this.updateCalendarMonth(Number(this.selectMonth.options[index].value));
        return;
      }
    } else if (e.target instanceof HTMLOptionElement) {
      // on mobile this code is never executed
      this.isNavigationOpen = false;
      this.updateCalendarMonth(Number(e.target.value));
      this.updateComplete.then(() => this.focusDay(this.start));
    } else {
      if (!isTouchSupported()) {
        this.isNavigationOpen = true;
        this.selectYear.disabled = true;
        this.selectMonth.disabled = false;
        this.selectYear.size = 0;
        this.selectMonth.size = 2;
        this.updateComplete.then(() => {
          scrollIntoView(this.selectMonth.querySelector('option:checked')!, this.selectMonth, 'vertical', 'smooth', 50);
        });
      }
      this.selectMonth.focus();
    }
  };

  private handleDateRange = (date: Date) => {
    if (this.isDateSelection) {
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
        this.hoveredDay = date;
        this.start = date;
        return;
      }
    }

    this.isDateSelection = !this.isDateSelection;

    if (this.isDateSelection) {
      // start dates selection
      this.hoveredDay = date;
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

      this.hoveredDay = undefined;

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
    if (this.range) this.hoveredDay = this.isDateSelection ? date : undefined;
  };

  private updateCalendar = (date: Date | { month: number; year: number }) => {
    const { calendar } = this;

    if (date instanceof Date)
      date = {
        month: date.getMonth() + 1,
        year: date.getFullYear()
      };

    // check date boundaries limits
    if (!isBetweenLimit(date, this.min, this.max)) return;

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

  private updateCalendarMonth = (month: number) => {
    let year = this.year;
    if (month < 1) {
      month = 12;
      year -= 1;
    } else if (month > 12) {
      month = 1;
      year += 1;
    }
    this.updateCalendar({ month, year });
    this.updateComplete.then(() => this.focusDay(this.start));
  };

  private updateCalendarYear = (year: number) => {
    this.updateCalendar({ month: this.month, year });
    this.updateComplete.then(() => this.focusDay(this.start));
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-calendar': SlCalendar;
  }
}
