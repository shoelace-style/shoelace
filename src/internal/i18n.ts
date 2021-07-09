// === exports =======================================================

// `localize` is the only allowed access to localization API
// for Shoelace's core components. It returns a facade that
// abstracts from the concrete underlying i18n logic.
// Direct access in components to the `Intl` object or
// `(Date|Number|Etc).prototype.toLocaleXyz` is forbidden!
export { localize };

// === types =========================================================

// Maybe in future something like the following could work:
//
//  <sl-i18n adapter=${i18nextAdapter}> ... </sl-i18n>
//    or
//  <sl-i18n lang="fr-FR" adapter=${xyzAdapter}> ... </sl-i18n>
//
type I18nAdapter = {
  // More arguments may be necessary in the future, for stuff like
  // auto-refresh on locale change etc.
  getI18nFacade(elem: HTMLElement): I18nFacade;
};

// Important: The methods of the i18n facades are NOT pure functions.
// Their results may change as soon as the current locale
// changes.
type I18nFacade = {
  getLocale(): string;
  formatDate(value: Date, format?: DateFormat): string;
  formatNumber(value: number, format?: NumberFormat): string;
  formatRelativeTime(value: number, unit: RelativeTimeFormatUnit, format?: RelativeTimeFormat): string;
  // TODO: translate(...): string // or getText, getTerm, tr or whatever
  // TODO: getFirstDayOfWeek(): number // 0 to 6, 0 means Sunday
  // etc.
};

// For conveninece we reuse parts of the Intl types.
// But only types, no tight coupling with Intl here.
type DateFormat = Intl.DateTimeFormatOptions;
type NumberFormat = Intl.NumberFormatOptions;
type RelativeTimeFormat = Intl.RelativeTimeFormatOptions;
type RelativeTimeFormatUnit = Intl.RelativeTimeFormatUnit;

// === localize function =============================================

function localize(elem: HTMLElement): I18nFacade {
  // Currently it's not possible to configure any custom
  // i18n adapter so we use the default one here.
  return defaultI18nAdapter.getI18nFacade(elem);
}

// === default i18n strategy =========================================

const defaultI18nAdapter: I18nAdapter = {
  getI18nFacade(elem) {
    const getLocale = () => elem.lang || 'en-US';

    return {
      getLocale,
      formatDate: (value, format) => new Intl.DateTimeFormat(getLocale(), format).format(value),
      formatNumber: (value, format) => new Intl.NumberFormat(getLocale(), format).format(value),
      formatRelativeTime: (value, unit, format) => new Intl.RelativeTimeFormat(getLocale(), format).format(value, unit)
    };
  }
};
