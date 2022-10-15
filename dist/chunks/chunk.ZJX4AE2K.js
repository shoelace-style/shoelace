import {
  select_styles_default
} from "./chunk.RBSSSNYQ.js";
import {
  defaultValue
} from "./chunk.BLHFUTJ5.js";
import {
  FormSubmitController
} from "./chunk.V7A7LZPG.js";
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

// src/components/select/select.ts
var SlSelect = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.formSubmitController = new FormSubmitController(this);
    this.hasSlotController = new HasSlotController(this, "help-text", "label");
    this.localize = new LocalizeController(this);
    this.menuItems = [];
    this.hasFocus = false;
    this.isOpen = false;
    this.displayLabel = "";
    this.displayTags = [];
    this.multiple = false;
    this.maxTagsVisible = 3;
    this.disabled = false;
    this.name = "";
    this.placeholder = "";
    this.size = "medium";
    this.hoist = false;
    this.value = "";
    this.filled = false;
    this.pill = false;
    this.label = "";
    this.placement = "bottom";
    this.helpText = "";
    this.required = false;
    this.clearable = false;
    this.invalid = false;
    this.defaultValue = "";
  }
  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver(() => this.resizeMenu());
    this.updateComplete.then(() => {
      this.resizeObserver.observe(this);
      this.syncItemsFromValue();
    });
  }
  firstUpdated() {
    this.invalid = !this.input.checkValidity();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.unobserve(this);
  }
  reportValidity() {
    return this.input.reportValidity();
  }
  setCustomValidity(message) {
    this.input.setCustomValidity(message);
    this.invalid = !this.input.checkValidity();
  }
  getValueAsArray() {
    if (this.multiple && this.value === "") {
      return [];
    }
    return Array.isArray(this.value) ? this.value : [this.value];
  }
  focus(options) {
    this.control.focus(options);
  }
  blur() {
    this.control.blur();
  }
  handleBlur() {
    if (!this.isOpen) {
      this.hasFocus = false;
      this.emit("sl-blur");
    }
  }
  handleClearClick(event) {
    event.stopPropagation();
    this.value = this.multiple ? [] : "";
    this.emit("sl-clear");
    this.syncItemsFromValue();
  }
  handleDisabledChange() {
    if (this.disabled && this.isOpen) {
      this.dropdown.hide();
    }
    this.input.disabled = this.disabled;
    this.invalid = !this.input.checkValidity();
  }
  handleFocus() {
    if (!this.hasFocus) {
      this.hasFocus = true;
      this.emit("sl-focus");
    }
  }
  handleKeyDown(event) {
    const target = event.target;
    const firstItem = this.menuItems[0];
    const lastItem = this.menuItems[this.menuItems.length - 1];
    if (target.tagName.toLowerCase() === "sl-tag") {
      return;
    }
    if (event.key === "Tab") {
      if (this.isOpen) {
        this.dropdown.hide();
      }
      return;
    }
    if (["ArrowDown", "ArrowUp"].includes(event.key)) {
      event.preventDefault();
      if (!this.isOpen) {
        this.dropdown.show();
      }
      if (event.key === "ArrowDown") {
        this.menu.setCurrentItem(firstItem);
        firstItem.focus();
        return;
      }
      if (event.key === "ArrowUp") {
        this.menu.setCurrentItem(lastItem);
        lastItem.focus();
        return;
      }
    }
    if (event.ctrlKey || event.metaKey) {
      return;
    }
    if (!this.isOpen && event.key.length === 1) {
      event.stopPropagation();
      event.preventDefault();
      this.dropdown.show();
      this.menu.typeToSelect(event);
    }
  }
  handleLabelClick() {
    this.focus();
  }
  handleMenuSelect(event) {
    const item = event.detail.item;
    if (this.multiple) {
      this.value = this.value.includes(item.value) ? this.value.filter((v) => v !== item.value) : [...this.value, item.value];
    } else {
      this.value = item.value;
    }
    this.syncItemsFromValue();
  }
  handleMenuShow() {
    this.resizeMenu();
    this.isOpen = true;
  }
  handleMenuHide() {
    this.isOpen = false;
    this.control.focus();
  }
  handleMenuItemLabelChange() {
    if (!this.multiple) {
      const checkedItem = this.menuItems.find((item) => item.value === this.value);
      this.displayLabel = checkedItem ? checkedItem.getTextLabel() : "";
    }
  }
  handleMultipleChange() {
    var _a;
    const value = this.getValueAsArray();
    this.value = this.multiple ? value : (_a = value[0]) != null ? _a : "";
    this.syncItemsFromValue();
  }
  async handleMenuSlotChange() {
    this.menuItems = [...this.querySelectorAll("sl-menu-item")];
    const values = [];
    this.menuItems.forEach((item) => {
      if (values.includes(item.value)) {
        console.error(`Duplicate value found in <sl-select> menu item: '${item.value}'`, item);
      }
      values.push(item.value);
    });
    await Promise.all(this.menuItems.map((item) => item.render));
    this.syncItemsFromValue();
  }
  handleTagInteraction(event) {
    const path = event.composedPath();
    const clearButton = path.find((el) => {
      if (el instanceof HTMLElement) {
        const element = el;
        return element.classList.contains("tag__remove");
      }
      return false;
    });
    if (clearButton) {
      event.stopPropagation();
    }
  }
  async handleValueChange() {
    this.syncItemsFromValue();
    await this.updateComplete;
    this.invalid = !this.input.checkValidity();
    this.emit("sl-change");
  }
  resizeMenu() {
    this.menu.style.width = `${this.control.clientWidth}px`;
    requestAnimationFrame(() => this.dropdown.reposition());
  }
  syncItemsFromValue() {
    const value = this.getValueAsArray();
    this.menuItems.forEach((item) => item.checked = value.includes(item.value));
    if (this.multiple) {
      const checkedItems = this.menuItems.filter((item) => value.includes(item.value));
      this.displayLabel = checkedItems.length > 0 ? checkedItems[0].getTextLabel() : "";
      this.displayTags = checkedItems.map((item) => {
        return y`
          <sl-tag
            part="tag"
            exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button
            "
            variant="neutral"
            size=${this.size}
            ?pill=${this.pill}
            removable
            @click=${this.handleTagInteraction}
            @keydown=${this.handleTagInteraction}
            @sl-remove=${(event) => {
          event.stopPropagation();
          if (!this.disabled) {
            item.checked = false;
            this.syncValueFromItems();
          }
        }}
          >
            ${item.getTextLabel()}
          </sl-tag>
        `;
      });
      if (this.maxTagsVisible > 0 && this.displayTags.length > this.maxTagsVisible) {
        const total = this.displayTags.length;
        this.displayLabel = "";
        this.displayTags = this.displayTags.slice(0, this.maxTagsVisible);
        this.displayTags.push(y`
          <sl-tag
            part="tag"
            exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button
            "
            variant="neutral"
            size=${this.size}
          >
            +${total - this.maxTagsVisible}
          </sl-tag>
        `);
      }
    } else {
      const checkedItem = this.menuItems.find((item) => item.value === value[0]);
      this.displayLabel = checkedItem ? checkedItem.getTextLabel() : "";
      this.displayTags = [];
    }
  }
  syncValueFromItems() {
    const checkedItems = this.menuItems.filter((item) => item.checked);
    const checkedValues = checkedItems.map((item) => item.value);
    if (this.multiple) {
      this.value = this.value.filter((val) => checkedValues.includes(val));
    } else {
      this.value = checkedValues.length > 0 ? checkedValues[0] : "";
    }
  }
  render() {
    const hasLabelSlot = this.hasSlotController.test("label");
    const hasHelpTextSlot = this.hasSlotController.test("help-text");
    const hasSelection = this.multiple ? this.value.length > 0 : this.value !== "";
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
    const hasClearIcon = this.clearable && !this.disabled && hasSelection;
    return y`
      <div
        part="form-control"
        class=${o({
      "form-control": true,
      "form-control--small": this.size === "small",
      "form-control--medium": this.size === "medium",
      "form-control--large": this.size === "large",
      "form-control--has-label": hasLabel,
      "form-control--has-help-text": hasHelpText
    })}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${hasLabel ? "false" : "true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <sl-dropdown
            part="base"
            .hoist=${this.hoist}
            .placement=${this.placement}
            .stayOpenOnSelect=${this.multiple}
            .containingElement=${this}
            ?disabled=${this.disabled}
            class=${o({
      select: true,
      "select--open": this.isOpen,
      "select--empty": !this.value,
      "select--focused": this.hasFocus,
      "select--clearable": this.clearable,
      "select--disabled": this.disabled,
      "select--multiple": this.multiple,
      "select--standard": !this.filled,
      "select--filled": this.filled,
      "select--has-tags": this.multiple && this.displayTags.length > 0,
      "select--placeholder-visible": this.displayLabel === "",
      "select--small": this.size === "small",
      "select--medium": this.size === "medium",
      "select--large": this.size === "large",
      "select--pill": this.pill,
      "select--invalid": this.invalid
    })}
            @sl-show=${this.handleMenuShow}
            @sl-hide=${this.handleMenuHide}
          >
            <div
              part="control"
              slot="trigger"
              id="input"
              class="select__control"
              role="combobox"
              aria-describedby="help-text"
              aria-haspopup="true"
              aria-disabled=${this.disabled ? "true" : "false"}
              aria-expanded=${this.isOpen ? "true" : "false"}
              aria-controls="menu"
              tabindex=${this.disabled ? "-1" : "0"}
              @blur=${this.handleBlur}
              @focus=${this.handleFocus}
              @keydown=${this.handleKeyDown}
            >
              <span part="prefix" class="select__prefix">
                <slot name="prefix"></slot>
              </span>

              <div part="display-label" class="select__label">
                ${this.displayTags.length > 0 ? y` <span part="tags" class="select__tags"> ${this.displayTags} </span> ` : this.displayLabel.length > 0 ? this.displayLabel : this.placeholder}
              </div>

              ${hasClearIcon ? y`
                    <button
                      part="clear-button"
                      class="select__clear"
                      @click=${this.handleClearClick}
                      aria-label=${this.localize.term("clearEntry")}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <sl-icon name="x-circle-fill" library="system"></sl-icon>
                      </slot>
                    </button>
                  ` : ""}

              <span part="suffix" class="select__suffix">
                <slot name="suffix"></slot>
              </span>

              <span part="icon" class="select__icon" aria-hidden="true">
                <sl-icon name="chevron-down" library="system"></sl-icon>
              </span>

              <!-- The hidden input tricks the browser's built-in validation so it works as expected. We use an input
              instead of a select because, otherwise, iOS will show a list of options during validation. The focus
              handler is used to move focus to the primary control when it's marked invalid.  -->
              <input
                class="select__hidden-select"
                aria-hidden="true"
                ?required=${this.required}
                .value=${hasSelection ? "1" : ""}
                tabindex="-1"
                @focus=${() => this.control.focus()}
              />
            </div>

            <sl-menu part="menu" id="menu" class="select__menu" @sl-select=${this.handleMenuSelect}>
              <slot @slotchange=${this.handleMenuSlotChange} @sl-label-change=${this.handleMenuItemLabelChange}></slot>
            </sl-menu>
          </sl-dropdown>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${hasHelpText ? "false" : "true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
  }
};
SlSelect.styles = select_styles_default;
__decorateClass([
  i(".select")
], SlSelect.prototype, "dropdown", 2);
__decorateClass([
  i(".select__control")
], SlSelect.prototype, "control", 2);
__decorateClass([
  i(".select__hidden-select")
], SlSelect.prototype, "input", 2);
__decorateClass([
  i(".select__menu")
], SlSelect.prototype, "menu", 2);
__decorateClass([
  t()
], SlSelect.prototype, "hasFocus", 2);
__decorateClass([
  t()
], SlSelect.prototype, "isOpen", 2);
__decorateClass([
  t()
], SlSelect.prototype, "displayLabel", 2);
__decorateClass([
  t()
], SlSelect.prototype, "displayTags", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlSelect.prototype, "multiple", 2);
__decorateClass([
  e2({ attribute: "max-tags-visible", type: Number })
], SlSelect.prototype, "maxTagsVisible", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlSelect.prototype, "disabled", 2);
__decorateClass([
  e2()
], SlSelect.prototype, "name", 2);
__decorateClass([
  e2()
], SlSelect.prototype, "placeholder", 2);
__decorateClass([
  e2()
], SlSelect.prototype, "size", 2);
__decorateClass([
  e2({ type: Boolean })
], SlSelect.prototype, "hoist", 2);
__decorateClass([
  e2()
], SlSelect.prototype, "value", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlSelect.prototype, "filled", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlSelect.prototype, "pill", 2);
__decorateClass([
  e2()
], SlSelect.prototype, "label", 2);
__decorateClass([
  e2()
], SlSelect.prototype, "placement", 2);
__decorateClass([
  e2({ attribute: "help-text" })
], SlSelect.prototype, "helpText", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlSelect.prototype, "required", 2);
__decorateClass([
  e2({ type: Boolean })
], SlSelect.prototype, "clearable", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlSelect.prototype, "invalid", 2);
__decorateClass([
  defaultValue()
], SlSelect.prototype, "defaultValue", 2);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], SlSelect.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("multiple")
], SlSelect.prototype, "handleMultipleChange", 1);
__decorateClass([
  watch("value", { waitUntilFirstUpdate: true })
], SlSelect.prototype, "handleValueChange", 1);
SlSelect = __decorateClass([
  e("sl-select")
], SlSelect);

export {
  SlSelect
};
