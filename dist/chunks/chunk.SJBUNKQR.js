import {
  spinner_styles_default
} from "./chunk.PX2IIKVL.js";
import {
  LocalizeController
} from "./chunk.22NDZY3T.js";
import {
  ShoelaceElement,
  e
} from "./chunk.ACZ6PQE4.js";
import {
  y
} from "./chunk.BNCM3323.js";
import {
  __decorateClass
} from "./chunk.WN26B4OP.js";

// src/components/spinner/spinner.ts
var SlSpinner = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
  }
  render() {
    return y`
      <svg part="base" class="spinner" role="progressbar" aria-valuetext=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `;
  }
};
SlSpinner.styles = spinner_styles_default;
SlSpinner = __decorateClass([
  e("sl-spinner")
], SlSpinner);

export {
  SlSpinner
};
