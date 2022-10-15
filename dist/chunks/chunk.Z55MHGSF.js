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
  checkbox_styles_default
} from "./chunk.E6U74ELO.js";
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

// src/components/checkbox/checkbox.ts
var SlCheckbox = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.formSubmitController = new FormSubmitController(this, {
      value: (control) => control.checked ? control.value || "on" : void 0,
      defaultValue: (control) => control.defaultChecked,
      setValue: (control, checked) => control.checked = checked
    });
    this.hasFocus = false;
    this.disabled = false;
    this.required = false;
    this.checked = false;
    this.indeterminate = false;
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
  handleClick() {
    this.checked = !this.checked;
    this.indeterminate = false;
    this.emit("sl-change");
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleDisabledChange() {
    this.input.disabled = this.disabled;
    this.invalid = !this.input.checkValidity();
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  handleStateChange() {
    this.invalid = !this.input.checkValidity();
  }
  render() {
    return y`
      <label
        part="base"
        class=${o({
      checkbox: true,
      "checkbox--checked": this.checked,
      "checkbox--disabled": this.disabled,
      "checkbox--focused": this.hasFocus,
      "checkbox--indeterminate": this.indeterminate
    })}
      >
        <input
          class="checkbox__input"
          type="checkbox"
          name=${l(this.name)}
          value=${l(this.value)}
          .indeterminate=${l2(this.indeterminate)}
          .checked=${l2(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          aria-checked=${this.checked ? "true" : "false"}
          @click=${this.handleClick}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
        />

        <span part="control" class="checkbox__control">
          ${this.checked ? y`
                <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                    <g stroke="currentColor" stroke-width="2">
                      <g transform="translate(3.428571, 3.428571)">
                        <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
                        <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
                      </g>
                    </g>
                  </g>
                </svg>
              ` : ""}
          ${!this.checked && this.indeterminate ? y`
                <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                    <g stroke="currentColor" stroke-width="2">
                      <g transform="translate(2.285714, 6.857143)">
                        <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
                      </g>
                    </g>
                  </g>
                </svg>
              ` : ""}
        </span>

        <span part="label" class="checkbox__label">
          <slot></slot>
        </span>
      </label>
    `;
  }
};
SlCheckbox.styles = checkbox_styles_default;
__decorateClass([
  i('input[type="checkbox"]')
], SlCheckbox.prototype, "input", 2);
__decorateClass([
  t()
], SlCheckbox.prototype, "hasFocus", 2);
__decorateClass([
  e2()
], SlCheckbox.prototype, "name", 2);
__decorateClass([
  e2()
], SlCheckbox.prototype, "value", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlCheckbox.prototype, "disabled", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlCheckbox.prototype, "required", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlCheckbox.prototype, "checked", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlCheckbox.prototype, "indeterminate", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlCheckbox.prototype, "invalid", 2);
__decorateClass([
  defaultValue("checked")
], SlCheckbox.prototype, "defaultChecked", 2);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], SlCheckbox.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("checked", { waitUntilFirstUpdate: true }),
  watch("indeterminate", { waitUntilFirstUpdate: true })
], SlCheckbox.prototype, "handleStateChange", 1);
SlCheckbox = __decorateClass([
  e("sl-checkbox")
], SlCheckbox);

export {
  SlCheckbox
};
