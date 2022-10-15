import {
  divider_styles_default
} from "./chunk.EPEMUNJI.js";
import {
  watch
} from "./chunk.HFHIZRKF.js";
import {
  ShoelaceElement,
  e,
  e2
} from "./chunk.ACZ6PQE4.js";
import {
  __decorateClass
} from "./chunk.WN26B4OP.js";

// src/components/divider/divider.ts
var SlDivider = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.vertical = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "separator");
  }
  handleVerticalChange() {
    this.setAttribute("aria-orientation", this.vertical ? "vertical" : "horizontal");
  }
};
SlDivider.styles = divider_styles_default;
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlDivider.prototype, "vertical", 2);
__decorateClass([
  watch("vertical")
], SlDivider.prototype, "handleVerticalChange", 1);
SlDivider = __decorateClass([
  e("sl-divider")
], SlDivider);

export {
  SlDivider
};
