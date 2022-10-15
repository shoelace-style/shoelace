import {
  skeleton_styles_default
} from "./chunk.CTEQM35P.js";
import {
  o
} from "./chunk.KXNOOZ7Z.js";
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

// src/components/skeleton/skeleton.ts
var SlSkeleton = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.effect = "none";
  }
  render() {
    return y`
      <div
        part="base"
        class=${o({
      skeleton: true,
      "skeleton--pulse": this.effect === "pulse",
      "skeleton--sheen": this.effect === "sheen"
    })}
        aria-busy="true"
        aria-live="polite"
      >
        <div part="indicator" class="skeleton__indicator"></div>
      </div>
    `;
  }
};
SlSkeleton.styles = skeleton_styles_default;
__decorateClass([
  e2()
], SlSkeleton.prototype, "effect", 2);
SlSkeleton = __decorateClass([
  e("sl-skeleton")
], SlSkeleton);

export {
  SlSkeleton
};
