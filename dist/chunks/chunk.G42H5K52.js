import {
  menu_item_styles_default
} from "./chunk.YSNMZDBO.js";
import {
  getTextContent
} from "./chunk.3IYPB6RR.js";
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

// src/components/menu-item/menu-item.ts
var SlMenuItem = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.checked = false;
    this.value = "";
    this.disabled = false;
  }
  firstUpdated() {
    this.setAttribute("role", "menuitem");
  }
  getTextLabel() {
    return getTextContent(this.defaultSlot);
  }
  handleCheckedChange() {
    this.setAttribute("aria-checked", this.checked ? "true" : "false");
  }
  handleDisabledChange() {
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
  }
  handleDefaultSlotChange() {
    const textLabel = this.getTextLabel();
    if (typeof this.cachedTextLabel === "undefined") {
      this.cachedTextLabel = textLabel;
      return;
    }
    if (textLabel !== this.cachedTextLabel) {
      this.cachedTextLabel = textLabel;
      this.emit("sl-label-change");
    }
  }
  render() {
    return y`
      <div
        part="base"
        class=${o({
      "menu-item": true,
      "menu-item--checked": this.checked,
      "menu-item--disabled": this.disabled,
      "menu-item--has-submenu": false
    })}
      >
        <span part="checked-icon" class="menu-item__check">
          <sl-icon name="check-lg" library="system" aria-hidden="true"></sl-icon>
        </span>

        <span part="prefix" class="menu-item__prefix">
          <slot name="prefix"></slot>
        </span>

        <span part="label" class="menu-item__label">
          <slot @slotchange=${this.handleDefaultSlotChange}></slot>
        </span>

        <span part="suffix" class="menu-item__suffix">
          <slot name="suffix"></slot>
        </span>

        <span class="menu-item__chevron">
          <sl-icon name="chevron-right" library="system" aria-hidden="true"></sl-icon>
        </span>
      </div>
    `;
  }
};
SlMenuItem.styles = menu_item_styles_default;
__decorateClass([
  i("slot:not([name])")
], SlMenuItem.prototype, "defaultSlot", 2);
__decorateClass([
  i(".menu-item")
], SlMenuItem.prototype, "menuItem", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlMenuItem.prototype, "checked", 2);
__decorateClass([
  e2()
], SlMenuItem.prototype, "value", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlMenuItem.prototype, "disabled", 2);
__decorateClass([
  watch("checked")
], SlMenuItem.prototype, "handleCheckedChange", 1);
__decorateClass([
  watch("disabled")
], SlMenuItem.prototype, "handleDisabledChange", 1);
SlMenuItem = __decorateClass([
  e("sl-menu-item")
], SlMenuItem);

export {
  SlMenuItem
};
