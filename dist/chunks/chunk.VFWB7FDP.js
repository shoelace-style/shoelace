import {
  image_comparer_styles_default
} from "./chunk.GQFOEDYW.js";
import {
  drag
} from "./chunk.3IKDTLPG.js";
import {
  clamp
} from "./chunk.43G6GBOK.js";
import {
  i as i2
} from "./chunk.EN5QK32J.js";
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

// src/components/image-comparer/image-comparer.ts
var SlImageComparer = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.position = 50;
  }
  handleDrag(event) {
    const { width } = this.base.getBoundingClientRect();
    const isRtl = this.localize.dir() === "rtl";
    event.preventDefault();
    drag(this.base, {
      onMove: (x) => {
        this.position = parseFloat(clamp(x / width * 100, 0, 100).toFixed(2));
        if (isRtl)
          this.position = 100 - this.position;
      },
      initialEvent: event
    });
  }
  handleKeyDown(event) {
    const isLtr = this.localize.dir() === "ltr";
    const isRtl = this.localize.dir() === "rtl";
    if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
      const incr = event.shiftKey ? 10 : 1;
      let newPosition = this.position;
      event.preventDefault();
      if (isLtr && event.key === "ArrowLeft" || isRtl && event.key === "ArrowRight") {
        newPosition -= incr;
      }
      if (isLtr && event.key === "ArrowRight" || isRtl && event.key === "ArrowLeft") {
        newPosition += incr;
      }
      if (event.key === "Home") {
        newPosition = 0;
      }
      if (event.key === "End") {
        newPosition = 100;
      }
      newPosition = clamp(newPosition, 0, 100);
      this.position = newPosition;
    }
  }
  handlePositionChange() {
    this.emit("sl-change");
  }
  render() {
    const isRtl = this.localize.dir() === "rtl";
    return y`
      <div
        part="base"
        id="image-comparer"
        class=${o({
      "image-comparer": true,
      "image-comparer--rtl": isRtl
    })}
        @keydown=${this.handleKeyDown}
      >
        <div class="image-comparer__image">
          <div part="before" class="image-comparer__before">
            <slot name="before"></slot>
          </div>

          <div
            part="after"
            class="image-comparer__after"
            style=${i2({
      clipPath: isRtl ? `inset(0 0 0 ${100 - this.position}%)` : `inset(0 ${100 - this.position}% 0 0)`
    })}
          >
            <slot name="after"></slot>
          </div>
        </div>

        <div
          part="divider"
          class="image-comparer__divider"
          style=${i2({
      left: isRtl ? `${100 - this.position}%` : `${this.position}%`
    })}
          @mousedown=${this.handleDrag}
          @touchstart=${this.handleDrag}
        >
          <div
            part="handle"
            class="image-comparer__handle"
            role="scrollbar"
            aria-valuenow=${this.position}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-controls="image-comparer"
            tabindex="0"
          >
            <slot name="handle-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g fill="currentColor" fill-rule="nonzero">
                  <path
                    d="m21.14 12.55-5.482 4.796c-.646.566-1.658.106-1.658-.753V7a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506h.001ZM2.341 12.55l5.482 4.796c.646.566 1.658.106 1.658-.753V7a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506h-.001Z"
                  />
                </g>
              </svg>
            </slot>
          </div>
        </div>
      </div>
    `;
  }
};
SlImageComparer.styles = image_comparer_styles_default;
__decorateClass([
  i(".image-comparer")
], SlImageComparer.prototype, "base", 2);
__decorateClass([
  i(".image-comparer__handle")
], SlImageComparer.prototype, "handle", 2);
__decorateClass([
  e2({ type: Number, reflect: true })
], SlImageComparer.prototype, "position", 2);
__decorateClass([
  watch("position", { waitUntilFirstUpdate: true })
], SlImageComparer.prototype, "handlePositionChange", 1);
SlImageComparer = __decorateClass([
  e("sl-image-comparer")
], SlImageComparer);

export {
  SlImageComparer
};
