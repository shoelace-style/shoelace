import {
  breadcrumb_item_styles_default
} from "./chunk.JM6B3QFF.js";
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
  e2
} from "./chunk.ACZ6PQE4.js";
import {
  y
} from "./chunk.BNCM3323.js";
import {
  __decorateClass
} from "./chunk.WN26B4OP.js";

// src/components/breadcrumb-item/breadcrumb-item.ts
var SlBreadcrumbItem = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.hasSlotController = new HasSlotController(this, "prefix", "suffix");
    this.rel = "noreferrer noopener";
  }
  render() {
    const isLink = this.href ? true : false;
    return y`
      <div
        part="base"
        class=${o({
      "breadcrumb-item": true,
      "breadcrumb-item--has-prefix": this.hasSlotController.test("prefix"),
      "breadcrumb-item--has-suffix": this.hasSlotController.test("suffix")
    })}
      >
        <span part="prefix" class="breadcrumb-item__prefix">
          <slot name="prefix"></slot>
        </span>

        ${isLink ? y`
              <a
                part="label"
                class="breadcrumb-item__label breadcrumb-item__label--link"
                href="${this.href}"
                target="${l(this.target ? this.target : void 0)}"
                rel=${l(this.target ? this.rel : void 0)}
              >
                <slot></slot>
              </a>
            ` : y`
              <button part="label" type="button" class="breadcrumb-item__label breadcrumb-item__label--button">
                <slot></slot>
              </button>
            `}

        <span part="suffix" class="breadcrumb-item__suffix">
          <slot name="suffix"></slot>
        </span>

        <span part="separator" class="breadcrumb-item__separator" aria-hidden="true">
          <slot name="separator"></slot>
        </span>
      </div>
    `;
  }
};
SlBreadcrumbItem.styles = breadcrumb_item_styles_default;
__decorateClass([
  e2()
], SlBreadcrumbItem.prototype, "href", 2);
__decorateClass([
  e2()
], SlBreadcrumbItem.prototype, "target", 2);
__decorateClass([
  e2()
], SlBreadcrumbItem.prototype, "rel", 2);
SlBreadcrumbItem = __decorateClass([
  e("sl-breadcrumb-item")
], SlBreadcrumbItem);

export {
  SlBreadcrumbItem
};
