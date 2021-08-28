import { compareDate, daysInMonth, diffDate, isBetween, weekNumber } from '../internal/date';

export interface CalendarDate {
  day: number;
  month: number;
  year: number;
  siblingMonth?: boolean;
  weekDay?: number;
  weekNumber?: number;
}

export class Calendar {
  startDate: Date;
  endDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  month: number;
  year: number;
  firstDayOfWeek: number;
  allowRange: boolean = false;
  maxRangeLength?: number;
  disabledDates?: Date[];
  locale: string;
  dateTimeFormat: Intl.DateTimeFormatOptions;

  constructor(
    firstDayOfWeek: number = 0,
    locale: string = 'en-US',
    dateTimeFormat: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'long' }
  ) {
    const date = new Date();

    this.firstDayOfWeek = firstDayOfWeek;
    this.locale = locale;
    this.dateTimeFormat = dateTimeFormat;
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();
  }

  createCalendar = (date: Date | { month: number; year: number }): CalendarDate[] => {
    let utcDate: Date;

    if (date instanceof Date) {
      utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0));
    } else {
      utcDate = new Date(Date.UTC(date.year, date.month - 1, 1, 0, 0, 0, 0));
    }

    const calendar = [] as CalendarDate[];
    const year = utcDate.getUTCFullYear();
    const month = utcDate.getUTCMonth();
    const firstDay = utcDate.getUTCDay();
    const firstDate = -((7 - this.firstDayOfWeek + firstDay) % 7);
    const lastDate = daysInMonth(year, month);
    const lastDay = (lastDate - firstDate) % 7;
    const lastDatePreviousMonth = daysInMonth(year, month - 1);

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
            month: otherMonth + 1,
            year: otherYear!,
            weekDay: currentDay,
            siblingMonth: true
          };
        }
      } else {
        calendarDate = {
          day: currentDate,
          month: month + 1,
          year: year,
          weekDay: currentDay
        };
      }

      if (currentWeekNumber === undefined) {
        currentWeekNumber = weekNumber(new Date(calendarDate.year, calendarDate.month - 1, calendarDate.day));
      } else if (currentDay === 1 && currentWeekNumber === 52) {
        currentWeekNumber = 1;
      } else if (currentDay === 1) {
        currentWeekNumber++;
      }
      calendarDate.weekNumber = currentWeekNumber;

      calendar.push(calendarDate);
      i++;
    }

    this.month = month + 1;
    this.year = year;

    return calendar;
  };

  isDateInRange = (date: Date, start: Date, end?: Date): boolean => {
    if (this.maxRangeLength && end) {
      let days = Math.abs(diffDate(start, end));
      if (days > this.maxRangeLength + 1) return false;
    }
    return isBetween(date, start, end);
  };

  isToday = (date: Date): boolean => {
    return compareDate(date, new Date()) === 0;
  };

  isStartDate = (date: Date): boolean => {
    return compareDate(date, this.startDate) === 0;
  };

  isEndDate = (date: Date): boolean => {
    if (!this.endDate) return false;
    return compareDate(date, this.endDate) === 0;
  };

  isDateOutsideLimits = (day: Date): boolean => {
    if (!this.minDate || !this.maxDate) return false;
    return compareDate(day, this.minDate) === -1 || compareDate(this.maxDate, day) === -1;
  };

  isDisabledMonth = (month: number): boolean => {
    if (!this.minDate || !this.maxDate) return false;
    return this.minDate.getMonth() > month - 1 || this.maxDate.getMonth() < month - 1;
  };

  isDisabledYear = (year: number): boolean => {
    if (!this.minDate || !this.maxDate) return false;
    return this.minDate.getFullYear() > year || this.maxDate.getFullYear() < year;
  };

  isDisabledDate = (date: Date): boolean => {
    if (this.disabledDates === undefined) return false;
    if (this.disabledDates?.some(d => compareDate(d, date) === 0)) return true;
    return false;
  };

  getDaysNames = (): string[] => {
    const days = [...Array(7).keys()].map(d =>
      new Date(2017, 9, d + 1).toLocaleString(this.locale, { weekday: this.dateTimeFormat.weekday }).slice(0, 2)
    );

    for (let i = 6; i > 6 - this.firstDayOfWeek; i--) {
      const day = days.shift();
      if (day) days.push(day);
    }

    return days;
  };

  getMonthsNames = (): Array<{ name: string; index: number }> => {
    return [...Array(12).keys()].map(m => ({
      name: new Date(2017, m, 1).toLocaleString(this.locale, { month: this.dateTimeFormat.month }),
      index: m + 1
    }));
  };

  getMonthName = (month: number): string => {
    return new Date(2021, month, 0).toLocaleString(this.locale, { month: this.dateTimeFormat.month });
  };

  convertToDate = (date: CalendarDate): Date => {
    return new Date(date.year, date.month - 1, date.day);
  };
}
