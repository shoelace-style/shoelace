import {
  switch_styles_default
} from "./chunk.6KD7Y6GC.js";
import {
  l as l2
} from "./chunk.OXYZDAKV.js";
import {
  defaultValue
} from "./chunk.BLHFUTJ5.js";
import {
  FormSubmitController
} from "./chunk.V7A7LZPG.js";
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
  i,
  t
} from "./chunk.ACZ6PQE4.js";
import {
  y
} from "./chunk.BNCM3323.js";
import {
  __decorateClass
} from "./chunk.WN26B4OP.js";

// src/components/switch/switch.ts
var SlSwitch = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.formSubmitController = new FormSubmitController(this, {
      value: (control) => control.checked ? control.value : void 0,
      defaultValue: (control) => control.defaultChecked,
      setValue: (control, checked) => control.checked = checked
    });
    this.hasFocus = false;
    this.disabled = false;
    this.required = false;
    this.checked = false;
    this.invalid = false;
    this.defaultChecked = false;
  }
  firstUpdated() {
    this.invalid = !this.input.checkValidity();
  }
  click() {
    this.input.click();
  }
  focus(options) {
    this.input.focus(options);
  }
  blur() {
    this.input.blur();
  }
  reportValidity() {
    return this.input.reportValidity();
  }
  setCustomValidity(message) {
    this.input.setCustomValidity(message);
    this.invalid = !this.input.checkValidity();
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleCheckedChange() {
    this.input.checked = this.checked;
    this.invalid = !this.input.checkValidity();
  }
  handleClick() {
    this.checked = !this.checked;
    this.emit("sl-change");
  }
  handleDisabledChange() {
    this.input.disabled = this.disabled;
    this.invalid = !this.input.checkValidity();
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  handleKeyDown(event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      this.checked = false;
      this.emit("sl-change");
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      this.checked = true;
      this.emit("sl-change");
    }
  }
  render() {
    return y`
      <label
        part="base"
        class=${o({
      switch: true,
      "switch--checked": this.checked,
      "switch--disabled": this.disabled,
      "switch--focused": this.hasFocus
    })}
      >
        <input
          class="switch__input"
          type="checkbox"
          name=${l(this.name)}
          value=${l(this.value)}
          .checked=${l2(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          role="switch"
          aria-checked=${this.checked ? "true" : "false"}
          @click=${this.handleClick}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @keydown=${this.handleKeyDown}
        />

        <span part="control" class="switch__control">
          <span part="thumb" class="switch__thumb"></span>
        </span>

        <span part="label" class="switch__label">
          <slot></slot>
        </span>
      </label>
    `;
  }
};
SlSwitch.styles = switch_styles_default;
__decorateClass([
  i('input[type="checkbox"]')
], SlSwitch.prototype, "input", 2);
__decorateClass([
  t()
], SlSwitch.prototype, "hasFocus", 2);
__decorateClass([
  e2()
], SlSwitch.prototype, "name", 2);
__decorateClass([
  e2()
], SlSwitch.prototype, "value", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlSwitch.prototype, "disabled", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlSwitch.prototype, "required", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlSwitch.prototype, "checked", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlSwitch.prototype, "invalid", 2);
__decorateClass([
  defaultValue("checked")
], SlSwitch.prototype, "defaultChecked", 2);
__decorateClass([
  watch("checked", { waitUntilFirstUpdate: true })
], SlSwitch.prototype, "handleCheckedChange", 1);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], SlSwitch.prototype, "handleDisabledChange", 1);
SlSwitch = __decorateClass([
  e("sl-switch")
], SlSwitch);

export {
  SlSwitch
};
