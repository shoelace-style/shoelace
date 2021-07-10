export interface CalendarDate {
  day: number;
  month: number;
  year: number;
  siblingMonth?: boolean;
  weekDay?: number;
  weekNumber?: number;
}

export interface CalendarOptions {
  weekNumbers?: boolean;
  firstDayOfWeek?: number;
}

export class CalendarView {
  month: number;
  year: number;
  weekNumbers: boolean;
  firstDayOfWeek: number;

  constructor({ weekNumbers = true, firstDayOfWeek = 0 }: CalendarOptions = {}) {
    this.weekNumbers = weekNumbers;
    this.firstDayOfWeek = firstDayOfWeek;
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
    maxDays += 42 - (maxDays + Math.abs(i));

    while (i < maxDays) {
      currentDate = i + 1;
      currentDay = ((i < 1 ? 7 + i : i) + firstDay) % 7;
      if (currentDate < 1 || currentDate > lastDate) {
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
        if (otherMonth !== undefined && otherYear !== undefined) {
          calendarDate = {
            day: currentDate,
            weekDay: currentDay,
            month: otherMonth + 1,
            year: otherYear!,
            siblingMonth: true
          };
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
   * Quickly compare two dates
   *
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

  /**
   * Calculates the difference between two dates (dateLeft - dateRight) in days
   *
   * @param   dateLeft   Date object
   * @param   dateRight  Date object
   * @return  Days between the dates
   */
  static diff(dateLeft: CalendarDate | Date, dateRight: CalendarDate | Date) {
    if (dateLeft instanceof Date) dateLeft = this.getCalendarDay(dateLeft);
    if (dateRight instanceof Date) dateRight = this.getCalendarDay(dateRight);

    const dateLeftDate = new Date(
      Date.UTC(dateLeft.year, dateLeft.month, dateLeft.day, 0, 0, 0, 0)
    );
    const dateRightDate = new Date(
      Date.UTC(dateRight.year, dateRight.month, dateRight.day, 0, 0, 0, 0)
    );
    return Math.ceil(
      (dateLeftDate.getTime() - dateRightDate.getTime()) / 86400000
    );
  }

  static createDate(year: number, month: number, day: number, enforceEndOfMonth = true) {
    let date = new Date(year, month - 1, 1);
    return this.dateAdd(date, 'day', day - 1, enforceEndOfMonth);
  }

  static addDays(date: Date, amount: number, enforceEndOfMonth = false): Date {
    return this.dateAdd(date, 'day', amount, enforceEndOfMonth);
  }

  static addMonths(date: Date, amount: number, enforceEndOfMonth = true): Date {
    return this.dateAdd(date, 'month', amount, enforceEndOfMonth);
  }

  static addYears(date: Date, amount: number, enforceEndOfMonth = true): Date {
    return this.dateAdd(date, 'year', amount, enforceEndOfMonth);
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

  private static dateAdd(date: Date, type: 'year' | 'month' | 'day', amount: number, enforceEndOfMonth: boolean): Date {
    let totalMonths = date.getMonth();
    let totalYears = date.getFullYear();
    let totalDays = date.getDate();

    switch (type) {
      case 'year':
        totalYears += amount;
        break;
      case 'month':
        totalMonths += amount;
        break;
      case 'day':
        totalDays += amount;
        break;
    }

    let year = totalYears + Math.floor(totalMonths / 12);
    let month = totalMonths % 12;
    let day = totalDays;

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
}

export type DateMonthFormat = 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
export type DateDayFormat = 'long' | 'short' | 'narrow';

export class CalendarLocale {
  private firstDayOfWeek: number;
  private lang: string;

  constructor(firstDayOfWeek: number = 0, lang: string = 'en-US') {
    this.firstDayOfWeek = firstDayOfWeek;
    this.lang = lang;
  }

  getDayNames = (format: DateDayFormat = 'long') => {
    const days = [...Array(7).keys()].map(d =>
      new Date(2017, 9, d + 1).toLocaleString(this.lang, { weekday: format }).slice(0, 2)
    );

    for (let i = 6; i > 6 - this.firstDayOfWeek; i--) {
      const day = days.shift();
      if (day) days.push(day);
    }

    return days;
  };

  getMonthName(month: number, format: DateMonthFormat = 'short'): string {
    return new Date(2017, month, 0).toLocaleString(this.lang, {
      month: format
    });
  }

  getMonths(format: DateMonthFormat = 'short'): Array<{ name: string; number: number }> {
    return [...Array(12).keys()].map(m => ({
      name: new Date(2017, m, 1).toLocaleString(this.lang, { month: format }),
      number: m + 1
    }));
  }
}
