import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, queryAll, state } from 'lit/decorators.js';
import { CalendarView, CalendarDate, CalendarLocale, CalendarUtils } from '../../utilities/calendar';
import { watch } from '../../internal/watch';
import { emit } from '../../internal/event';
import type SlDropdown from '../dropdown/dropdown';
import styles from 'sass:./datepicker.scss';

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
 * @slot - The default inputs container. Available only when display is 'dropdown'.
 *
 * @csspart trigger-button - The datepicker dropdown's trigger, usually a `<sl-button>` element.
 *
 * @customProperty --cell-inline-width - Cell width for inline datepicker
 * @customProperty --cell-inline-height - Cell width for inline datepicker
 * @customProperty --cell-dropdown-width - Cell width for dropdown datepicker
 * @customProperty --cell-dropdown-height - Cell width for dropdown datepicker
 */
@customElement('sl-datepicker')
export default class SlDatepicker extends LitElement {
  static styles = unsafeCSS(styles);

  private _locale: CalendarLocale;
  private _focusedDay: Date;

  // we use a custom setter to prevent update request from Lit
  // because set a focusable DOM element don't require an update
  set focusedDay(value: Date) {
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

  @state()
  calendarDays: CalendarDate[] = [];

  @state()
  isSelectionActive: boolean = false;

  @state()
  hoveredDay?: Date;

  @property({ type: String, reflect: true })
  lang: string = 'en-US';

  @property({ type: Number, reflect: true })
  month: number = new Date().getMonth() + 1;

  @property({ type: Number })
  year: number = new Date().getFullYear();

  @property({
    type: Object,
    attribute: 'max-date',
    converter: attributeToDate
  })
  maxDate?: Date;

  @property({
    type: Object,
    attribute: 'min-date',
    converter: attributeToDate
  })
  minDate?: Date;

  @property({
    type: String,
    attribute: 'start-date',
    converter: attributeToDate,
    reflect: true
  })
  startDate: Date = new Date();

  @property({
    type: Object,
    attribute: 'end-date',
    converter: attributeToDate
  })
  endDate?: Date;

  @property({ type: Boolean })
  range: boolean = false;

  @property({ type: Number, attribute: 'first-day-of-week' })
  firstDayOfWeek: number = 0;

  @property({ type: Boolean })
  today: boolean = false;

  @property({ reflect: true })
  display: 'inline' | 'dropdown' = 'inline';

  @property({ type: Boolean })
  readonly = false;

  @watch('endDate', { waitUntilFirstUpdate: true })
  async handleEndDateChange() {
    await this.updateComplete;
    if (this.display === 'dropdown' && this.range && this.endDate) {
      this.dropdown.hide();
    }
  }

  connectedCallback() {
    super.connectedCallback();

    calendar = new CalendarView({ firstDayOfWeek: this.firstDayOfWeek });
    this._locale = new CalendarLocale(this.firstDayOfWeek, this.lang);
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
      day => CalendarUtils.compare(CalendarUtils.getDateObject(day.getAttribute('date')!), date) === 0
    );
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

  private handleDayHover(day: CalendarDate) {
    if (this.range) this.hoveredDay = this.isSelectionActive ? CalendarUtils.getDateObject(day) : undefined;
  }

  private handleKeyboard(e: KeyboardEvent, day: CalendarDate) {
    const date = CalendarUtils.getDateObject(day);

    let key = e.key;
    let handled = true;

    if (e.code === 'Space') key = e.code;
    if (e.key === 'Tab') {
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
          this.handleRangeSelection(nextDate);
        } else {
          this.startDate = nextDate;
          emit<Date>(this, 'sl-date-selected', { detail: nextDate });
        }
        break;
      default:
        handled = false;
    }

    if (handled) {
      e.preventDefault();
      // prevent keyboard navigation on disabled days
      const nextFocusedDate = CalendarUtils.getCalendarDay(nextDate!);

      if (!this.isDisabledDate(nextFocusedDate)) {
        this.setDate(nextDate!);
        if (this.range && this.isSelectionActive) {
          this.hoveredDay = nextDate!;
        }
      }
    }
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

  private prevMonth() {
    const date = CalendarUtils.prevMonth(this.year, this.month, this.focusedDay.getDate());

    if (!this.minDate || date.getMonth() >= this.minDate.getMonth()) {
      if (!this.isSelectionActive) this.setDate(date);
    } else this.setDate(this.minDate);
  }

  private nextMonth() {
    const date = CalendarUtils.nextMonth(this.year, this.month, this.focusedDay.getDate());

    if (!this.maxDate || date.getMonth() <= this.maxDate.getMonth()) {
      if (!this.isSelectionActive) this.setDate(date);
    } else this.setDate(this.maxDate);
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

  private getHeaderView(): string {
    if (this.range) return `${this.startDate.getDate()}${this.endDate ? '-' + this.endDate.getDate() : ''}`;
    else return `${this.startDate.getDate()}`;
  }

  private getMonthTableView(): TemplateResult {
    return html`
      <div class="datepicker-wrap">
        <div class="grid">
          <table aria-labelledby="${this.month} ${this.year}">
            <tr>
              ${this._locale.getDayNames().map(name => html`<td class="week-day" aria-label="${name}">${name}</td>`)}
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
                      @keydown=${(e: KeyboardEvent) => this.handleKeyboard(e, day)}
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

  private getCalendarView(): TemplateResult {
    return html` <div class="header-wrap">
      <sl-icon class="prev-button" name="chevron-compact-left" @click=${this.prevMonth}></sl-icon>
      <div class="header">
        ${this.display === 'inline' ? html`<span class="week">${this.getHeaderView()}</span>` : ''}
        <span class="title"> ${this._locale.getMonthName(this.year, this.month)} ${this.year} </span>
      </div>
      <sl-icon class="next-button" name="chevron-compact-right" @click=${this.nextMonth}></sl-icon>
    </div>`;
  }

  render() {
    // console.log(`render: ${++count}`);

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
        ${this.getCalendarView()} ${this.getMonthTableView()}
      </div>
    `;

    // datepicker inline
    if (this.display !== 'dropdown') return datepicker;
    else {
      // datepicker dropdown
      return html`
        <slot></slot>
        <sl-dropdown distance="5" placement="bottom-end" .containing-element=${this}>
          <sl-button exportparts="base:trigger-button" type="default" size="medium" slot="trigger"
            ><sl-icon name=${this.range ? 'calendar4-range' : 'calendar3'}></sl-icon>
          </sl-button>
          ${datepicker}
        </sl-dropdown>
      `;
    }
  }
}
