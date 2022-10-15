import {
  LocalizeController
} from "./chunk.22NDZY3T.js";
import {
  ShoelaceElement,
  e,
  e2
} from "./chunk.ACZ6PQE4.js";
import {
  __decorateClass
} from "./chunk.WN26B4OP.js";

// src/components/format-number/format-number.ts
var SlFormatNumber = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.value = 0;
    this.type = "decimal";
    this.noGrouping = false;
    this.currency = "USD";
    this.currencyDisplay = "symbol";
  }
  render() {
    if (isNaN(this.value)) {
      return "";
    }
    return this.localize.number(this.value, {
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
};
__decorateClass([
  e2({ type: Number })
], SlFormatNumber.prototype, "value", 2);
__decorateClass([
  e2()
], SlFormatNumber.prototype, "type", 2);
__decorateClass([
  e2({ attribute: "no-grouping", type: Boolean })
], SlFormatNumber.prototype, "noGrouping", 2);
__decorateClass([
  e2()
], SlFormatNumber.prototype, "currency", 2);
__decorateClass([
  e2({ attribute: "currency-display" })
], SlFormatNumber.prototype, "currencyDisplay", 2);
__decorateClass([
  e2({ attribute: "minimum-integer-digits", type: Number })
], SlFormatNumber.prototype, "minimumIntegerDigits", 2);
__decorateClass([
  e2({ attribute: "minimum-fraction-digits", type: Number })
], SlFormatNumber.prototype, "minimumFractionDigits", 2);
__decorateClass([
  e2({ attribute: "maximum-fraction-digits", type: Number })
], SlFormatNumber.prototype, "maximumFractionDigits", 2);
__decorateClass([
  e2({ attribute: "minimum-significant-digits", type: Number })
], SlFormatNumber.prototype, "minimumSignificantDigits", 2);
__decorateClass([
  e2({ attribute: "maximum-significant-digits", type: Number })
], SlFormatNumber.prototype, "maximumSignificantDigits", 2);
SlFormatNumber = __decorateClass([
  e("sl-format-number")
], SlFormatNumber);

export {
  SlFormatNumber
};
