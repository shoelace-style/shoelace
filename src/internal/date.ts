export const parseDate = (date: string): Date => {
  const [year, month, day] = date.split('-').map(piece => parseInt(piece, 10));

  // validation against human date
  // month from 1 to 12 (js date month start from 0)
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
    return new Date(year, month - 1, day);
  } else throw new Error('Invalid date format');
};

/**
 * Quickly compare two dates
 *
 * @param   dateLeft   Left `DateObject` object
 * @param   dateRight  Right `DateObject` object
 * @return  Comparison result:
 *          -1 (left < right)
 *          0 (equal)
 *          1 (left > right)
 */
export const compareDate = (dateLeft: Date, dateRight: Date): number => {
  if (dateLeft.getFullYear() < dateRight.getFullYear()) return -1;
  if (dateLeft.getFullYear() > dateRight.getFullYear()) return 1;
  if (dateLeft.getMonth() < dateRight.getMonth()) return -1;
  if (dateLeft.getMonth() > dateRight.getMonth()) return 1;
  if (dateLeft.getDate() < dateRight.getDate()) return -1;
  if (dateLeft.getDate() > dateRight.getDate()) return 1;

  return 0;
};

/**
 * Calculates the difference between two dates (dateLeft - dateRight) in days
 *
 * @param   dateLeft   Date object
 * @param   dateRight  Date object
 * @return  Days between the dates
 */
export const diffDate = (dateLeft: Date, dateRight: Date): number => {
  const dateLeftDate = new Date(Date.UTC(dateLeft.getFullYear(), dateLeft.getMonth(), dateLeft.getDate(), 0, 0, 0, 0));
  const dateRightDate = new Date(
    Date.UTC(dateRight.getFullYear(), dateRight.getMonth(), dateRight.getDate(), 0, 0, 0, 0)
  );

  return Math.ceil((dateLeftDate.getTime() - dateRightDate.getTime()) / 86400000);
};

export const isBetween = (date: Date, min?: Date, max?: Date): boolean => {
  if (!min || !max) return false;
  if (min && min > max) return date < min && date > max;
  return date > min && date < max;
};

export const addDays = (date: Date, amount: number, enforceEndOfMonth = false): Date => {
  return addToDate(date, 'day', amount, enforceEndOfMonth);
};

export const addMonths = (date: Date, amount: number, enforceEndOfMonth = true): Date => {
  return addToDate(date, 'month', amount, enforceEndOfMonth);
};

export const addYears = (date: Date, amount: number, enforceEndOfMonth = true): Date => {
  return addToDate(date, 'year', amount, enforceEndOfMonth);
};

export const startOfWeek = (date: Date, firstDayOfWeek: number = 0): Date => {
  let d = new Date(date);
  let day = d.getDay();
  let diff = (day < firstDayOfWeek ? 7 : 0) + day - firstDayOfWeek;

  d.setDate(d.getDate() - diff);
  return d;
};

export const endOfWeek = (date: Date, firstDayOfWeek: number = 0): Date => {
  let d = new Date(date);
  let day = d.getDay();
  let diff = (day < firstDayOfWeek ? -7 : 0) + 6 - (day - firstDayOfWeek);

  d.setDate(d.getDate() + diff);
  return d;
};

export const startOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const endOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

export const weekNumber = (date: Date): number => {
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
};

export const daysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const datesRange = (start: Date, end: Date): Date[] => {
  let days: Date[] = [];
  let current = start;

  while (compareDate(current, end) !== 0) {
    days.push(current);
    current = addDays(current, 1);
  }
  days.push(current);

  return days;
};

export const attributeToDate = (value: string): Date | undefined => {
  if (!value) return;
  return parseDate(value);
};

const addToDate = (date: Date, type: 'year' | 'month' | 'day', amount: number, enforceEndOfMonth: boolean): Date => {
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
  const maxDayOfMonth = daysInMonth(year, month);

  if (enforceEndOfMonth) {
    day = Math.min(maxDayOfMonth, day);
  } else if (day > maxDayOfMonth) {
    day = day - maxDayOfMonth;
    year = year + Math.floor((month + 1) / 12);
    month = (month + 1) % 12;
  }
  return new Date(year, month, day);
};
