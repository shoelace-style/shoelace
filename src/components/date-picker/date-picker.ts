import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, queryAll, state } from 'lit/decorators.js';
import { CalendarView, CalendarDate, CalendarLocale, CalendarUtils } from '../../utilities/calendar';
import { watch } from '../../internal/watch';
import { emit } from '../../internal/event';
import type SlDropdown from '../dropdown/dropdown';
import type SlButton from '../icon-button/icon-button';
import styles from 'sass:./date-picker.scss';

var calendar: CalendarView;

const attributeToDate = (value: string): Date | undefined => {
  if (!value) return;
  const date = CalendarUtils.parseDateFromString(value);
  return CalendarUtils.getDateObject(date);
};

/**
 * @since 2.X
 * @status beta
 *
 * @event {{ start: Date, end: Date, range: Date[] }} sl-range-selected - Emitted when a dates range is selected.
 * @event {{ Date }} sl-date-selected - Emitted when a date is selected (start or end).
 *
 * @dependency sl-dropdown
 * @dependency sl-button
 * @dependency sl-icon
 *
 * @slot - The default inputs container. Available only when display is 'dropdown'.
 *
 * @csspart trigger-button - The date picker dropdown's trigger, usually a `<sl-button>` element.
 *
 * @cssprop --cell-inline-width - Cell width for inline date picker
 * @cssprop --cell-inline-height - Cell width for inline date picker
 * @cssprop --cell-dropdown-width - Cell width for dropdown date picker
 * @cssprop --cell-dropdown-height - Cell width for dropdown date picker
 */
@customElement('sl-date-picker')
export default class SlDatePicker extends LitElement {
  static styles = unsafeCSS(styles);

  private locale: CalendarLocale;
  private _focusedDay: Date;

  // we use a custom setter to prevent update request from Lit
  // because set a focusable DOM element don't require an update
  set focusedDay(value: Date) {
    if (this.readonly) return;

    if (this.minDate && value < this.minDate) {
      this._focusedDay = this.minDate;
    } else if (this.maxDate && value > this.maxDate) {
      this._focusedDay = this.maxDate;
    } else this._focusedDay = value;

    this.getDayElement(this._focusedDay)!.focus();
  }

  @state()
  get focusedDay() {
    return this._focusedDay;
  }

  @query('sl-dropdown')
  dropdown: SlDropdown;

  @queryAll('td.day')
  days: NodeListOf<HTMLTableCellElement>;

  @queryAll('td.month')
  months: NodeListOf<HTMLTableCellElement>;

  @queryAll('td.year')
  years: NodeListOf<HTMLTableCellElement>;

  @query('.prev-button')
  prevButton: SlButton;

  @query('.next-button')
  nextButton: SlButton;

  @query('.months-button')
  selectMonthButton: SlButton;

  @query('.years-button')
  selectYearButton: SlButton;

  @state()
  calendarDays: CalendarDate[] = [];

  @state()
  isSelectionActive: boolean = false;

  @state()
  activeView: 'months' | 'years' | 'calendar' = 'calendar';

  @state()
  hoveredDay?: Date;

  /** Language for locale date format. */
  @property({ type: String, reflect: true })
  lang: string = 'en-US';

  /** Selected month (MM). */
  @property({ type: Number, reflect: true })
  month: number = new Date().getMonth() + 1;

  /** Selected year (YYY) */
  @property({ type: Number })
  year: number = new Date().getFullYear();

  /** Calendar maximum displayed date (YYY-MM-DD). */
  @property({
    type: Object,
    attribute: 'max-date',
    converter: attributeToDate
  })
  maxDate?: Date;

  /** Calendar minimum displayed date (YYY-MM-DD). */
  @property({
    type: Object,
    attribute: 'min-date',
    converter: attributeToDate
  })
  minDate?: Date;

  /** Selected start date (YYY-MM-DD). */
  @property({
    type: String,
    attribute: 'start-date',
    converter: attributeToDate,
    reflect: true
  })
  startDate: Date = new Date();

  /** Selected end date (YYY-MM-DD) when rage attribute is set. */
  @property({
    type: Object,
    attribute: 'end-date',
    converter: attributeToDate
  })
  endDate?: Date;

  /** Enable date range selection, multiple dates. */
  @property({ type: Boolean })
  range: boolean = false;

  /** Day of the week to start the calendar defaults to 0 (Sunday). */
  @property({ type: Number, attribute: 'first-day-of-week' })
  firstDayOfWeek: number = 0;

  /** Highlight the current day. */
  @property({ type: Boolean })
  today: boolean = false;

  /** Display mode (inline or dropdown). */
  @property({ reflect: true })
  display: 'inline' | 'dropdown' = 'inline';

  /** Display calenendar in read only mode. */
  @property({ type: Boolean })
  readonly: boolean = false;

  @watch('endDate', { waitUntilFirstUpdate: true })
  async handleEndDateChange() {
    await this.updateComplete;
    if (this.display === 'dropdown' && this.range && this.endDate) {
      this.dropdown.hide();
    }
  }

  @watch('startDate', { waitUntilFirstUpdate: true })
  async handleStartDateChange() {
    await this.updateComplete;
    if (this.display === 'dropdown' && !this.range) {
      this.dropdown.hide();
    }
  }

  connectedCallback() {
    super.connectedCallback();

    calendar = new CalendarView({ firstDayOfWeek: this.firstDayOfWeek });
    this.locale = new CalendarLocale(this.firstDayOfWeek, this.lang);
    this.calendarDays = calendar.createCalendar(this.year, this.month);

    if (this.display === 'dropdown') {
      this.addEventListener('sl-after-show', () => this.firstFocusElement());
    }
  }

  firstUpdated() {
    if (this.display === 'inline') this.firstFocusElement();
  }

  private getDayElement(date: Date): HTMLTableCellElement | undefined {
    if (this.readonly) return;
    return [...this.days].find(
      element => CalendarUtils.compare(CalendarUtils.getDateObject(element.getAttribute('date')!), date) === 0
    );
  }

  private getMonthElement(month: number): HTMLTableCellElement | undefined {
    if (this.readonly) return;
    return [...this.months].find(element => element.getAttribute('month')! === month.toString());
  }

  private getYearElement(year: number): HTMLTableCellElement | undefined {
    if (this.readonly) return;
    return [...this.years].find(element => element.getAttribute('year')! === year.toString());
  }

  private firstFocusElement() {
    const date = CalendarUtils.getCalendarDay(this.startDate);
    if (date.month !== this.month || date.year !== this.year) {
      this.setDate(
        CalendarUtils.getDateObject({
          year: this.year,
          month: this.month - 1,
          day: 1
        })
      );
    } else {
      this.setDate(this.startDate);
    }
  }

  private handleDayClick(day: CalendarDate) {
    const date = CalendarUtils.getDateObject(day);
    this.setDate(date);

    if (this.range) {
      this.handleRangeSelection(date);
    } else {
      this.startDate = date;
      emit<Date>(this, 'sl-date-selected', { detail: CalendarUtils.getDateObject(day) });
    }
  }

  private handleRangeSelection(date: Date) {
    this.isSelectionActive = !this.isSelectionActive;

    // multiple days selection
    if (this.isSelectionActive) {
      this.startDate = date;
      this.hoveredDay = date;
      this.endDate = undefined;

      emit<Date>(this, 'sl-date-selected', { detail: this.startDate });
    } else {
      // swap calendar dates
      // start-date <> end-date when required
      if (this.startDate > date) {
        this.endDate = this.startDate;
        this.startDate = date;
      } else this.endDate = date;

      this.hoveredDay = undefined;

      emit<{ start: Date; end: Date; range: Date[] }>(this, 'sl-range-selected', {
        detail: {
          start: this.startDate,
          end: this.endDate,
          range: CalendarUtils.getDaysInRange(this.startDate, this.endDate)
        }
      });
    }
  }

  private handleActiveView(view: string) {
    if (!this.readonly) {
      this.activeView = view as any;

      this.updateComplete.then(() => {
        if (this.activeView === 'months') this.getMonthElement(this.month)!.focus();
        else if (this.activeView === 'years') this.getYearElement(this.year)!.focus();
      });
    }
  }

  private handleDayHover(day: CalendarDate) {
    if (this.range) this.hoveredDay = this.isSelectionActive ? CalendarUtils.getDateObject(day) : undefined;
  }

  private handleMonthClick(month: number) {
    if (!this.readonly) {
      const date = CalendarUtils.createDate(this.year, month, this.focusedDay.getDate());
      this.setDate(date);
      this.activeView = 'calendar';
    }
  }

  private handleYearClick(year: number) {
    if (!this.readonly) {
      const date = CalendarUtils.createDate(year, this.month, this.focusedDay.getDate());
      this.setDate(date);
      this.activeView = 'calendar';
    }
  }

  private handleMonthsNavigation(e: KeyboardEvent, month: number) {
    const date = new Date(this.year, month - 1, 1);

    let key = e.key;
    let handled = true;

    if (e.code === 'Space') key = e.code;
    if (key === 'Tab') {
      this.prevButton.focus();
      e.preventDefault();
      return;
    }

    // KEYBOARD SUPPORT
    // Space, Enter: Selects a month, closes the view.
    // Arrow up: Moves focus three months before the current month.
    // Arrow down: Moves focus three months after the current month.
    // Arrow right: Moves focus to the next month.
    // Arrow left: Moves focus to the previous month.
    let nextDate: Date;
    switch (key) {
      case 'ArrowRight':
        nextDate = CalendarUtils.addMonths(date, 1);
        break;
      case 'ArrowLeft':
        nextDate = CalendarUtils.addMonths(date, -1);
        break;
      case 'ArrowDown':
        nextDate = CalendarUtils.addMonths(date, 3);
        break;
      case 'ArrowUp':
        nextDate = CalendarUtils.addMonths(date, -3);
        break;
      case 'Enter':
      case 'Space':
        nextDate = date;
        break;
      default:
        nextDate = new Date();
        handled = false;
    }

    if (handled) {
      e.preventDefault();
      const nextFocusedDate = CalendarUtils.addDays(nextDate, this.focusedDay.getDate() - 1, true);

      if (!this.isDisabledDate(CalendarUtils.getCalendarDay(nextFocusedDate))) {
        if (e.key === 'Enter' || e.key === 'Space') {
          this.setDate(nextFocusedDate);
          this.activeView = 'calendar';
          this.updateComplete.then(() => (this.hoveredDay = nextFocusedDate));
        } else {
          this.getMonthElement(nextDate.getMonth() + 1)!.focus();
        }
      }
    }
  }

  private handleYearsNavigation(e: KeyboardEvent, year: number) {
    const date = new Date(year, this.month - 1, 1);

    let key = e.key;
    let handled = true;

    if (e.code === 'Space') key = e.code;
    if (key === 'Tab') {
      this.prevButton.focus();
      e.preventDefault();
      return;
    }

    // KEYBOARD SUPPORT
    // Space, Enter: Selects a year, closes the view.
    // Arrow up: Moves focus three years before the current year.
    // Arrow down: Moves focus three years after the current year.
    // Arrow right: Moves focus to the next year.
    // Arrow left: Moves focus to the previous year.
    let nextDate: Date;
    switch (key) {
      case 'ArrowRight':
        nextDate = CalendarUtils.addYears(date, 1);
        break;
      case 'ArrowLeft':
        nextDate = CalendarUtils.addYears(date, -1);
        break;
      case 'ArrowDown':
        nextDate = CalendarUtils.addYears(date, 3);
        break;
      case 'ArrowUp':
        nextDate = CalendarUtils.addYears(date, -3);
        break;
      case 'Enter':
      case 'Space':
        nextDate = date;
        break;
      default:
        nextDate = new Date();
        handled = false;
    }

    if (handled) {
      e.preventDefault();
      const nextFocusedDate = CalendarUtils.addDays(nextDate, this.focusedDay.getDate() - 1, true);

      if (!this.isDisabledDate(CalendarUtils.getCalendarDay(nextFocusedDate))) {
        if (e.key === 'Enter' || e.key === 'Space') {
          this.setDate(nextFocusedDate);
          this.activeView = 'calendar';
          this.updateComplete.then(() => (this.hoveredDay = nextFocusedDate));
        } else {
          const minYear = this.year - 11;
          if (nextDate.getFullYear() < minYear || nextDate.getFullYear() > this.year) {
            this.setDate(nextFocusedDate);
            this.updateComplete.then(() => this.getYearElement(nextDate.getFullYear())!.focus());
          } else this.getYearElement(nextDate.getFullYear())!.focus();
        }
      }
    }
  }

  private handleDaysNavigation(e: KeyboardEvent, day: CalendarDate) {
    const date = CalendarUtils.getDateObject(day);

    let key = e.key;
    let handled = true;

    if (e.code === 'Space') key = e.code;
    if (key === 'Tab') {
      this.prevButton.focus();
      e.preventDefault();
      return;
    }

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
    let nextDate: Date;
    switch (key) {
      case 'ArrowRight':
        nextDate = CalendarUtils.addDays(date, 1);
        break;
      case 'ArrowLeft':
        nextDate = CalendarUtils.addDays(date, -1);
        break;
      case 'ArrowDown':
        nextDate = CalendarUtils.addDays(date, 7);
        break;
      case 'ArrowUp':
        nextDate = CalendarUtils.addDays(date, -7);
        break;
      case 'PageUp':
        nextDate = CalendarUtils.addMonths(date, -1);
        break;
      case 'PageDown':
        nextDate = CalendarUtils.addMonths(date, 1);
        break;
      case 'Home':
        nextDate = CalendarUtils.getStartOfWeek(date, this.firstDayOfWeek);
        break;
      case 'End':
        nextDate = CalendarUtils.getEndOfWeek(date, this.firstDayOfWeek);
        break;
      case 'Enter':
      case 'Space':
        nextDate = date;
        if (this.range) {
          console.log('rangeeee');
          this.handleRangeSelection(nextDate);
        } else {
          this.startDate = nextDate;
          emit<Date>(this, 'sl-date-selected', { detail: nextDate });
        }
        break;
      default:
        nextDate = new Date();
        handled = false;
    }

    if (handled) {
      e.preventDefault();
      // prevent keyboard navigation on disabled days
      const nextFocusedDate = CalendarUtils.getCalendarDay(nextDate);

      if (!this.isDisabledDate(nextFocusedDate)) {
        this.setDate(nextDate);
        if (this.range && this.isSelectionActive) {
          console.log('porco dio range!');
          this.hoveredDay = nextDate;
        }
      }
    }
  }

  private handleComponentNavigation(e: KeyboardEvent) {
    const el = (e.target as HTMLElement).classList;

    if (e.key === 'Tab') {
      if (el.contains('prev-button')) this.selectMonthButton.focus();
      else if (el.contains('months-button')) this.selectYearButton.focus();
      else if (el.contains('years-button')) this.nextButton.focus();
      else if (el.contains('next-button')) this.getDayElement(this._focusedDay)!.focus();
      // else if (el.contains('day')) this.prevButton.focus();
    }

    if (e.key === 'Enter') {
      (e.target as SlButton).click();
      this.updateComplete.then(() => {
        if (el.contains('prev-button')) this.prevButton.focus();
        if (el.contains('next-button')) this.nextButton.focus();
      });
    }

    e.preventDefault();
  }

  private setDate(date: Date) {
    const currMonth = this.month;
    const currYear = this.year;

    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();

    if (this.month !== currMonth || this.year !== currYear) {
      this.calendarDays = calendar.createCalendar(this.year, this.month);
    }
    this.updateComplete.then(() => (this.focusedDay = date));
  }

  private prev(e: MouseEvent) {
    e.preventDefault();

    const date =
      this.activeView === 'years'
        ? CalendarUtils.addYears(this.focusedDay, -1)
        : CalendarUtils.addMonths(this.focusedDay, -1);

    if (this.minDate !== undefined && CalendarUtils.compare(date, this.minDate) === -1) {
      if (!this.isSelectionActive) this.setDate(this.minDate);
    } else this.setDate(date);
  }

  private next(e: MouseEvent) {
    e.preventDefault();

    const date =
      this.activeView === 'years'
        ? CalendarUtils.addYears(this.focusedDay, 1)
        : CalendarUtils.addMonths(this.focusedDay, 1);

    if (this.maxDate !== undefined && CalendarUtils.compare(date, this.maxDate) === 1) {
      if (!this.isSelectionActive) this.setDate(this.maxDate);
    } else this.setDate(date);
  }

  private isDateInRange(day: CalendarDate) {
    if (this.range && this.hoveredDay && this.isSelectionActive) {
      const date = CalendarUtils.getDateObject(day);

      if (!this.startDate || !this.hoveredDay) return false;
      if (this.startDate > this.hoveredDay) {
        return date < this.startDate && date > this.hoveredDay;
      }
      return date > this.startDate && date < this.hoveredDay;
    }
    return false;
  }

  private isToday(day: CalendarDate): boolean {
    if (!this.today) return false;
    const today = new Date();
    return CalendarUtils.compare(day, today) === 0;
  }

  private isStartDate(day: CalendarDate): boolean {
    return CalendarUtils.compare(day, this.startDate) === 0;
  }

  private isEndDate(day: CalendarDate): boolean {
    if (!this.endDate) return false;
    return CalendarUtils.compare(day, this.endDate) === 0;
  }

  private isSelectedDate(day: CalendarDate): boolean {
    return CalendarUtils.inRange(CalendarUtils.getDateObject(day), this.startDate, this.endDate);
  }

  private isDisabledDate(day: CalendarDate): boolean {
    if (!this.minDate || !this.maxDate) return false;
    return CalendarUtils.compare(day, this.minDate) === -1 || CalendarUtils.compare(this.maxDate, day) === -1;
  }

  private chunk<T>(array: T[], size: number): T[][] {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }

    return result;
  }

  // private getCalendarHeaderView(): string {
  //   if (this.range) {
  //     return `${this.startDate.getDate()}${this.endDate ? '-' + this.endDate.getDate() + ' ' : ''}`;
  //   } else return `${this.startDate.getDate()} `;
  // }

  private getCalendarWeekDaysView(): TemplateResult[] {
    return this.locale.getDayNames().map(name => html`<td class="week-day" aria-label="${name}">${name}</td>`);
  }

  private getCalendarMonthsView(): TemplateResult {
    return html`
      <div class="grid months">
        <table>
          ${this.chunk(this.locale.getMonths(), 3).map(
            month =>
              html`<tr>
                ${repeat(
                  month,
                  month => html` <td
                    tabindex="-1"
                    month=${month.number}
                    class=${classMap({
                      month: true,
                      selected: this.month === month.number,
                      disabled: this.isDisabledDate(CalendarUtils.getCalendarDay(new Date(this.year, month.number, 1)))
                    })}
                    @click=${() => this.handleMonthClick(month.number)}
                    @keydown=${(e: KeyboardEvent) => this.handleMonthsNavigation(e, month.number)}
                  >
                    ${month.name}
                  </td>`
                )}
              </tr>`
          )}
        </table>
      </div>
    `;
  }

  private getCalendarYearsView(): TemplateResult {
    return html`
      <div class="grid years">
        <table>
          ${this.chunk([...Array(12).keys()].reverse(), 3).map(
            index =>
              html`<tr>
                ${repeat(
                  index,
                  index => html` <td
                    tabindex="-1"
                    year=${this.year - index}
                    class=${classMap({
                      year: true,
                      selected: this.year === this.year - index,
                      disabled: this.isDisabledDate(
                        CalendarUtils.getCalendarDay(new Date(this.year - index, this.month, 1))
                      )
                    })}
                    @click=${() => this.handleYearClick(this.year - index)}
                    @keydown=${(e: KeyboardEvent) => this.handleYearsNavigation(e, this.year - index)}
                  >
                    ${this.year - index}
                  </td>`
                )}
              </tr>`
          )}
        </table>
      </div>
    `;
  }

  private getCalendarView(): TemplateResult {
    switch (this.activeView) {
      case 'months':
        return this.getCalendarMonthsView();
      case 'years':
        return this.getCalendarYearsView();
      case 'calendar':
        return html``;
    }
  }

  private getCalendarDaysView(): TemplateResult {
    return html`
      <div class="date-picker-wrap">
        ${this.getCalendarView()}
        <div class=${classMap({ grid: true, hidden: this.activeView !== 'calendar' })}>
          <table aria-labelledby="${this.month} ${this.year}">
            <tr>
              ${this.getCalendarWeekDaysView()}
            </tr>
            ${this.chunk(this.calendarDays, 7).map(
              week =>
                html`<tr>
                  ${repeat(
                    week,
                    day => html` <td
                      tabindex="-1"
                      date=${CalendarUtils.getDateString(day)}
                      class=${classMap({
                        day: true,
                        today: this.isToday(day),
                        start: this.isStartDate(day),
                        end: this.isEndDate(day),
                        selected: this.isSelectedDate(day),
                        disabled: this.isDisabledDate(day),
                        range: this.isDateInRange(day),
                        readonly: this.readonly,
                        'sibling-months': day.siblingMonth!
                      })}
                      @click=${() => this.handleDayClick(day)}
                      @mouseover=${() => this.handleDayHover(day)}
                      @keydown=${(e: KeyboardEvent) => this.handleDaysNavigation(e, day)}
                    >
                      ${day.day}
                    </td>`
                  )}
                </tr>`
            )}
          </table>
        </div>
      </div>
    `;
  }

  render() {
    const datepicker = html`
      <div
        class="container"
        class=${classMap({
          container: true,
          inline: this.display === 'inline',
          dropdown: this.display === 'dropdown',
          readonly: this.readonly
        })}
        aria-disabled=${this.readonly ? 'true' : 'false'}
      >
        <div class="header-wrap" @keydown=${this.handleComponentNavigation}>
          ${!this.readonly
            ? html` <sl-button class="prev-button" type="primary" @click=${this.prev}>
                <sl-icon library="system" name="chevron-compact-left"></sl-icon>
              </sl-button>`
            : ''}
          <div class="header">
            <sl-button-group>
              <sl-button class="months-button" type="primary" @click=${() => this.handleActiveView('months')}>
                ${this.locale.getMonthName(this.month, 'long')}
              </sl-button>
              <sl-button class="years-button" type="primary" @click=${() => this.handleActiveView('years')}>
                ${this.year}
              </sl-button>
            </sl-button-group>
          </div>
          ${!this.readonly
            ? html` <sl-button class="next-button" type="primary" @click=${this.next}>
                <sl-icon library="system" name="chevron-compact-right"></sl-icon>
              </sl-button>`
            : ''}
        </div>
        ${this.getCalendarDaysView()}
      </div>
    `;

    // date picker inline
    if (this.display !== 'dropdown') return datepicker;
    else {
      // date picker dropdown
      return html`
        <slot></slot>
        <sl-dropdown distance="5" placement="bottom-end" .containing-element=${this}>
          <sl-button exportparts="base:trigger-button" type="default" size="medium" slot="trigger">
            <sl-icon name=${this.range ? 'calendar4-range' : 'calendar3'} library="system"> </sl-icon>
          </sl-button>
          ${datepicker}
        </sl-dropdown>
      `;
    }
  }
}
