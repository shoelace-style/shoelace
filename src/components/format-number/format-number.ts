import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { localize } from '../../internal/i18n';

/**
 * @since 2.0
 * @status stable
 */
@customElement('sl-format-number')
export default class SlFormatNumber extends LitElement {
  private t = localize(this);

  /** The number to format. */
  @property({ type: Number }) value = 0;

  /** The locale to use when formatting the number. */
  @property() override lang = '';

  /** The formatting style to use. */
  @property() type: 'currency' | 'decimal' | 'percent' = 'decimal';

  /** Turns off grouping separators. */
  @property({ attribute: 'no-grouping', type: Boolean }) noGrouping = false;

  /** The currency to use when formatting. Must be an ISO 4217 currency code such as `USD` or `EUR`. */
  @property() currency = 'USD';

  /** How to display the currency. */
  @property({ attribute: 'currency-display' }) currencyDisplay: 'symbol' | 'narrowSymbol' | 'code' | 'name' = 'symbol';

  /** The minimum number of integer digits to use. Possible values are 1 - 21. */
  @property({ attribute: 'minimum-integer-digits', type: Number }) minimumIntegerDigits: number;

  /** The minimum number of fraction digits to use. Possible values are 0 - 20. */
  @property({ attribute: 'minimum-fraction-digits', type: Number }) minimumFractionDigits: number;

  /** The maximum number of fraction digits to use. Possible values are 0 - 20. */
  @property({ attribute: 'maximum-fraction-digits', type: Number }) maximumFractionDigits: number;

  /** The minimum number of significant digits to use. Possible values are 1 - 21. */
  @property({ attribute: 'minimum-significant-digits', type: Number }) minimumSignificantDigits: number;

  /** The maximum number of significant digits to use,. Possible values are 1 - 21. */
  @property({ attribute: 'maximum-significant-digits', type: Number }) maximumSignificantDigits: number;

  render() {
    if (isNaN(this.value)) {
      return '';
    }

    return this.t.formatNumber(this.value, {
      style: this.type,
      currency: this.currency,
      currencyDisplay: this.currencyDisplay,
      useGrouping: !this.noGrouping,
      minimumIntegerDigits: this.minimumIntegerDigits,
      minimumFractionDigits: this.minimumFractionDigits,
      maximumFractionDigits: this.maximumFractionDigits,
      minimumSignificantDigits: this.minimumSignificantDigits,
      maximumSignificantDigits: this.maximumSignificantDigits
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-format-number': SlFormatNumber;
  }
}
