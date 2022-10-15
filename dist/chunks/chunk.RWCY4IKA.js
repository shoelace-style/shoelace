import {
  mutation_observer_styles_default
} from "./chunk.LOKMVRAU.js";
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

// src/components/mutation-observer/mutation-observer.ts
var SlMutationObserver = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.attrOldValue = false;
    this.charData = false;
    this.charDataOldValue = false;
    this.childList = false;
    this.disabled = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.handleMutation = this.handleMutation.bind(this);
    this.mutationObserver = new MutationObserver(this.handleMutation);
    if (!this.disabled) {
      this.startObserver();
    }
  }
  disconnectedCallback() {
    this.stopObserver();
  }
  handleDisabledChange() {
    if (this.disabled) {
      this.stopObserver();
    } else {
      this.startObserver();
    }
  }
  handleChange() {
    this.stopObserver();
    this.startObserver();
  }
  handleMutation(mutationList) {
    this.emit("sl-mutation", {
      detail: { mutationList }
    });
  }
  startObserver() {
    const observeAttributes = typeof this.attr === "string" && this.attr.length > 0;
    const attributeFilter = observeAttributes && this.attr !== "*" ? this.attr.split(" ") : void 0;
    try {
      this.mutationObserver.observe(this, {
        subtree: true,
        childList: this.childList,
        attributes: observeAttributes,
        attributeFilter,
        attributeOldValue: this.attrOldValue,
        characterData: this.charData,
        characterDataOldValue: this.charDataOldValue
      });
    } catch (e3) {
    }
  }
  stopObserver() {
    this.mutationObserver.disconnect();
  }
  render() {
    return y` <slot></slot> `;
  }
};
SlMutationObserver.styles = mutation_observer_styles_default;
__decorateClass([
  e2({ reflect: true })
], SlMutationObserver.prototype, "attr", 2);
__decorateClass([
  e2({ attribute: "attr-old-value", type: Boolean, reflect: true })
], SlMutationObserver.prototype, "attrOldValue", 2);
__decorateClass([
  e2({ attribute: "char-data", type: Boolean, reflect: true })
], SlMutationObserver.prototype, "charData", 2);
__decorateClass([
  e2({ attribute: "char-data-old-value", type: Boolean, reflect: true })
], SlMutationObserver.prototype, "charDataOldValue", 2);
__decorateClass([
  e2({ attribute: "child-list", type: Boolean, reflect: true })
], SlMutationObserver.prototype, "childList", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlMutationObserver.prototype, "disabled", 2);
__decorateClass([
  watch("disabled")
], SlMutationObserver.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("attr", { waitUntilFirstUpdate: true }),
  watch("attr-old-value", { waitUntilFirstUpdate: true }),
  watch("char-data", { waitUntilFirstUpdate: true }),
  watch("char-data-old-value", { waitUntilFirstUpdate: true }),
  watch("childList", { waitUntilFirstUpdate: true })
], SlMutationObserver.prototype, "handleChange", 1);
SlMutationObserver = __decorateClass([
  e("sl-mutation-observer")
], SlMutationObserver);

export {
  SlMutationObserver
};
