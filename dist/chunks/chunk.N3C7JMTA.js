import {
  tab_panel_styles_default
} from "./chunk.57R3A2AA.js";
import {
  autoIncrement
} from "./chunk.KFR7NC2M.js";
import {
  o
} from "./chunk.KXNOOZ7Z.js";
import {
  watch
} from "./chunk.HFHIZRKF.js";
import {
  ShoelaceElement,
  e,
  e2
} from "./chunk.ACZ6PQE4.js";
import {
  y
} from "./chunk.BNCM3323.js";
import {
  __decorateClass
} from "./chunk.WN26B4OP.js";

// src/components/tab-panel/tab-panel.ts
var SlTabPanel = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.attrId = autoIncrement();
    this.componentId = `sl-tab-panel-${this.attrId}`;
    this.name = "";
    this.active = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.id = this.id.length > 0 ? this.id : this.componentId;
    this.setAttribute("role", "tabpanel");
  }
  handleActiveChange() {
    this.setAttribute("aria-hidden", this.active ? "false" : "true");
  }
  render() {
    return y`
      <div
        part="base"
        class=${o({
      "tab-panel": true,
      "tab-panel--active": this.active
    })}
      >
        <slot></slot>
      </div>
    `;
  }
};
SlTabPanel.styles = tab_panel_styles_default;
__decorateClass([
  e2({ reflect: true })
], SlTabPanel.prototype, "name", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlTabPanel.prototype, "active", 2);
__decorateClass([
  watch("active")
], SlTabPanel.prototype, "handleActiveChange", 1);
SlTabPanel = __decorateClass([
  e("sl-tab-panel")
], SlTabPanel);

export {
  SlTabPanel
};
