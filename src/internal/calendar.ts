export interface CalendarDay {
  date: Date;
  isToday: boolean;
  isWeekday: boolean;
  isWeekend: boolean;
  isCurrentMonth: boolean;
  isPreviousMonth: boolean;
  isNextMonth: boolean;
}

export interface CalendarGridOptions {
  weekStartsWith: 'sunday' | 'monday';
}

/** Generates a calendar grid. Month should be 1-12, not 0-11. */
export function generateCalendarGrid(year: number, month: number, options?: Partial<CalendarGridOptions>) {
  const weekStartsWith = options?.weekStartsWith || 'sunday';
  const today = new Date();
  const dayThisMonthStartsWith = new Date(year, month - 1, 1).getDay();
  const lastDayOfMonth = new Date(year, month, 0).getDate();
  const lastDayOfPreviousMonth =
    month === 1 ? new Date(year - 1, 1, 0).getDate() : new Date(year, month - 1, 0).getDate();
  const dayGrid: CalendarDay[] = [];
  let day = 1;

  do {
    const date = new Date(year, month - 1, day);
    let dayOfWeek = new Date(year, month - 1, day).getDay();

    if (weekStartsWith === 'sunday') {
      //
      // TODO
      //
    }

    // Days in the previous month
    if (day === 1) {
      let lastMonthDay = lastDayOfPreviousMonth - dayThisMonthStartsWith + 1;
      for (let i = 0; i < dayThisMonthStartsWith; i++) {
        const dayOfLastMonth = new Date(year, month - 2, lastMonthDay);

        dayGrid.push({
          date: dayOfLastMonth,
          isToday: isSameDay(dayOfLastMonth, today),
          isWeekday: isWeekday(dayOfLastMonth),
          isWeekend: isWeekend(dayOfLastMonth),
          isCurrentMonth: false,
          isPreviousMonth: true,
          isNextMonth: false
        });

        lastMonthDay++;
      }
    }

    dayGrid.push({
      date,
      isToday: isSameDay(date, today),
      isWeekday: isWeekday(date),
      isWeekend: isWeekend(date),
      isCurrentMonth: true,
      isPreviousMonth: false,
      isNextMonth: false
    });

    // Days in the next month
    if (day === lastDayOfMonth) {
      let nextMonthDay = 1;
      for (dayOfWeek; dayOfWeek < 6; dayOfWeek++) {
        const dayOfNextMonth = new Date(year, month, nextMonthDay);

        dayGrid.push({
          date: dayOfNextMonth,
          isToday: isSameDay(dayOfNextMonth, today),
          isWeekday: isWeekday(dayOfNextMonth),
          isWeekend: isWeekend(dayOfNextMonth),
          isCurrentMonth: false,
          isPreviousMonth: false,
          isNextMonth: true
        });

        nextMonthDay++;
      }
    }

    day++;
  } while (day <= lastDayOfMonth);

  return dayGrid;
}

/** Generates a localized array of day names. */
export function getAllDayNames(locale = 'en', format: Intl.DateTimeFormatOptions['weekday'] = 'long') {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: format, timeZone: 'UTC' });
  const days = [1, 2, 3, 4, 5, 6, 7].map(day => {
    const dd = day < 10 ? `0${day}` : day;
    return new Date(`2017-01-${dd}T00:00:00+00:00`);
  });
  return days.map(date => formatter.format(date));
}

/** Generates a localized array of month names. */
export function getAllMonthNames(locale = 'en', format: Intl.DateTimeFormatOptions['month'] = 'long') {
  const formatter = new Intl.DateTimeFormat(locale, { month: format, timeZone: 'UTC' });
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => {
    const mm = month < 10 ? `0${month}` : month;
    return new Date(`2017-${mm}-01T00:00:00+00:00`);
  });
  return months.map(date => formatter.format(date));
}

/** Determines if two dates are the same day. */
export function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/** Determines if the date is a weekend. */
export function isWeekend(date: Date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

/** Determines if the date is a weekday. */
export function isWeekday(date: Date) {
  const day = date.getDay();
  return day > 0 && day < 6;
}

/** Returns a localized, human-readable day name. */
export function getDayName(date: Date, locale = 'en', format: Intl.DateTimeFormatOptions['weekday'] = 'long') {
  return getAllDayNames(locale, format)[date.getDate() - 1];
}

/** Returns a localized, human-readable month name. */
export function getMonthName(date: Date, locale = 'en', format: Intl.DateTimeFormatOptions['month'] = 'long') {
  return getAllMonthNames(locale, format)[date.getMonth()];
}
