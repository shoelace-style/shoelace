import {
  drawer_styles_default
} from "./chunk.VO234CYY.js";
import {
  Modal
} from "./chunk.PGOLEULU.js";
import {
  lockBodyScrolling,
  unlockBodyScrolling
} from "./chunk.H262HIXG.js";
import {
  waitForEvent
} from "./chunk.B4BZKR24.js";
import {
  animateTo,
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
  HasSlotController
} from "./chunk.3IYPB6RR.js";
import {
  o
} from "./chunk.KXNOOZ7Z.js";
import {
  l
} from "./chunk.BAJRIPUC.js";
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

// src/internal/string.ts
function uppercaseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// src/components/drawer/drawer.ts
var SlDrawer = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.hasSlotController = new HasSlotController(this, "footer");
    this.localize = new LocalizeController(this);
    this.open = false;
    this.label = "";
    this.placement = "end";
    this.contained = false;
    this.noHeader = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.modal = new Modal(this);
  }
  firstUpdated() {
    this.drawer.hidden = !this.open;
    if (this.open && !this.contained) {
      this.modal.activate();
      lockBodyScrolling(this);
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    unlockBodyScrolling(this);
  }
  async show() {
    if (this.open) {
      return void 0;
    }
    this.open = true;
    return waitForEvent(this, "sl-after-show");
  }
  async hide() {
    if (!this.open) {
      return void 0;
    }
    this.open = false;
    return waitForEvent(this, "sl-after-hide");
  }
  requestClose(source) {
    const slRequestClose = this.emit("sl-request-close", {
      cancelable: true,
      detail: { source }
    });
    if (slRequestClose.defaultPrevented) {
      const animation = getAnimation(this, "drawer.denyClose", { dir: this.localize.dir() });
      animateTo(this.panel, animation.keyframes, animation.options);
      return;
    }
    this.hide();
  }
  handleKeyDown(event) {
    if (event.key === "Escape") {
      event.stopPropagation();
      this.requestClose("keyboard");
    }
  }
  async handleOpenChange() {
    if (this.open) {
      this.emit("sl-show");
      this.originalTrigger = document.activeElement;
      if (!this.contained) {
        this.modal.activate();
        lockBodyScrolling(this);
      }
      const autoFocusTarget = this.querySelector("[autofocus]");
      if (autoFocusTarget) {
        autoFocusTarget.removeAttribute("autofocus");
      }
      await Promise.all([stopAnimations(this.drawer), stopAnimations(this.overlay)]);
      this.drawer.hidden = false;
      requestAnimationFrame(() => {
        const slInitialFocus = this.emit("sl-initial-focus", { cancelable: true });
        if (!slInitialFocus.defaultPrevented) {
          if (autoFocusTarget) {
            autoFocusTarget.focus({ preventScroll: true });
          } else {
            this.panel.focus({ preventScroll: true });
          }
        }
        if (autoFocusTarget) {
          autoFocusTarget.setAttribute("autofocus", "");
        }
      });
      const panelAnimation = getAnimation(this, `drawer.show${uppercaseFirstLetter(this.placement)}`, {
        dir: this.localize.dir()
      });
      const overlayAnimation = getAnimation(this, "drawer.overlay.show", { dir: this.localize.dir() });
      await Promise.all([
        animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options),
        animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options)
      ]);
      this.emit("sl-after-show");
    } else {
      this.emit("sl-hide");
      this.modal.deactivate();
      unlockBodyScrolling(this);
      await Promise.all([stopAnimations(this.drawer), stopAnimations(this.overlay)]);
      const panelAnimation = getAnimation(this, `drawer.hide${uppercaseFirstLetter(this.placement)}`, {
        dir: this.localize.dir()
      });
      const overlayAnimation = getAnimation(this, "drawer.overlay.hide", { dir: this.localize.dir() });
      await Promise.all([
        animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options).then(() => {
          this.overlay.hidden = true;
        }),
        animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options).then(() => {
          this.panel.hidden = true;
        })
      ]);
      this.drawer.hidden = true;
      this.overlay.hidden = false;
      this.panel.hidden = false;
      const trigger = this.originalTrigger;
      if (typeof (trigger == null ? void 0 : trigger.focus) === "function") {
        setTimeout(() => trigger.focus());
      }
      this.emit("sl-after-hide");
    }
  }
  render() {
    return y`
      <div
        part="base"
        class=${o({
      drawer: true,
      "drawer--open": this.open,
      "drawer--top": this.placement === "top",
      "drawer--end": this.placement === "end",
      "drawer--bottom": this.placement === "bottom",
      "drawer--start": this.placement === "start",
      "drawer--contained": this.contained,
      "drawer--fixed": !this.contained,
      "drawer--rtl": this.localize.dir() === "rtl",
      "drawer--has-footer": this.hasSlotController.test("footer")
    })}
        @keydown=${this.handleKeyDown}
      >
        <div part="overlay" class="drawer__overlay" @click=${() => this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open ? "false" : "true"}
          aria-label=${l(this.noHeader ? this.label : void 0)}
          aria-labelledby=${l(!this.noHeader ? "title" : void 0)}
          tabindex="0"
        >
          ${!this.noHeader ? y`
                <header part="header" class="drawer__header">
                  <h2 part="title" class="drawer__title" id="title">
                    <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                    <slot name="label"> ${this.label.length > 0 ? this.label : String.fromCharCode(65279)} </slot>
                  </h2>
                  <sl-icon-button
                    part="close-button"
                    exportparts="base:close-button__base"
                    class="drawer__close"
                    name="x"
                    label=${this.localize.term("close")}
                    library="system"
                    @click=${() => this.requestClose("close-button")}
                  ></sl-icon-button>
                </header>
              ` : ""}

          <div part="body" class="drawer__body">
            <slot></slot>
          </div>

          <footer part="footer" class="drawer__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `;
  }
};
SlDrawer.styles = drawer_styles_default;
__decorateClass([
  i(".drawer")
], SlDrawer.prototype, "drawer", 2);
__decorateClass([
  i(".drawer__panel")
], SlDrawer.prototype, "panel", 2);
__decorateClass([
  i(".drawer__overlay")
], SlDrawer.prototype, "overlay", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlDrawer.prototype, "open", 2);
__decorateClass([
  e2({ reflect: true })
], SlDrawer.prototype, "label", 2);
__decorateClass([
  e2({ reflect: true })
], SlDrawer.prototype, "placement", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlDrawer.prototype, "contained", 2);
__decorateClass([
  e2({ attribute: "no-header", type: Boolean, reflect: true })
], SlDrawer.prototype, "noHeader", 2);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], SlDrawer.prototype, "handleOpenChange", 1);
SlDrawer = __decorateClass([
  e("sl-drawer")
], SlDrawer);
setDefaultAnimation("drawer.showTop", {
  keyframes: [
    { opacity: 0, transform: "translateY(-100%)" },
    { opacity: 1, transform: "translateY(0)" }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("drawer.hideTop", {
  keyframes: [
    { opacity: 1, transform: "translateY(0)" },
    { opacity: 0, transform: "translateY(-100%)" }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("drawer.showEnd", {
  keyframes: [
    { opacity: 0, transform: "translateX(100%)" },
    { opacity: 1, transform: "translateX(0)" }
  ],
  rtlKeyframes: [
    { opacity: 0, transform: "translateX(-100%)" },
    { opacity: 1, transform: "translateX(0)" }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("drawer.hideEnd", {
  keyframes: [
    { opacity: 1, transform: "translateX(0)" },
    { opacity: 0, transform: "translateX(100%)" }
  ],
  rtlKeyframes: [
    { opacity: 1, transform: "translateX(0)" },
    { opacity: 0, transform: "translateX(-100%)" }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("drawer.showBottom", {
  keyframes: [
    { opacity: 0, transform: "translateY(100%)" },
    { opacity: 1, transform: "translateY(0)" }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("drawer.hideBottom", {
  keyframes: [
    { opacity: 1, transform: "translateY(0)" },
    { opacity: 0, transform: "translateY(100%)" }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("drawer.showStart", {
  keyframes: [
    { opacity: 0, transform: "translateX(-100%)" },
    { opacity: 1, transform: "translateX(0)" }
  ],
  rtlKeyframes: [
    { opacity: 0, transform: "translateX(100%)" },
    { opacity: 1, transform: "translateX(0)" }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("drawer.hideStart", {
  keyframes: [
    { opacity: 1, transform: "translateX(0)" },
    { opacity: 0, transform: "translateX(-100%)" }
  ],
  rtlKeyframes: [
    { opacity: 1, transform: "translateX(0)" },
    { opacity: 0, transform: "translateX(100%)" }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("drawer.denyClose", {
  keyframes: [{ transform: "scale(1)" }, { transform: "scale(1.01)" }, { transform: "scale(1)" }],
  options: { duration: 250 }
});
setDefaultAnimation("drawer.overlay.show", {
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  options: { duration: 250 }
});
setDefaultAnimation("drawer.overlay.hide", {
  keyframes: [{ opacity: 1 }, { opacity: 0 }],
  options: { duration: 250 }
});

export {
  SlDrawer
};
