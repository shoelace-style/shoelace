import {
  avatar_styles_default
} from "./chunk.4CN65VZX.js";
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
  t
} from "./chunk.ACZ6PQE4.js";
import {
  y
} from "./chunk.BNCM3323.js";
import {
  __decorateClass
} from "./chunk.WN26B4OP.js";

// src/components/avatar/avatar.ts
var SlAvatar = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.hasError = false;
    this.image = "";
    this.label = "";
    this.initials = "";
    this.shape = "circle";
  }
  handleImageChange() {
    this.hasError = false;
  }
  render() {
    return y`
      <div
        part="base"
        class=${o({
      avatar: true,
      "avatar--circle": this.shape === "circle",
      "avatar--rounded": this.shape === "rounded",
      "avatar--square": this.shape === "square"
    })}
        role="img"
        aria-label=${this.label}
      >
        ${this.initials ? y` <div part="initials" class="avatar__initials">${this.initials}</div> ` : y`
              <div part="icon" class="avatar__icon" aria-hidden="true">
                <slot name="icon">
                  <sl-icon name="person-fill" library="system"></sl-icon>
                </slot>
              </div>
            `}
        ${this.image && !this.hasError ? y`
              <img
                part="image"
                class="avatar__image"
                src="${this.image}"
                alt=""
                @error="${() => this.hasError = true}"
              />
            ` : ""}
      </div>
    `;
  }
};
SlAvatar.styles = avatar_styles_default;
__decorateClass([
  t()
], SlAvatar.prototype, "hasError", 2);
__decorateClass([
  e2()
], SlAvatar.prototype, "image", 2);
__decorateClass([
  e2()
], SlAvatar.prototype, "label", 2);
__decorateClass([
  e2()
], SlAvatar.prototype, "initials", 2);
__decorateClass([
  e2({ reflect: true })
], SlAvatar.prototype, "shape", 2);
__decorateClass([
  watch("image")
], SlAvatar.prototype, "handleImageChange", 1);
SlAvatar = __decorateClass([
  e("sl-avatar")
], SlAvatar);

export {
  SlAvatar
};
