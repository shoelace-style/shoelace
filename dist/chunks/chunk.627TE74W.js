import {
  radio_group_styles_default
} from "./chunk.IVIZV7IL.js";
import {
  FormSubmitController
} from "./chunk.V7A7LZPG.js";
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
  i,
  t
} from "./chunk.ACZ6PQE4.js";
import {
  y
} from "./chunk.BNCM3323.js";
import {
  __decorateClass
} from "./chunk.WN26B4OP.js";

// src/components/radio-group/radio-group.ts
var SlRadioGroup = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.formSubmitController = new FormSubmitController(this, {
      defaultValue: (control) => control.defaultValue
    });
    this.hasButtonGroup = false;
    this.errorMessage = "";
    this.customErrorMessage = "";
    this.defaultValue = "";
    this.label = "";
    this.value = "";
    this.name = "option";
    this.invalid = false;
    this.fieldset = false;
    this.required = false;
  }
  handleValueChange() {
    if (this.hasUpdated) {
      this.emit("sl-change");
      this.updateCheckedRadio();
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.defaultValue = this.value;
  }
  setCustomValidity(message = "") {
    this.customErrorMessage = message;
    this.errorMessage = message;
    if (!message) {
      this.invalid = false;
    } else {
      this.invalid = true;
      this.input.setCustomValidity(message);
    }
  }
  get validity() {
    const hasMissingData = !(this.value && this.required || !this.required);
    const hasCustomError = this.customErrorMessage !== "";
    return {
      badInput: false,
      customError: hasCustomError,
      patternMismatch: false,
      rangeOverflow: false,
      rangeUnderflow: false,
      stepMismatch: false,
      tooLong: false,
      tooShort: false,
      typeMismatch: false,
      valid: hasMissingData || hasCustomError ? false : true,
      valueMissing: !hasMissingData
    };
  }
  reportValidity() {
    const validity = this.validity;
    this.errorMessage = this.customErrorMessage || validity.valid ? "" : this.input.validationMessage;
    this.invalid = !validity.valid;
    if (!validity.valid) {
      this.showNativeErrorMessage();
    }
    return !this.invalid;
  }
  getAllRadios() {
    return [...this.querySelectorAll("sl-radio, sl-radio-button")];
  }
  handleRadioClick(event) {
    const target = event.target;
    if (target.disabled) {
      return;
    }
    this.value = target.value;
    const radios = this.getAllRadios();
    radios.forEach((radio) => radio.checked = radio === target);
  }
  handleKeyDown(event) {
    var _a;
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(event.key)) {
      return;
    }
    const radios = this.getAllRadios().filter((radio) => !radio.disabled);
    const checkedRadio = (_a = radios.find((radio) => radio.checked)) != null ? _a : radios[0];
    const incr = event.key === " " ? 0 : ["ArrowUp", "ArrowLeft"].includes(event.key) ? -1 : 1;
    let index = radios.indexOf(checkedRadio) + incr;
    if (index < 0) {
      index = radios.length - 1;
    }
    if (index > radios.length - 1) {
      index = 0;
    }
    this.getAllRadios().forEach((radio) => {
      radio.checked = false;
      if (!this.hasButtonGroup) {
        radio.tabIndex = -1;
      }
    });
    this.value = radios[index].value;
    radios[index].checked = true;
    if (!this.hasButtonGroup) {
      radios[index].tabIndex = 0;
      radios[index].focus();
    } else {
      radios[index].shadowRoot.querySelector("button").focus();
    }
    event.preventDefault();
  }
  handleSlotChange() {
    var _a;
    const radios = this.getAllRadios();
    radios.forEach((radio) => radio.checked = radio.value === this.value);
    this.hasButtonGroup = radios.some((radio) => radio.tagName.toLowerCase() === "sl-radio-button");
    if (!radios.some((radio) => radio.checked)) {
      if (this.hasButtonGroup) {
        const buttonRadio = radios[0].shadowRoot.querySelector("button");
        buttonRadio.tabIndex = 0;
      } else {
        radios[0].tabIndex = 0;
      }
    }
    if (this.hasButtonGroup) {
      const buttonGroup = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector("sl-button-group");
      if (buttonGroup) {
        buttonGroup.disableRole = true;
      }
    }
  }
  showNativeErrorMessage() {
    this.input.hidden = false;
    this.input.reportValidity();
    setTimeout(() => this.input.hidden = true, 1e4);
  }
  updateCheckedRadio() {
    const radios = this.getAllRadios();
    radios.forEach((radio) => radio.checked = radio.value === this.value);
  }
  render() {
    const defaultSlot = y`
      <slot
        @click=${this.handleRadioClick}
        @keydown=${this.handleKeyDown}
        @slotchange=${this.handleSlotChange}
        role="presentation"
      ></slot>
    `;
    return y`
      <fieldset
        part="base"
        role="radiogroup"
        aria-errormessage="radio-error-message"
        aria-invalid="${this.invalid}"
        class=${o({
      "radio-group": true,
      "radio-group--has-fieldset": this.fieldset,
      "radio-group--required": this.required
    })}
      >
        <legend part="label" class="radio-group__label">
          <slot name="label">${this.label}</slot>
        </legend>
        <div class="visually-hidden">
          <div id="radio-error-message" aria-live="assertive">${this.errorMessage}</div>
          <label class="radio-group__validation visually-hidden">
            <input type="text" class="radio-group__validation-input" ?required=${this.required} tabindex="-1" hidden />
          </label>
        </div>
        ${this.hasButtonGroup ? y`
              <sl-button-group part="button-group" exportparts="base:button-group__base">
                ${defaultSlot}
              </sl-button-group>
            ` : defaultSlot}
      </fieldset>
    `;
  }
};
SlRadioGroup.styles = radio_group_styles_default;
__decorateClass([
  i("slot:not([name])")
], SlRadioGroup.prototype, "defaultSlot", 2);
__decorateClass([
  i(".radio-group__validation-input")
], SlRadioGroup.prototype, "input", 2);
__decorateClass([
  t()
], SlRadioGroup.prototype, "hasButtonGroup", 2);
__decorateClass([
  t()
], SlRadioGroup.prototype, "errorMessage", 2);
__decorateClass([
  t()
], SlRadioGroup.prototype, "customErrorMessage", 2);
__decorateClass([
  t()
], SlRadioGroup.prototype, "defaultValue", 2);
__decorateClass([
  e2()
], SlRadioGroup.prototype, "label", 2);
__decorateClass([
  e2({ reflect: true })
], SlRadioGroup.prototype, "value", 2);
__decorateClass([
  e2()
], SlRadioGroup.prototype, "name", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlRadioGroup.prototype, "invalid", 2);
__decorateClass([
  e2({ type: Boolean, attribute: "fieldset", reflect: true })
], SlRadioGroup.prototype, "fieldset", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlRadioGroup.prototype, "required", 2);
__decorateClass([
  watch("value")
], SlRadioGroup.prototype, "handleValueChange", 1);
SlRadioGroup = __decorateClass([
  e("sl-radio-group")
], SlRadioGroup);

export {
  SlRadioGroup
};
