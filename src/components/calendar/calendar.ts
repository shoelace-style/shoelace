import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import { generateCalendarGrid, getAllDayNames, getMonthName, isSameDay } from '../../internal/calendar.js';
import { HasSlotController } from '../../internal/slot.js';
import { html } from 'lit';
import { LocalizeController } from '../../utilities/localize.js';
import { partMap } from '../../internal/part-map.js';
import { watch } from '../../internal/watch.js';
import ShoelaceElement from '../../internal/shoelace-element.js';
import styles from './calendar.styles';
import type { CSSResultGroup, TemplateResult } from 'lit';

export interface RenderDayOptions {
  disabled?: boolean;
  content: string | TemplateResult;
}

/**
 * @summary A calendar prototype for Shoelace.
 * @documentation https://shoelace.style/components/calendar
 *
 * @since 2.0
 * @status experimental
 *
 * @dependency sl-example
 *
 * @event sl-change - Emitted when the date changes.
 *
 * @slot footer - Optional content to place in the calendar's footer.
 *
 * @csspart day - Targets day cells.
 * @csspart day-label - Targets the day labels (the name of the days in the grid).
 * @csspart day-weekend - Targets days that fall on weekends.
 * @csspart day-weekday - Targets weekdays.
 * @csspart day-current-month - Targets days in the current month.
 * @csspart day-previous-month - Targets days in the previous month.
 * @csspart day-next-month - Targets days in the next month.
 * @csspart day-today - Targets today.
 * @csspart day-selected - Targets selected days.
 * @csspart day-selection-start - Targets days that begin a selection.
 * @csspart day-selection-end - Targets days that end a selection.
 *
 * @cssproperty --border-color - The calendar's border color.
 * @cssproperty --border-width - The calendar's border width.
 * @cssproperty --border-radius - The border radius of the calendar.
 */
@customElement('sl-calendar')
export default class SlCalendar extends ShoelaceElement {
  static styles: CSSResultGroup = styles;

  private readonly localize = new LocalizeController(this);
  private readonly hasSlotController = new HasSlotController(this, 'prefix', 'suffix');

  /** The month to render, 1-12/ */
  @property({ type: Number, reflect: true }) month: number = new Date().getMonth() + 1;

  /** The year to render. */
  @property({ type: Number, reflect: true }) year: number = new Date().getFullYear();

  /** Determines how day labels are shown, e.g. "M", "Mon", or "Monday". */
  @property({ attribute: 'day-labels' }) dayLabels: 'narrow' | 'short' | 'long' = 'short';

  /** Determines how month labels are shown, e.g. "J", "Jan", or "January". */
  @property({ attribute: 'month-labels' }) monthLabels: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' = 'long';

  /** When true, dates from the previous and next month will also be shown to fill out the grid. */
  @property({ attribute: 'show-adjacent-dates', type: Boolean }) showAdjacentDates = false;

  /** Draws the target dates as a selection in the calendar. */
  @property({ type: Array }) selectedDates: Date[] = [];

  /** Moves the calendar to the current month and year. */
  goToToday() {
    this.month = new Date().getMonth() + 1;
    this.year = new Date().getFullYear();
  }

  /** Moves the calendar to the previous month. */
  goToPreviousMonth() {
    if (this.month === 1) {
      this.month = 12;
      this.year--;
    } else {
      this.month--;
    }
  }

  /** Moves the calendar to the next month. */
  goToNextMonth() {
    if (this.month === 12) {
      this.month = 1;
      this.year++;
    } else {
      this.month++;
    }
  }

  @watch('month')
  @watch('year')
  handleMonthChange() {
    this.emit('sl-change');
  }

  render() {
    if (this.month < 1 || this.month > 12) {
      throw new Error(`The value "${this.month}" is not a valid month.`);
    }

    const lang = this.lang || document.documentElement.lang;
    const month = new Date(this.year, this.month - 1, 1);
    const dayGrid = generateCalendarGrid(this.year, this.month);
    const dayNames = getAllDayNames(lang, this.dayLabels);

    //
    // TODO - December is not showing a label because the month is calculated as Sat Jan 01 2022 00:00:00 GMT-0500
    //

    return html`
      <div
        class=${classMap({
          calendar: true,
          'calendar--has-footer': this.hasSlotController.test('footer'),
          'calendar--show-adjacent-dates': this.showAdjacentDates
        })}
      >
        <header class="calendar__header">
          <sl-icon-button
            name="chevron-left"
            label=${this.localize.term('previousMonth')}
            @click=${this.goToPreviousMonth}
          ></sl-icon-button>

          <span class="calendar__label">
            <span class="calendar__month-label">${getMonthName(month, lang, this.monthLabels)}</span>
            <span class="calendar__year-label">${month.getFullYear()}</span>
          </span>

          <sl-icon-button
            name="chevron-right"
            label=${this.localize.term('nextMonth')}
            @click=${this.goToNextMonth}
          ></sl-icon-button>
        </header>

        <div class="calendar__days">
          ${[0, 1, 2, 3, 4, 5, 6].map(day => {
            return html`
              <span
                part=${partMap({
                  day: true,
                  'day-label': true,
                  'day-weekday': day > 0 && day < 6,
                  'day-weekend': day === 0 || day === 6
                })}
                class="calendar__day"
              >
                ${dayNames[day]}
              </span>
            `;
          })}
          ${dayGrid.map((day, index) => {
            if (day.isCurrentMonth || this.showAdjacentDates) {
              const isSelected = Array.isArray(this.selectedDates)
                ? this.selectedDates.some(d => isSameDay(d, day.date))
                : false;
              const previousDay = index > 0 ? dayGrid[index - 1] : null;
              const nextDay = index < dayGrid.length - 1 ? dayGrid[index + 1] : null;
              const isSelectionStart =
                isSelected && previousDay ? !this.selectedDates.some(d => isSameDay(d, previousDay.date)) : false;
              const isSelectionEnd =
                isSelected && nextDay ? !this.selectedDates.some(d => isSameDay(d, nextDay.date)) : false;

              return html`
                <button
                  type="button"
                  part=${partMap({
                    day: true,
                    'day-current-month': day.isCurrentMonth,
                    'day-previous-month': day.isPreviousMonth,
                    'day-next-month': day.isNextMonth,
                    'day-today': day.isToday,
                    'day-weekday': day.isWeekday,
                    'day-weekend': day.isWeekend,
                    'day-selected': isSelected,
                    'day-selection-start': isSelectionStart,
                    'day-selection-end': isSelectionEnd
                  })}
                  class="calendar__day"
                >
                  ${day.date.getDate()}
                </button>
              `;
            }

            return html` <div class="calendar__day calendar__day--empty"></div> `;
          })}
        </div>

        <footer class="calendar__footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-calendar': SlCalendar;
  }
}
