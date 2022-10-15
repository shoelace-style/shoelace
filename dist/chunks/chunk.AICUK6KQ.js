import {
  visually_hidden_styles_default
} from "./chunk.36NPI6CA.js";
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

// src/components/visually-hidden/visually-hidden.ts
var SlVisuallyHidden = class extends ShoelaceElement {
  render() {
    return y` <slot></slot> `;
  }
};
SlVisuallyHidden.styles = visually_hidden_styles_default;
SlVisuallyHidden = __decorateClass([
  e("sl-visually-hidden")
], SlVisuallyHidden);

export {
  SlVisuallyHidden
};
