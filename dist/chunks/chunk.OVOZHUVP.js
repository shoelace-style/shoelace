import {
  autoIncrement
} from "./chunk.KFR7NC2M.js";
import {
  tab_styles_default
} from "./chunk.IARDOD7B.js";
import {
  LocalizeController
} from "./chunk.22NDZY3T.js";
import {
  o
} from "./chunk.KXNOOZ7Z.js";
import {
  watch
} from "./chunk.HFHIZRKF.js";
import {
  ShoelaceElement,
  e,
  e2,
  i
} from "./chunk.ACZ6PQE4.js";
import {
  y
} from "./chunk.BNCM3323.js";
import {
  __decorateClass
} from "./chunk.WN26B4OP.js";

// src/components/tab/tab.ts
var SlTab = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.attrId = autoIncrement();
    this.componentId = `sl-tab-${this.attrId}`;
    this.panel = "";
    this.active = false;
    this.closable = false;
    this.disabled = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "tab");
  }
  focus(options) {
    this.tab.focus(options);
  }
  blur() {
    this.tab.blur();
  }
  handleCloseClick() {
    this.emit("sl-close");
  }
  handleActiveChange() {
    this.setAttribute("aria-selected", this.active ? "true" : "false");
  }
  handleDisabledChange() {
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
  }
  render() {
    this.id = this.id.length > 0 ? this.id : this.componentId;
    return y`
      <div
        part="base"
        class=${o({
      tab: true,
      "tab--active": this.active,
      "tab--closable": this.closable,
      "tab--disabled": this.disabled
    })}
        tabindex=${this.disabled ? "-1" : "0"}
      >
        <slot></slot>
        ${this.closable ? y`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                name="x"
                library="system"
                label=${this.localize.term("close")}
                class="tab__close-button"
                @click=${this.handleCloseClick}
                tabindex="-1"
              ></sl-icon-button>
            ` : ""}
      </div>
    `;
  }
};
SlTab.styles = tab_styles_default;
__decorateClass([
  i(".tab")
], SlTab.prototype, "tab", 2);
__decorateClass([
  e2({ reflect: true })
], SlTab.prototype, "panel", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlTab.prototype, "active", 2);
__decorateClass([
  e2({ type: Boolean })
], SlTab.prototype, "closable", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlTab.prototype, "disabled", 2);
__decorateClass([
  watch("active")
], SlTab.prototype, "handleActiveChange", 1);
__decorateClass([
  watch("disabled")
], SlTab.prototype, "handleDisabledChange", 1);
SlTab = __decorateClass([
  e("sl-tab")
], SlTab);

export {
  SlTab
};
