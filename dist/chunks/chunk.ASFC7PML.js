import {
  button_styles_default
} from "./chunk.6I6W4YNV.js";
import {
  FormSubmitController
} from "./chunk.V7A7LZPG.js";
import {
  i as i2,
  n
} from "./chunk.5FTXIKRE.js";
import {
  LocalizeController
} from "./chunk.22NDZY3T.js";
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
  ShoelaceElement,
  e,
  e2,
  i,
  t
} from "./chunk.ACZ6PQE4.js";
import {
  __decorateClass
} from "./chunk.WN26B4OP.js";

// src/components/button/button.ts
var SlButton = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.formSubmitController = new FormSubmitController(this, {
      form: (input) => {
        if (input.hasAttribute("form")) {
          const doc = input.getRootNode();
          const formId = input.getAttribute("form");
          return doc.getElementById(formId);
        }
        return input.closest("form");
      }
    });
    this.hasSlotController = new HasSlotController(this, "[default]", "prefix", "suffix");
    this.localize = new LocalizeController(this);
    this.hasFocus = false;
    this.variant = "default";
    this.size = "medium";
    this.caret = false;
    this.disabled = false;
    this.loading = false;
    this.outline = false;
    this.pill = false;
    this.circle = false;
    this.type = "button";
  }
  click() {
    this.button.click();
  }
  focus(options) {
    this.button.focus(options);
  }
  blur() {
    this.button.blur();
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  handleClick(event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (this.type === "submit") {
      this.formSubmitController.submit(this);
    }
    if (this.type === "reset") {
      this.formSubmitController.reset(this);
    }
  }
  render() {
    const isLink = this.href ? true : false;
    const tag = isLink ? i2`a` : i2`button`;
    return n`
      <${tag}
        part="base"
        class=${o({
      button: true,
      "button--default": this.variant === "default",
      "button--primary": this.variant === "primary",
      "button--success": this.variant === "success",
      "button--neutral": this.variant === "neutral",
      "button--warning": this.variant === "warning",
      "button--danger": this.variant === "danger",
      "button--text": this.variant === "text",
      "button--small": this.size === "small",
      "button--medium": this.size === "medium",
      "button--large": this.size === "large",
      "button--caret": this.caret,
      "button--circle": this.circle,
      "button--disabled": this.disabled,
      "button--focused": this.hasFocus,
      "button--loading": this.loading,
      "button--standard": !this.outline,
      "button--outline": this.outline,
      "button--pill": this.pill,
      "button--rtl": this.localize.dir() === "rtl",
      "button--has-label": this.hasSlotController.test("[default]"),
      "button--has-prefix": this.hasSlotController.test("prefix"),
      "button--has-suffix": this.hasSlotController.test("suffix")
    })}
        ?disabled=${l(isLink ? void 0 : this.disabled)}
        type=${l(isLink ? void 0 : this.type)}
        name=${l(isLink ? void 0 : this.name)}
        value=${l(isLink ? void 0 : this.value)}
        href=${l(isLink ? this.href : void 0)}
        target=${l(isLink ? this.target : void 0)}
        download=${l(isLink ? this.download : void 0)}
        rel=${l(isLink && this.target ? "noreferrer noopener" : void 0)}
        role=${l(isLink ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled ? "-1" : "0"}
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
        ${this.caret ? n`
                <span part="caret" class="button__caret">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              ` : ""}
        ${this.loading ? n`<sl-spinner></sl-spinner>` : ""}
      </${tag}>
    `;
  }
};
SlButton.styles = button_styles_default;
__decorateClass([
  i(".button")
], SlButton.prototype, "button", 2);
__decorateClass([
  t()
], SlButton.prototype, "hasFocus", 2);
__decorateClass([
  e2({ reflect: true })
], SlButton.prototype, "variant", 2);
__decorateClass([
  e2({ reflect: true })
], SlButton.prototype, "size", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlButton.prototype, "caret", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlButton.prototype, "disabled", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlButton.prototype, "loading", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlButton.prototype, "outline", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlButton.prototype, "pill", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlButton.prototype, "circle", 2);
__decorateClass([
  e2()
], SlButton.prototype, "type", 2);
__decorateClass([
  e2()
], SlButton.prototype, "name", 2);
__decorateClass([
  e2()
], SlButton.prototype, "value", 2);
__decorateClass([
  e2()
], SlButton.prototype, "href", 2);
__decorateClass([
  e2()
], SlButton.prototype, "target", 2);
__decorateClass([
  e2()
], SlButton.prototype, "download", 2);
__decorateClass([
  e2()
], SlButton.prototype, "form", 2);
__decorateClass([
  e2({ attribute: "formaction" })
], SlButton.prototype, "formAction", 2);
__decorateClass([
  e2({ attribute: "formmethod" })
], SlButton.prototype, "formMethod", 2);
__decorateClass([
  e2({ attribute: "formnovalidate", type: Boolean })
], SlButton.prototype, "formNoValidate", 2);
__decorateClass([
  e2({ attribute: "formtarget" })
], SlButton.prototype, "formTarget", 2);
SlButton = __decorateClass([
  e("sl-button")
], SlButton);

export {
  SlButton
};
