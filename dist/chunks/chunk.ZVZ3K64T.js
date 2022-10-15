import {
  tree_styles_default
} from "./chunk.IMQ5IQOC.js";
import {
  isTreeItem
} from "./chunk.KFVJ4OSZ.js";
import {
  clamp
} from "./chunk.43G6GBOK.js";
import {
  LocalizeController
} from "./chunk.22NDZY3T.js";
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

// src/components/tree/tree.ts
function syncCheckboxes(changedTreeItem) {
  function syncAncestors(treeItem) {
    const parentItem = treeItem.parentElement;
    if (isTreeItem(parentItem)) {
      const children = parentItem.getChildrenItems({ includeDisabled: false });
      const allChecked = !!children.length && children.every((item) => item.selected);
      const allUnchecked = children.every((item) => !item.selected && !item.indeterminate);
      parentItem.selected = allChecked;
      parentItem.indeterminate = !allChecked && !allUnchecked;
      syncAncestors(parentItem);
    }
  }
  function syncDescendants(treeItem) {
    for (const childItem of treeItem.getChildrenItems()) {
      childItem.selected = !childItem.disabled && treeItem.selected;
      syncDescendants(childItem);
    }
  }
  syncAncestors(changedTreeItem);
  syncDescendants(changedTreeItem);
}
var SlTree = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.selection = "single";
    this.treeItems = [];
    this.localize = new LocalizeController(this);
    this.initTreeItem = (item) => {
      item.selectable = this.selection === "multiple";
      ["expand", "collapse"].filter((status) => !!this.querySelector(`[slot="${status}-icon"]`)).forEach((status) => {
        const existingIcon = item.querySelector(`[slot="${status}-icon"]`);
        if (existingIcon === null) {
          item.append(this.getExpandButtonIcon(status));
        } else if (existingIcon.hasAttribute("data-default")) {
          existingIcon.replaceWith(this.getExpandButtonIcon(status));
        } else {
        }
      });
    };
    this.handleTreeChanged = (mutations) => {
      for (const mutation of mutations) {
        const addedNodes = [...mutation.addedNodes].filter(isTreeItem);
        const removedNodes = [...mutation.removedNodes].filter(isTreeItem);
        addedNodes.forEach(this.initTreeItem);
        if (removedNodes.includes(this.lastFocusedItem)) {
          this.focusItem(this.getFocusableItems()[0]);
        }
      }
    };
    this.handleFocusOut = (event) => {
      const relatedTarget = event.relatedTarget;
      if (!relatedTarget || !this.contains(relatedTarget)) {
        this.tabIndex = 0;
      }
    };
    this.handleFocusIn = (event) => {
      const target = event.target;
      if (event.target === this) {
        this.focusItem(this.lastFocusedItem || this.treeItems[0]);
      }
      if (isTreeItem(target) && !target.disabled) {
        if (this.lastFocusedItem) {
          this.lastFocusedItem.tabIndex = -1;
        }
        this.lastFocusedItem = target;
        this.tabIndex = -1;
        target.tabIndex = 0;
      }
    };
  }
  async connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "tree");
    this.setAttribute("tabindex", "0");
    this.addEventListener("focusin", this.handleFocusIn);
    this.addEventListener("focusout", this.handleFocusOut);
    this.addEventListener("sl-lazy-change", this.updateItems);
    await this.updateComplete;
    this.mutationObserver = new MutationObserver(this.handleTreeChanged);
    this.mutationObserver.observe(this, { childList: true, subtree: true });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.mutationObserver.disconnect();
    this.removeEventListener("focusin", this.handleFocusIn);
    this.removeEventListener("focusout", this.handleFocusOut);
    this.removeEventListener("sl-lazy-change", this.updateItems);
  }
  getExpandButtonIcon(status) {
    const slot = status === "expand" ? this.expandedIconSlot : this.collapsedIconSlot;
    const icon = slot.assignedElements({ flatten: true })[0];
    if (icon) {
      const clone = icon.cloneNode(true);
      [clone, ...clone.querySelectorAll("[id]")].forEach((el) => el.removeAttribute("id"));
      clone.setAttribute("data-default", "");
      clone.slot = `${status}-icon`;
      return clone;
    }
    return null;
  }
  handleSelectionChange() {
    this.setAttribute("aria-multiselectable", this.selection === "multiple" ? "true" : "false");
    for (const item of this.treeItems) {
      item.selectable = this.selection === "multiple";
    }
  }
  syncTreeItems(selectedItem) {
    if (this.selection === "multiple") {
      syncCheckboxes(selectedItem);
    } else {
      for (const item of this.treeItems) {
        if (item !== selectedItem) {
          item.selected = false;
        }
      }
    }
  }
  selectItem(selectedItem) {
    if (this.selection === "multiple") {
      selectedItem.selected = !selectedItem.selected;
      if (selectedItem.lazy) {
        selectedItem.expanded = true;
      }
      this.syncTreeItems(selectedItem);
    } else if (this.selection === "single" || selectedItem.isLeaf) {
      selectedItem.expanded = !selectedItem.expanded;
      selectedItem.selected = true;
      this.syncTreeItems(selectedItem);
    } else if (this.selection === "leaf") {
      selectedItem.expanded = !selectedItem.expanded;
    }
    this.emit("sl-selection-change", { detail: { selection: this.selectedItems } });
  }
  get selectedItems() {
    const items = [...this.treeItems];
    const isSelected = (item) => item.selected;
    return items.filter(isSelected);
  }
  getFocusableItems() {
    const collapsedItems = /* @__PURE__ */ new Set();
    return [...this.treeItems].filter((item) => {
      var _a;
      if (item.disabled)
        return false;
      const parent = (_a = item.parentElement) == null ? void 0 : _a.closest("[role=treeitem]");
      if (parent && (!parent.expanded || parent.loading || collapsedItems.has(parent))) {
        collapsedItems.add(item);
      }
      return !collapsedItems.has(item);
    });
  }
  focusItem(item) {
    item == null ? void 0 : item.focus();
  }
  handleKeyDown(event) {
    if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End", "Enter", " "].includes(event.key)) {
      return;
    }
    const items = this.getFocusableItems();
    const isLtr = this.localize.dir() === "ltr";
    const isRtl = this.localize.dir() === "rtl";
    if (items.length > 0) {
      event.preventDefault();
      const activeItemIndex = items.findIndex((item) => item.matches(":focus"));
      const activeItem = items[activeItemIndex];
      const focusItemAt = (index) => {
        const item = items[clamp(index, 0, items.length - 1)];
        this.focusItem(item);
      };
      const toggleExpand = (expanded) => {
        activeItem.expanded = expanded;
      };
      if (event.key === "ArrowDown") {
        focusItemAt(activeItemIndex + 1);
      } else if (event.key === "ArrowUp") {
        focusItemAt(activeItemIndex - 1);
      } else if (isLtr && event.key === "ArrowRight" || isRtl && event.key === "ArrowLeft") {
        if (!activeItem || activeItem.disabled || activeItem.expanded || activeItem.isLeaf && !activeItem.lazy) {
          focusItemAt(activeItemIndex + 1);
        } else {
          toggleExpand(true);
        }
      } else if (isLtr && event.key === "ArrowLeft" || isRtl && event.key === "ArrowRight") {
        if (!activeItem || activeItem.disabled || activeItem.isLeaf || !activeItem.expanded) {
          focusItemAt(activeItemIndex - 1);
        } else {
          toggleExpand(false);
        }
      } else if (event.key === "Home") {
        focusItemAt(0);
      } else if (event.key === "End") {
        focusItemAt(items.length - 1);
      } else if (event.key === "Enter" || event.key === " ") {
        if (!activeItem.disabled) {
          this.selectItem(activeItem);
        }
      }
    }
  }
  handleClick(event) {
    const target = event.target;
    const treeItem = target.closest("sl-tree-item");
    const isExpandButton = event.composedPath().some((el) => {
      var _a;
      return (_a = el == null ? void 0 : el.classList) == null ? void 0 : _a.contains("tree-item__expand-button");
    });
    if (!treeItem || treeItem.disabled) {
      return;
    }
    if (this.selection === "multiple" && isExpandButton) {
      treeItem.expanded = !treeItem.expanded;
    } else {
      this.selectItem(treeItem);
    }
  }
  updateItems() {
    this.treeItems = [...this.querySelectorAll("sl-tree-item")];
    [...this.treeItems].forEach(this.initTreeItem);
  }
  render() {
    return y`
      <div part="base" class="tree" @click=${this.handleClick} @keydown=${this.handleKeyDown}>
        <slot @slotchange=${this.updateItems}></slot>
        <slot name="expand-icon" hidden aria-hidden="true"> </slot>
        <slot name="collapse-icon" hidden aria-hidden="true"> </slot>
      </div>
    `;
  }
};
SlTree.styles = tree_styles_default;
__decorateClass([
  i("slot:not([name])")
], SlTree.prototype, "defaultSlot", 2);
__decorateClass([
  i("slot[name=expand-icon]")
], SlTree.prototype, "expandedIconSlot", 2);
__decorateClass([
  i("slot[name=collapse-icon]")
], SlTree.prototype, "collapsedIconSlot", 2);
__decorateClass([
  e2()
], SlTree.prototype, "selection", 2);
__decorateClass([
  watch("selection")
], SlTree.prototype, "handleSelectionChange", 1);
SlTree = __decorateClass([
  e("sl-tree")
], SlTree);

export {
  SlTree
};
