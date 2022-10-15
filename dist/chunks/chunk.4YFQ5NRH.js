import {
  radio_button_styles_default
} from "./chunk.7HFEO5ZN.js";
import {
  n
} from "./chunk.5FTXIKRE.js";
import {
  HasSlotController
} from "./chunk.3IYPB6RR.js";
import {
  o
} from "./chunk.KXNOOZ7Z.js";
import {
  l
} from "./chunk.BAJRIPUC.js";
import {
  watch
} from "./chunk.HFHIZRKF.js";
import {
  ShoelaceElement,
  e,
  e2,
  i,
  t
} from "./chunk.ACZ6PQE4.js";
import {
  __decorateClass
} from "./chunk.WN26B4OP.js";

// src/components/radio-button/radio-button.ts
var SlRadioButton = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.hasSlotController = new HasSlotController(this, "[default]", "prefix", "suffix");
    this.hasFocus = false;
    this.checked = false;
    this.disabled = false;
    this.size = "medium";
    this.pill = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "presentation");
  }
  handleDisabledChange() {
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleClick(e3) {
    if (this.disabled) {
      e3.preventDefault();
      e3.stopPropagation();
      return;
    }
    this.checked = true;
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  render() {
    return n`
      <div part="base" role="presentation">
        <button
          part="${`button${this.checked ? " button--checked" : ""}`}"
          role="radio"
          aria-checked="${this.checked}"
          class=${o({
      button: true,
      "button--default": true,
      "button--small": this.size === "small",
      "button--medium": this.size === "medium",
      "button--large": this.size === "large",
      "button--checked": this.checked,
      "button--disabled": this.disabled,
      "button--focused": this.hasFocus,
      "button--outline": true,
      "button--pill": this.pill,
      "button--has-label": this.hasSlotController.test("[default]"),
      "button--has-prefix": this.hasSlotController.test("prefix"),
      "button--has-suffix": this.hasSlotController.test("suffix")
    })}
          aria-disabled=${this.disabled}
          type="button"
          value=${l(this.value)}
          tabindex="${this.checked ? "0" : "-1"}"
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @click=${this.handleClick}
        >
          <span part="prefix" class="button__prefix">
            <slot name="prefix"></slot>
          </span>
          <span part="label" class="button__label">
            <slot></slot>
          </span>
          <span part="suffix" class="button__suffix">
            <slot name="suffix"></slot>
          </span>
        </button>
      </div>
    `;
  }
};
SlRadioButton.styles = radio_button_styles_default;
__decorateClass([
  i(".button")
], SlRadioButton.prototype, "input", 2);
__decorateClass([
  i(".hidden-input")
], SlRadioButton.prototype, "hiddenInput", 2);
__decorateClass([
  t()
], SlRadioButton.prototype, "hasFocus", 2);
__decorateClass([
  t()
], SlRadioButton.prototype, "checked", 2);
__decorateClass([
  e2()
], SlRadioButton.prototype, "value", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlRadioButton.prototype, "disabled", 2);
__decorateClass([
  e2({ reflect: true })
], SlRadioButton.prototype, "size", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlRadioButton.prototype, "pill", 2);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], SlRadioButton.prototype, "handleDisabledChange", 1);
SlRadioButton = __decorateClass([
  e("sl-radio-button")
], SlRadioButton);

export {
  SlRadioButton
};
