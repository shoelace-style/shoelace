import {
  menu_label_styles_default
} from "./chunk.GDZQDVEQ.js";
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

// src/components/menu-label/menu-label.ts
var SlMenuLabel = class extends ShoelaceElement {
  render() {
    return y`
      <div part="base" class="menu-label">
        <slot></slot>
      </div>
    `;
  }
};
SlMenuLabel.styles = menu_label_styles_default;
SlMenuLabel = __decorateClass([
  e("sl-menu-label")
], SlMenuLabel);

export {
  SlMenuLabel
};
