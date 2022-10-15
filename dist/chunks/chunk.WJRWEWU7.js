import {
  watch
} from "./chunk.HFHIZRKF.js";
import {
  ShoelaceElement,
  e,
  e2,
  e3
} from "./chunk.ACZ6PQE4.js";
import {
  animation_styles_default
} from "./chunk.Q7H2ZZL6.js";
import {
  y
} from "./chunk.BNCM3323.js";
import {
  dist_exports
} from "./chunk.IJGTCZEI.js";
import {
  __decorateClass
} from "./chunk.WN26B4OP.js";

// src/components/animation/animation.ts
var SlAnimation = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.hasStarted = false;
    this.name = "none";
    this.play = false;
    this.delay = 0;
    this.direction = "normal";
    this.duration = 1e3;
    this.easing = "linear";
    this.endDelay = 0;
    this.fill = "auto";
    this.iterations = Infinity;
    this.iterationStart = 0;
    this.playbackRate = 1;
  }
  get currentTime() {
    var _a, _b;
    return (_b = (_a = this.animation) == null ? void 0 : _a.currentTime) != null ? _b : 0;
  }
  set currentTime(time) {
    if (this.animation) {
      this.animation.currentTime = time;
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.createAnimation();
    this.handleAnimationCancel = this.handleAnimationCancel.bind(this);
    this.handleAnimationFinish = this.handleAnimationFinish.bind(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.destroyAnimation();
  }
  handleAnimationChange() {
    if (!this.hasUpdated) {
      return;
    }
    this.createAnimation();
  }
  handleAnimationFinish() {
    this.play = false;
    this.hasStarted = false;
    this.emit("sl-finish");
  }
  handleAnimationCancel() {
    this.play = false;
    this.hasStarted = false;
    this.emit("sl-cancel");
  }
  handlePlayChange() {
    if (this.animation) {
      if (this.play && !this.hasStarted) {
        this.hasStarted = true;
        this.emit("sl-start");
      }
      if (this.play) {
        this.animation.play();
      } else {
        this.animation.pause();
      }
      return true;
    }
    return false;
  }
  handlePlaybackRateChange() {
    if (this.animation) {
      this.animation.playbackRate = this.playbackRate;
    }
  }
  handleSlotChange() {
    this.destroyAnimation();
    this.createAnimation();
  }
  async createAnimation() {
    var _a, _b;
    const easing = (_a = dist_exports.easings[this.easing]) != null ? _a : this.easing;
    const keyframes = (_b = this.keyframes) != null ? _b : dist_exports[this.name];
    const slot = await this.defaultSlot;
    const element = slot.assignedElements()[0];
    if (!element || !keyframes) {
      return false;
    }
    this.destroyAnimation();
    this.animation = element.animate(keyframes, {
      delay: this.delay,
      direction: this.direction,
      duration: this.duration,
      easing,
      endDelay: this.endDelay,
      fill: this.fill,
      iterationStart: this.iterationStart,
      iterations: this.iterations
    });
    this.animation.playbackRate = this.playbackRate;
    this.animation.addEventListener("cancel", this.handleAnimationCancel);
    this.animation.addEventListener("finish", this.handleAnimationFinish);
    if (this.play) {
      this.hasStarted = true;
      this.emit("sl-start");
    } else {
      this.animation.pause();
    }
    return true;
  }
  destroyAnimation() {
    if (this.animation) {
      this.animation.cancel();
      this.animation.removeEventListener("cancel", this.handleAnimationCancel);
      this.animation.removeEventListener("finish", this.handleAnimationFinish);
      this.hasStarted = false;
    }
  }
  cancel() {
    var _a;
    (_a = this.animation) == null ? void 0 : _a.cancel();
  }
  finish() {
    var _a;
    (_a = this.animation) == null ? void 0 : _a.finish();
  }
  render() {
    return y` <slot @slotchange=${this.handleSlotChange}></slot> `;
  }
};
SlAnimation.styles = animation_styles_default;
__decorateClass([
  e3("slot")
], SlAnimation.prototype, "defaultSlot", 2);
__decorateClass([
  e2()
], SlAnimation.prototype, "name", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlAnimation.prototype, "play", 2);
__decorateClass([
  e2({ type: Number })
], SlAnimation.prototype, "delay", 2);
__decorateClass([
  e2()
], SlAnimation.prototype, "direction", 2);
__decorateClass([
  e2({ type: Number })
], SlAnimation.prototype, "duration", 2);
__decorateClass([
  e2()
], SlAnimation.prototype, "easing", 2);
__decorateClass([
  e2({ attribute: "end-delay", type: Number })
], SlAnimation.prototype, "endDelay", 2);
__decorateClass([
  e2()
], SlAnimation.prototype, "fill", 2);
__decorateClass([
  e2({ type: Number })
], SlAnimation.prototype, "iterations", 2);
__decorateClass([
  e2({ attribute: "iteration-start", type: Number })
], SlAnimation.prototype, "iterationStart", 2);
__decorateClass([
  e2({ attribute: false })
], SlAnimation.prototype, "keyframes", 2);
__decorateClass([
  e2({ attribute: "playback-rate", type: Number })
], SlAnimation.prototype, "playbackRate", 2);
__decorateClass([
  watch("name"),
  watch("delay"),
  watch("direction"),
  watch("duration"),
  watch("easing"),
  watch("endDelay"),
  watch("fill"),
  watch("iterations"),
  watch("iterationsStart"),
  watch("keyframes")
], SlAnimation.prototype, "handleAnimationChange", 1);
__decorateClass([
  watch("play")
], SlAnimation.prototype, "handlePlayChange", 1);
__decorateClass([
  watch("playbackRate")
], SlAnimation.prototype, "handlePlaybackRateChange", 1);
SlAnimation = __decorateClass([
  e("sl-animation")
], SlAnimation);

export {
  SlAnimation
};
