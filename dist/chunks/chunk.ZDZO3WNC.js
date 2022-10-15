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

// src/components/format-bytes/format-bytes.ts
var SlFormatBytes = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.value = 0;
    this.unit = "byte";
    this.display = "short";
  }
  render() {
    if (isNaN(this.value)) {
      return "";
    }
    const bitPrefixes = ["", "kilo", "mega", "giga", "tera"];
    const bytePrefixes = ["", "kilo", "mega", "giga", "tera", "peta"];
    const prefix = this.unit === "bit" ? bitPrefixes : bytePrefixes;
    const index = Math.max(0, Math.min(Math.floor(Math.log10(this.value) / 3), prefix.length - 1));
    const unit = prefix[index] + this.unit;
    const valueToFormat = parseFloat((this.value / Math.pow(1e3, index)).toPrecision(3));
    return this.localize.number(valueToFormat, {
      style: "unit",
      unit,
      unitDisplay: this.display
    });
  }
};
__decorateClass([
  e2({ type: Number })
], SlFormatBytes.prototype, "value", 2);
__decorateClass([
  e2()
], SlFormatBytes.prototype, "unit", 2);
__decorateClass([
  e2()
], SlFormatBytes.prototype, "display", 2);
SlFormatBytes = __decorateClass([
  e("sl-format-bytes")
], SlFormatBytes);

export {
  SlFormatBytes
};
