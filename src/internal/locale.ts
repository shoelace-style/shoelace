import { AsyncDirective, directive } from 'lit/async-directive.js';
import { noChange } from 'lit';
import { PartInfo } from 'lit/directive';

interface Language {
  translations: Translations;
  code: string;
  default: boolean;
}

interface Translations {
  [key: string]: string;
}

class Locale {
  public static dateTimeFormat: Intl.DateTimeFormatOptions;
  public static numberFormat: Intl.NumberFormatOptions;

  private static languages = new Map<string, Language>();
  private static registeredDirectives = new Set<TranslateDirective>();
  private static code: string = 'en-US';

  public static addLanguage(lang: Language, use: boolean = false) {
    Locale.languages.set(lang.code, lang);
    if (use || lang.default) Locale.setLanguage(lang.code);
  }

  public static setLanguage(code: string) {
    Locale.code = code;
    Locale.registeredDirectives.forEach(dir => dir.evaluate());
  }

  public static clean() {
    Locale.languages = new Map<string, Language>();
  }

  public static connectDirective(dir: TranslateDirective) {
    Locale.registeredDirectives.add(dir);
  }

  public static disconnectDirective(dir: TranslateDirective) {
    Locale.registeredDirectives.delete(dir);
  }

  public static translate(keys: TemplateStringsArray, ...values: unknown[]): string {
    let translations: string | undefined;
    let key = Locale.buildKey(keys);
    let lang = Locale.languages.get(Locale.code);
    let empty = keys.join('').length === 0;

    if (lang) translations = lang.translations[key];
    else console.log(`missing locale: ${Locale.code}`);

    if (!translations && !empty) console.log(`missing key: ${key}`);

    let localizedValues = values.map(Locale.localize);

    return Locale.buildMessage(translations || key, ...localizedValues);
  }

  private static localize(value: string | Date | Number) {
    if (value instanceof Date) return value.toLocaleString(Locale.code, Locale?.dateTimeFormat);
    if (value instanceof Number) return value.toLocaleString(Locale.code, Locale?.numberFormat);
    return value;
  }

  private static buildKey(keys: TemplateStringsArray) {
    let lastPartialKey = keys[keys.length - 1];
    let prependPartialKey = (prev: string, curr: string, i: number) => `${curr}{${i}}${prev}`;

    return keys.slice(0, -1).reduceRight(prependPartialKey, lastPartialKey);
  }

  private static buildMessage(content: string, ...values: unknown[]) {
    return content.replace(/{(\d)}/g, (_, i: number) => values[Number(i)] as string);
  }
}

class TranslateDirective extends AsyncDirective {
  protected keys: TemplateStringsArray;
  protected values: unknown[];

  constructor(part: PartInfo) {
    super(part);
    Locale.connectDirective(this);
  }

  render(keys: TemplateStringsArray, ...values: unknown[]) {
    if (this.keys && keys.length === this.keys.length && keys.every(element => this.keys.indexOf(element) !== -1)) {
      // don't render
      return noChange;
    }

    this.keys = keys;
    this.values = values;

    return Locale.translate(this.keys, ...this.values);
  }

  disconnected = () => Locale.disconnectDirective(this);

  reconnected = () => Locale.connectDirective(this);

  evaluate = () => this.setValue(Locale.translate(this.keys, ...this.values));
}

export { Locale };
export const t = directive(TranslateDirective);
