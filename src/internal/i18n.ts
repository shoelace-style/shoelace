interface Language {
  translations: Translations;
  code: string;
}

interface Translations {
  [key: string]: string;
}

interface I18n {
  setting: Setting;
  translations: Translations;
  use: (opt: Setting) => (strings: TemplateStringsArray, ...values: unknown[]) => string;
  translate: (strings: TemplateStringsArray, ...values: unknown[]) => string;
  localize: (value: unknown) => string;
  buildKey: (keys: TemplateStringsArray) => string;
  buildMessage: (content: string, ...values: unknown[]) => string;
}

interface Setting {
  lang: string;
  dateTimeFormat?: Intl.DateTimeFormatOptions;
  numberFormat?: Intl.NumberFormatOptions;
}

export class Locale {
  static languages = new Map<string, Translations>();
  static addLanguage(lang: Language) {
    Locale.languages.set(lang.code, lang.translations);
  }
}

export const i18n: I18n = {
  setting: {} as Setting,
  translations: {},

  use(opt: Setting = { lang: 'en-US' }) {
    i18n.translations = Locale.languages.get(opt.lang) || {};
    i18n.setting.lang = opt.lang;
    i18n.setting.dateTimeFormat = opt.dateTimeFormat;
    i18n.setting.numberFormat = opt.numberFormat;

    return i18n.translate;
  },

  translate(keys: TemplateStringsArray, ...values: unknown[]): string {
    const translated = i18n.translations![i18n.buildKey(keys)];

    return translated ? i18n.buildMessage(translated, ...values.map(i18n.localize)) : 'missing translation';
  },

  localize(value: unknown) {
    const { lang, dateTimeFormat, numberFormat } = i18n.setting;

    if (value instanceof Date) return new Intl.DateTimeFormat(lang, dateTimeFormat).format(value);
    else if (value instanceof Number) return new Intl.NumberFormat(lang, numberFormat).format(value as number);
    else return value as string;
  },

  buildKey(keys: TemplateStringsArray) {
    return keys
      .slice(0, -1)
      .reduceRight((prev: string, curr: string, index: number) => `${curr}{${index}}${prev}`, keys[keys.length - 1]);
  },

  buildMessage(content: string, ...values: unknown[]) {
    return content.replace(/{(\d)}/g, (_, i: number) => values[Number(i)] as string);
  }
};
