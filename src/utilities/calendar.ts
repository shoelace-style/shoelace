export interface CalendarDate {
  day: number;
  month: number;
  year: number;
  siblingMonth?: boolean;
  weekDay?: number;
  weekNumber?: number;
}

export interface CalendarOptions {
  siblingMonths?: boolean;
  weekNumbers?: boolean;
  firstDayOfWeek?: number;
  disabledDates?: CalendarDate[];
}

export class CalendarView {
  month: number;
  year: number;
  siblingMonths: boolean;
  weekNumbers: boolean;
  firstDayOfWeek: number;
  disabledDates: CalendarDate[];

  constructor({
    siblingMonths = true,
    weekNumbers = true,
    firstDayOfWeek = 0,
    disabledDates = []
  }: CalendarOptions = {}) {
    this.siblingMonths = siblingMonths;
    this.weekNumbers = weekNumbers;
    this.firstDayOfWeek = firstDayOfWeek;
    this.disabledDates = disabledDates;
  }

  createCalendar(year: number, month: number): CalendarDate[] {
    month -= 1; // Month [0-11]

    const date = new Date(Date.UTC(year, month, 1, 0, 0, 0, 0));

    this.year = date.getUTCFullYear();
    this.month = date.getUTCMonth();

    const calendar = [] as CalendarDate[];
    const firstDay = date.getUTCDay();
    const firstDate = -((7 - this.firstDayOfWeek + firstDay) % 7);
    const lastDate = CalendarUtils.getDaysInMonth(year, month);
    const lastDay = (lastDate - firstDate) % 7;
    const lastDatePreviousMonth = CalendarUtils.getDaysInMonth(year, month - 1);

    let i = firstDate;
    let calendarDate = {} as CalendarDate;
    let currentDay = 0;
    let currentDate = 0;
    let otherMonth: number | undefined;
    let otherYear: number | undefined;
    let currentWeekNumber: number | undefined;

    var maxDays = lastDate - i + (lastDay !== 0 ? 7 - lastDay : 0) + firstDate;

    // always generates 6 weeks for all months
    // to fill the gap with the days
    // inside nearest months
    if (this.siblingMonths) {
      maxDays += 42 - (maxDays + Math.abs(i));
    }

    while (i < maxDays) {
      currentDate = i + 1;
      currentDay = ((i < 1 ? 7 + i : i) + firstDay) % 7;
      if (currentDate < 1 || currentDate > lastDate) {
        if (this.siblingMonths) {
          if (currentDate < 1) {
            otherMonth = month - 1;
            otherYear = year;
            if (otherMonth < 0) {
              otherMonth = 11;
              otherYear--;
            }
            currentDate = lastDatePreviousMonth + currentDate;
          } else if (currentDate > lastDate) {
            otherMonth = month + 1;
            otherYear = year;
            if (otherMonth > 11) {
              otherMonth = 0;
              otherYear++;
            }
            currentDate = i - lastDate + 1;
          }

          if (otherMonth && otherYear) {
            calendarDate = {
              day: currentDate,
              weekDay: currentDay,
              month: otherMonth + 1,
              year: otherYear!,
              siblingMonth: true
            };
          }
        }
      } else {
        calendarDate = {
          day: currentDate,
          weekDay: currentDay,
          month: month + 1,
          year: year
        };
      }

      if (calendarDate && this.weekNumbers) {
        if (currentWeekNumber === undefined) {
          currentWeekNumber = CalendarUtils.getWeekNumber(CalendarUtils.getDateObject(calendarDate));
        } else if (currentDay === 1 && currentWeekNumber === 52) {
          currentWeekNumber = 1;
        } else if (currentDay === 1) {
          currentWeekNumber++;
        }
        calendarDate.weekNumber = currentWeekNumber;
      }

      calendar.push(calendarDate);
      i++;
    }

    return calendar;
  }
}

export class CalendarUtils {
  /**
   * @param   dateLeft   Left `CalendarDate` object
   * @param   dateRight  Right `CalendarDate` object
   * @return  Comparison result:
   *          -1 (left < right)
   *          0 (equal)
   *          1 (left > right)
   */
  static compare(dateLeft: CalendarDate | Date, dateRight: CalendarDate | Date) {
    if (dateLeft instanceof Date) dateLeft = this.getCalendarDay(dateLeft);
    if (dateRight instanceof Date) dateRight = this.getCalendarDay(dateRight);

    if (dateLeft.year < dateRight.year) return -1;
    if (dateLeft.year > dateRight.year) return 1;
    if (dateLeft.month < dateRight.month) return -1;
    if (dateLeft.month > dateRight.month) return 1;
    if (dateLeft.day < dateRight.day) return -1;
    if (dateLeft.day > dateRight.day) return 1;

    return 0;
  }

  static addDays(date: Date, days: number): Date {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + days));
  }

  static addMonths(date: Date, amount: number, enforceEndOfMonth = true): Date {
    const totalMonths = date.getMonth() + amount;
    let year = date.getFullYear() + Math.floor(totalMonths / 12);
    let month = totalMonths % 12;
    let day = date.getDate();

    if (month < 0) month = (month + 12) % 12;
    const maxDayOfMonth = this.getDaysInMonth(year, month);

    if (enforceEndOfMonth) {
      day = Math.min(maxDayOfMonth, day);
    } else if (day > maxDayOfMonth) {
      day = day - maxDayOfMonth;
      year = year + Math.floor((month + 1) / 12);
      month = (month + 1) % 12;
    }
    return new Date(year, month, day);
  }

  static addYears(date: Date, years: number): Date {
    let d = new Date(date);
    d.setFullYear(date.getFullYear() + years);
    return d;
  }

  static nextMonth(year: number, month: number, day: number): Date {
    let max = this.getDaysInMonth(year, month);
    return new Date(year, month, day > max ? 1 : day);
  }

  static prevMonth(year: number, month: number, day: number): Date {
    let max = this.getDaysInMonth(year, month - 2);
    return new Date(year, month - 2, day > max ? 1 : day);
  }

  static getStartOfWeek(date: Date, firstDayOfWeek: number = 0): Date {
    let d = new Date(date);
    let day = d.getDay();
    let diff = (day < firstDayOfWeek ? 7 : 0) + day - firstDayOfWeek;

    d.setDate(d.getDate() - diff);
    return d;
  }

  static getEndOfWeek(date: Date, firstDayOfWeek: number = 0): Date {
    let d = new Date(date);
    let day = d.getDay();
    let diff = (day < firstDayOfWeek ? -7 : 0) + 6 - (day - firstDayOfWeek);

    d.setDate(d.getDate() + diff);
    return d;
  }

  static getStartOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  static getEndOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  static setMonth(date: Date, month: number): Date {
    let d = new Date(date);
    d.setMonth(month);
    return d;
  }

  static setYear(date: Date, year: number): Date {
    let d = new Date(date);
    d.setFullYear(year);
    return d;
  }

  static getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  static getWeekNumber(date: Date): number {
    const current = date;
    const target = new Date(current.valueOf());

    // ISO week date weeks start on monday so correct the day number
    const dayNr = (current.getUTCDay() + 6) % 7;

    // ISO 8601 states that week 1 is the week with the first thursday of that
    // year. Set the target date to the thursday in the target week.
    target.setUTCDate(target.getUTCDate() - dayNr + 3);

    // Store the millisecond value of the target date
    const firstThursday = target.valueOf();

    // Set the target to the first thursday of the year

    // First set the target to january first
    target.setUTCMonth(0, 1);

    // Not a thursday? Correct the date to the next thursday
    if (target.getUTCDay() !== 4) {
      target.setUTCMonth(0, 1 + ((4 - target.getUTCDay() + 7) % 7));
    }

    // The week number is the number of weeks between the  first thursday of the
    // year and the thursday in the target week.
    // 604800000 = 7 * 24 * 3600 * 1000
    return 1 + Math.ceil((firstThursday - target.getTime()) / 604800000);
  }

  static inRange(date: Date, min?: Date, max?: Date): boolean {
    if (!min || !max) return false;

    const time = date.getTime();
    if (min && min instanceof Date && time < min.getTime()) {
      return false;
    }
    if (max && max instanceof Date && time > max.getTime()) {
      return false;
    }

    return true;
  }

  static getDaysInRange(start: Date, end: Date): Date[] {
    let days: Date[] = [];
    let current = start;

    while (this.compare(current, end) !== 0) {
      days.push(current);
      current = this.addDays(current, 1);
    }
    days.push(current);

    return days;
  }

  static getCalendarDay(date: Date | string): CalendarDate {
    if (date instanceof Date) {
      return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
      };
    }
    return this.parseDateFromString(date);
  }

  static getDateObject(date: CalendarDate | string): Date {
    if (date instanceof Object) {
      return new Date(date.year, date.month - 1, date.day);
    } else {
      const { year, month, day } = this.parseDateFromString(date);
      return new Date(year, month - 1, day);
    }
  }

  static getDateString(date: CalendarDate | Date) {
    if (date instanceof Date) {
      return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');
    }
    return [date.year, date.month, date.day].join('-');
  }

  static parseDateFromString(date: string): CalendarDate {
    const [year, month, day] = date.split('-').map(piece => parseInt(piece, 10));

    const isValid =
      Number.isInteger(year) && // all parts should be integers
      Number.isInteger(month) &&
      Number.isInteger(day) &&
      month > 0 && // month must be 1-12
      month <= 12 &&
      day > 0 && // day must be 1-31
      day <= 31 &&
      year > 0;

    if (isValid) {
      return { year, month, day } as CalendarDate;
    } else throw new Error('Invalid date format');
  }
}

export class CalendarLocale {
  private _firstDayOfWeek: number;
  private _lang: string;

  constructor(firstDayOfWeek: number = 0, lang: string = 'en-US') {
    this._firstDayOfWeek = firstDayOfWeek;
    this._lang = lang;
  }

  getDayNames = () => {
    const days = [...Array(7).keys()].map(d =>
      new Date(2017, 9, d + 1).toLocaleString(this._lang, { weekday: 'long' }).slice(0, 2)
    );

    for (let i = 6; i > 6 - this._firstDayOfWeek; i--) {
      const day = days.shift();
      if (day) days.push(day);
    }

    return days;
  };

  getMonthName(year: number, month: number): string {
    return new Date(year, month, 0).toLocaleString(this._lang, {
      month: 'long'
    });
  }
}
