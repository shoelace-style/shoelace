import { Shoemaker } from '@shoelace-style/shoemaker';

/**
 * @since 2.0
 * @status stable
 */
export default class SlFormatNumber extends Shoemaker {
  static tag = 'sl-format-number';
  static props = [
    'value',
    'locale',
    'type',
    'noGrouping',
    'currency',
    'currencyDisplay',
    'minimumIntegerDigits',
    'minimumFractionDigits',
    'maximumFractionDigits',
    'minimumSignificantDigits',
    'maximumSignificantDigits'
  ];

  /** The number to format. */
  value = 0;

  /** The locale to use when formatting the number. */
  locale: string;

  /** The formatting style to use. */
  type: 'currency' | 'decimal' | 'percent' = 'decimal';

  /** Turns off grouping separators. */
  noGrouping = false;

  /** The currency to use when formatting. Must be an ISO 4217 currency code such as `USD` or `EUR`. */
  currency = 'USD';

  /** How to display the currency. */
  currencyDisplay: 'symbol' | 'narrowSymbol' | 'code' | 'name' = 'symbol';

  /** The minimum number of integer digits to use. Possible values are 1 - 21. */
  minimumIntegerDigits: number;

  /** The minimum number of fraction digits to use. Possible values are 0 - 20. */
  minimumFractionDigits: number;

  /** The maximum number of fraction digits to use. Possible values are 0 - 20. */
  maximumFractionDigits: number;

  /** The minimum number of significant digits to use. Possible values are 1 - 21. */
  minimumSignificantDigits: number;

  /** The maximum number of significant digits to use,. Possible values are 1 - 21. */
  maximumSignificantDigits: number;

  render() {
    if (isNaN(this.value)) {
      return '';
    }

    return new Intl.NumberFormat(this.locale, {
      style: this.type,
      currency: this.currency,
      currencyDisplay: this.currencyDisplay,
      useGrouping: !this.noGrouping,
      minimumIntegerDigits: this.minimumIntegerDigits,
      minimumFractionDigits: this.minimumFractionDigits,
      maximumFractionDigits: this.maximumFractionDigits,
      minimumSignificantDigits: this.minimumSignificantDigits,
      maximumSignificantDigits: this.maximumSignificantDigits
    }).format(this.value);
  }
}
