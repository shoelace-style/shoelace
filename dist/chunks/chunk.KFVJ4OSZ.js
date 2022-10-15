import {
  tree_item_styles_default
} from "./chunk.3HJSQI4K.js";
import {
  l
} from "./chunk.OXYZDAKV.js";
import {
  animateTo,
  shimKeyframesHeightAuto,
  stopAnimations
} from "./chunk.UPWQAA54.js";
import {
  getAnimation,
  setDefaultAnimation
} from "./chunk.MRCEMIP5.js";
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
  i,
  t
} from "./chunk.ACZ6PQE4.js";
import {
  y
} from "./chunk.BNCM3323.js";
import {
  __decorateClass
} from "./chunk.WN26B4OP.js";

// node_modules/lit-html/directives/when.js
function n(n2, o2, r) {
  return n2 ? o2() : null == r ? void 0 : r();
}

// src/components/tree-item/tree-item.ts
function isTreeItem(element) {
  return element && (element == null ? void 0 : element.getAttribute("role")) === "treeitem";
}
var SlTreeItem = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.indeterminate = false;
    this.isLeaf = false;
    this.loading = false;
    this.selectable = false;
    this.expanded = false;
    this.selected = false;
    this.disabled = false;
    this.lazy = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "treeitem");
    this.setAttribute("tabindex", "-1");
    if (this.isNestedItem()) {
      this.slot = "children";
    }
  }
  firstUpdated() {
    this.childrenContainer.hidden = !this.expanded;
    this.childrenContainer.style.height = this.expanded ? "auto" : "0";
    this.isLeaf = this.getChildrenItems().length === 0;
    this.handleExpandedChange();
  }
  handleLoadingChange() {
    this.setAttribute("aria-busy", this.loading ? "true" : "false");
    if (!this.loading) {
      this.animateExpand();
    }
  }
  handleDisabledChange() {
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
  }
  handleSelectedChange() {
    this.setAttribute("aria-selected", this.selected ? "true" : "false");
  }
  handleExpandedChange() {
    if (!this.isLeaf) {
      this.setAttribute("aria-expanded", this.expanded ? "true" : "false");
    } else {
      this.removeAttribute("aria-expanded");
    }
  }
  handleExpandAnimation() {
    if (this.expandButtonSlot) {
      this.expandButtonSlot.name = this.expanded ? "collapse-icon" : "expand-icon";
    }
    if (this.expanded) {
      if (this.lazy) {
        this.loading = true;
        this.emit("sl-lazy-load");
      } else {
        this.animateExpand();
      }
    } else {
      this.animateCollapse();
    }
  }
  handleLazyChange() {
    this.emit("sl-lazy-change");
  }
  async animateExpand() {
    this.emit("sl-expand");
    await stopAnimations(this.childrenContainer);
    this.childrenContainer.hidden = false;
    const { keyframes, options } = getAnimation(this, "tree-item.expand", { dir: this.localize.dir() });
    await animateTo(
      this.childrenContainer,
      shimKeyframesHeightAuto(keyframes, this.childrenContainer.scrollHeight),
      options
    );
    this.childrenContainer.style.height = "auto";
    this.emit("sl-after-expand");
  }
  async animateCollapse() {
    this.emit("sl-collapse");
    await stopAnimations(this.childrenContainer);
    const { keyframes, options } = getAnimation(this, "tree-item.collapse", { dir: this.localize.dir() });
    await animateTo(
      this.childrenContainer,
      shimKeyframesHeightAuto(keyframes, this.childrenContainer.scrollHeight),
      options
    );
    this.childrenContainer.hidden = true;
    this.emit("sl-after-collapse");
  }
  getChildrenItems({ includeDisabled = true } = {}) {
    return this.childrenSlot ? [...this.childrenSlot.assignedElements({ flatten: true })].filter(
      (item) => isTreeItem(item) && (includeDisabled || !item.disabled)
    ) : [];
  }
  isNestedItem() {
    const parent = this.parentElement;
    return !!parent && isTreeItem(parent);
  }
  handleChildrenSlotChange() {
    this.loading = false;
    this.isLeaf = this.getChildrenItems().length === 0;
  }
  willUpdate(changedProperties) {
    if (changedProperties.has("selected") && !changedProperties.has("indeterminate")) {
      this.indeterminate = false;
    }
  }
  render() {
    const isRtl = this.localize.dir() === "rtl";
    const showExpandButton = !this.loading && (!this.isLeaf || this.lazy);
    return y`
      <div
        part="base"
        class="${o({
      "tree-item": true,
      "tree-item--expanded": this.expanded,
      "tree-item--selected": this.selected,
      "tree-item--disabled": this.disabled,
      "tree-item--leaf": this.isLeaf,
      "tree-item--rtl": this.localize.dir() === "rtl"
    })}"
      >
        <div
          class="tree-item__item"
          part="
            item
            ${this.disabled ? "item--disabled" : ""}
            ${this.expanded ? "item--expanded" : ""}
            ${this.indeterminate ? "item--indeterminate" : ""}
            ${this.selected ? "item--selected" : ""}
          "
        >
          <div class="tree-item__indentation" part="indentation"></div>

          <div
            part="expand-button"
            class=${o({
      "tree-item__expand-button": true,
      "tree-item__expand-button--visible": showExpandButton
    })}
            aria-hidden="true"
          >
            ${n(this.loading, () => y` <sl-spinner></sl-spinner> `)}
            ${n(
      showExpandButton,
      () => y`
                <slot class="tree-item__expand-icon-slot" name="expand-icon">
                  <sl-icon
                    class="tree-item__default-toggle-button"
                    library="system"
                    name=${isRtl ? "chevron-left" : "chevron-right"}
                  ></sl-icon>
                </slot>
              `
    )}
          </div>

          ${n(
      this.selectable,
      () => y`
                <sl-checkbox
                  tabindex="-1"
                  class="tree-item__checkbox"
                  ?disabled="${this.disabled}"
                  ?checked="${l(this.selected)}"
                  ?indeterminate="${this.indeterminate}"
                >
                  <div class="tree-item__label" part="label">
                    <slot></slot>
                  </div>
                </sl-checkbox>
              `,
      () => y`
              <div class="tree-item__label" part="label">
                <slot></slot>
              </div>
            `
    )}
        </div>

        <div class="tree-item__children" part="children" role="group">
          <slot name="children" @slotchange="${this.handleChildrenSlotChange}"></slot>
        </div>
      </div>
    `;
  }
};
SlTreeItem.styles = tree_item_styles_default;
__decorateClass([
  t()
], SlTreeItem.prototype, "indeterminate", 2);
__decorateClass([
  t()
], SlTreeItem.prototype, "isLeaf", 2);
__decorateClass([
  t()
], SlTreeItem.prototype, "loading", 2);
__decorateClass([
  t()
], SlTreeItem.prototype, "selectable", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlTreeItem.prototype, "expanded", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlTreeItem.prototype, "selected", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlTreeItem.prototype, "disabled", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlTreeItem.prototype, "lazy", 2);
__decorateClass([
  i("slot:not([name])")
], SlTreeItem.prototype, "defaultSlot", 2);
__decorateClass([
  i("slot[name=children]")
], SlTreeItem.prototype, "childrenSlot", 2);
__decorateClass([
  i(".tree-item__item")
], SlTreeItem.prototype, "itemElement", 2);
__decorateClass([
  i(".tree-item__children")
], SlTreeItem.prototype, "childrenContainer", 2);
__decorateClass([
  i(".tree-item__expand-button slot")
], SlTreeItem.prototype, "expandButtonSlot", 2);
__decorateClass([
  watch("loading", { waitUntilFirstUpdate: true })
], SlTreeItem.prototype, "handleLoadingChange", 1);
__decorateClass([
  watch("disabled")
], SlTreeItem.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("selected")
], SlTreeItem.prototype, "handleSelectedChange", 1);
__decorateClass([
  watch("expanded", { waitUntilFirstUpdate: true })
], SlTreeItem.prototype, "handleExpandedChange", 1);
__decorateClass([
  watch("expanded", { waitUntilFirstUpdate: true })
], SlTreeItem.prototype, "handleExpandAnimation", 1);
__decorateClass([
  watch("lazy", { waitUntilFirstUpdate: true })
], SlTreeItem.prototype, "handleLazyChange", 1);
SlTreeItem = __decorateClass([
  e("sl-tree-item")
], SlTreeItem);
setDefaultAnimation("tree-item.expand", {
  keyframes: [
    { height: "0", opacity: "0", overflow: "hidden" },
    { height: "auto", opacity: "1", overflow: "hidden" }
  ],
  options: { duration: 250, easing: "cubic-bezier(0.4, 0.0, 0.2, 1)" }
});
setDefaultAnimation("tree-item.collapse", {
  keyframes: [
    { height: "auto", opacity: "1", overflow: "hidden" },
    { height: "0", opacity: "0", overflow: "hidden" }
  ],
  options: { duration: 200, easing: "cubic-bezier(0.4, 0.0, 0.2, 1)" }
});

export {
  isTreeItem,
  SlTreeItem
};
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
