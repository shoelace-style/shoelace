import {
  Modal
} from "./chunk.PGOLEULU.js";
import {
  lockBodyScrolling,
  unlockBodyScrolling
} from "./chunk.H262HIXG.js";
import {
  dialog_styles_default
} from "./chunk.32EYYGZ5.js";
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

// src/components/dialog/dialog.ts
var SlDialog = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.hasSlotController = new HasSlotController(this, "footer");
    this.localize = new LocalizeController(this);
    this.open = false;
    this.label = "";
    this.noHeader = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.modal = new Modal(this);
  }
  firstUpdated() {
    this.dialog.hidden = !this.open;
    if (this.open) {
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
      const animation = getAnimation(this, "dialog.denyClose", { dir: this.localize.dir() });
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
      this.modal.activate();
      lockBodyScrolling(this);
      const autoFocusTarget = this.querySelector("[autofocus]");
      if (autoFocusTarget) {
        autoFocusTarget.removeAttribute("autofocus");
      }
      await Promise.all([stopAnimations(this.dialog), stopAnimations(this.overlay)]);
      this.dialog.hidden = false;
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
      const panelAnimation = getAnimation(this, "dialog.show", { dir: this.localize.dir() });
      const overlayAnimation = getAnimation(this, "dialog.overlay.show", { dir: this.localize.dir() });
      await Promise.all([
        animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options),
        animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options)
      ]);
      this.emit("sl-after-show");
    } else {
      this.emit("sl-hide");
      this.modal.deactivate();
      await Promise.all([stopAnimations(this.dialog), stopAnimations(this.overlay)]);
      const panelAnimation = getAnimation(this, "dialog.hide", { dir: this.localize.dir() });
      const overlayAnimation = getAnimation(this, "dialog.overlay.hide", { dir: this.localize.dir() });
      await Promise.all([
        animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options).then(() => {
          this.overlay.hidden = true;
        }),
        animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options).then(() => {
          this.panel.hidden = true;
        })
      ]);
      this.dialog.hidden = true;
      this.overlay.hidden = false;
      this.panel.hidden = false;
      unlockBodyScrolling(this);
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
      dialog: true,
      "dialog--open": this.open,
      "dialog--has-footer": this.hasSlotController.test("footer")
    })}
        @keydown=${this.handleKeyDown}
      >
        <div part="overlay" class="dialog__overlay" @click=${() => this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open ? "false" : "true"}
          aria-label=${l(this.noHeader ? this.label : void 0)}
          aria-labelledby=${l(!this.noHeader ? "title" : void 0)}
          tabindex="0"
        >
          ${!this.noHeader ? y`
                <header part="header" class="dialog__header">
                  <h2 part="title" class="dialog__title" id="title">
                    <slot name="label"> ${this.label.length > 0 ? this.label : String.fromCharCode(65279)} </slot>
                  </h2>
                  <sl-icon-button
                    part="close-button"
                    exportparts="base:close-button__base"
                    class="dialog__close"
                    name="x"
                    label=${this.localize.term("close")}
                    library="system"
                    @click="${() => this.requestClose("close-button")}"
                  ></sl-icon-button>
                </header>
              ` : ""}

          <div part="body" class="dialog__body">
            <slot></slot>
          </div>

          <footer part="footer" class="dialog__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `;
  }
};
SlDialog.styles = dialog_styles_default;
__decorateClass([
  i(".dialog")
], SlDialog.prototype, "dialog", 2);
__decorateClass([
  i(".dialog__panel")
], SlDialog.prototype, "panel", 2);
__decorateClass([
  i(".dialog__overlay")
], SlDialog.prototype, "overlay", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlDialog.prototype, "open", 2);
__decorateClass([
  e2({ reflect: true })
], SlDialog.prototype, "label", 2);
__decorateClass([
  e2({ attribute: "no-header", type: Boolean, reflect: true })
], SlDialog.prototype, "noHeader", 2);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], SlDialog.prototype, "handleOpenChange", 1);
SlDialog = __decorateClass([
  e("sl-dialog")
], SlDialog);
setDefaultAnimation("dialog.show", {
  keyframes: [
    { opacity: 0, transform: "scale(0.8)" },
    { opacity: 1, transform: "scale(1)" }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("dialog.hide", {
  keyframes: [
    { opacity: 1, transform: "scale(1)" },
    { opacity: 0, transform: "scale(0.8)" }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("dialog.denyClose", {
  keyframes: [{ transform: "scale(1)" }, { transform: "scale(1.02)" }, { transform: "scale(1)" }],
  options: { duration: 250 }
});
setDefaultAnimation("dialog.overlay.show", {
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  options: { duration: 250 }
});
setDefaultAnimation("dialog.overlay.hide", {
  keyframes: [{ opacity: 1 }, { opacity: 0 }],
  options: { duration: 250 }
});

export {
  SlDialog
};
