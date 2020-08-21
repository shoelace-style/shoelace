import { Component, Element, Event, EventEmitter, Prop, State, Watch, h } from '@stencil/core';
import ResizeObserver from 'resize-observer-polyfill';
import { getTextContent } from '../../utilities/slot';

let id = 0;

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The select's options in the form of menu items.
 * @slot help-text - Help text that describes how to use the select.
 *
 * @part base - The component's base wrapper.
 * @part form-control - The form control that wraps the label and the input.
 * @part help-text - The select help text.
 * @part icon - The select icon.
 * @part input - The select input.
 * @part label - The input label.
 * @part menu - The select menu, a <sl-menu> element.
 * @part tag - The multiselect option, a <sl-tag> element.
 * @part tags - The container in which multiselect options are rendered.
 */

@Component({
  tag: 'sl-select',
  styleUrl: 'select.scss',
  shadow: true
})
export class Select {
  dropdown: HTMLSlDropdownElement;
  input: HTMLSlInputElement;
  inputId = `select-${++id}`;
  labelId = `select-label-${id}`;
  helpTextId = `select-help-text-${id}`;
  menu: HTMLSlMenuElement;
  resizeObserver: any;

  @Element() host: HTMLSlSelectElement;

  @State() hasFocus = false;
  @State() isOpen = false;
  @State() items = [];
  @State() displayLabel = '';
  @State() displayTags = [];

  /** Set to true to enable multiselect. */
  @Prop() multiple = false;

  /**
   * The maximum number of tags to show when `multiple` is true. After the maximum, "+n" will be shown to indicate the
   * number of additional items that are selected. Set to -1 to remove the limit.
   */
  @Prop() maxTagsVisible = 3;

  /** Set to true to disable the select control. */
  @Prop() disabled = false;

  /** The select's name. */
  @Prop() name = '';

  /** The select's placeholder text. */
  @Prop() placeholder = '';

  /** The select's size. */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /** The value of the control. This will be a string or an array depending on `multiple`. */
  @Prop({ mutable: true }) value: string | Array<string> = '';

  /** Set to true to draw a pill-style select with rounded edges. */
  @Prop() pill = false;

  /** The select's label. */
  @Prop() label = '';

  /** Set to true to indicate that the user input is valid. */
  @Prop() valid = false;

  /** Set to true to indicate that the user input is invalid. */
  @Prop() invalid = false;

  @Watch('multiple')
  handleMultipleChange() {
    // Cast to array | string based on `this.multiple`
    const value = this.getValueAsArray();
    this.value = this.multiple ? value : value[0] || '';
    this.syncItemsFromValue();
  }

  @Watch('value')
  handleValueChange() {
    this.syncItemsFromValue();
    this.slChange.emit();
  }

  /** Emitted when the control's value changes. */
  @Event() slChange: EventEmitter;

  /** Emitted when the control gains focus */
  @Event() slFocus: EventEmitter;

  /** Emitted when the control loses focus */
  @Event() slBlur: EventEmitter;

  connectedCallback() {
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleLabelClick = this.handleLabelClick.bind(this);
    this.handleMenuKeyDown = this.handleMenuKeyDown.bind(this);
    this.handleMenuHide = this.handleMenuHide.bind(this);
    this.handleMenuShow = this.handleMenuShow.bind(this);
    this.handleMenuSelect = this.handleMenuSelect.bind(this);
    this.handleSlotChange = this.handleSlotChange.bind(this);
  }

  componentDidLoad() {
    this.menu.querySelector('slot').addEventListener('slotchange', this.handleSlotChange);
    this.resizeObserver = new ResizeObserver(() => this.resizeMenu());

    this.reportDuplicateItemValues();

    // We need to do an initial sync after the component has rendered, so this will suppress the re-render warning
    requestAnimationFrame(() => this.syncItemsFromValue());
  }

  disconnectedCallback() {
    this.menu.querySelector('slot').removeEventListener('slotchange', this.handleSlotChange);
  }

  getItemLabel(item: HTMLSlMenuItemElement) {
    const slot = item.shadowRoot.querySelector('slot:not([name])') as HTMLSlotElement;
    return getTextContent(slot);
  }

  getItems() {
    return [...this.host.querySelectorAll('sl-menu-item')];
  }

  getValueAsArray() {
    return Array.isArray(this.value) ? this.value : [this.value];
  }

  handleBlur() {
    this.hasFocus = false;
    this.slBlur.emit();
  }

  handleFocus() {
    this.hasFocus = true;
    this.slFocus.emit();
    this.input.setSelectionRange(0, 0);
  }

  handleKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;

    // Open the dropdown when enter is pressed while the input is focused
    if (!this.isOpen && event.key === 'Enter' && target === this.input) {
      this.dropdown.show();
      event.preventDefault();
      return;
    }
  }

  handleLabelClick() {
    this.input.setFocus();
  }

  handleMenuKeyDown(event: KeyboardEvent) {
    // Close when escape or tab pressed
    if (event.key === 'Escape' || event.key === 'Tab') {
      this.dropdown.hide();
      event.preventDefault();
      return;
    }
  }

  handleMenuSelect(event: CustomEvent) {
    const item = event.detail.item;

    if (this.multiple) {
      this.value = this.value.includes(item.value)
        ? (this.value as []).filter(v => v !== item.value)
        : [...this.value, item.value];
    } else {
      this.value = item.value;
    }

    this.syncItemsFromValue();
  }

  handleMenuShow(event: CustomEvent) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    this.resizeMenu();
    this.resizeObserver.observe(this.host);
    this.isOpen = true;
  }

  handleMenuHide() {
    this.resizeObserver.unobserve(this.host);
    this.isOpen = false;
    this.input.setFocus();
  }

  handleSlotChange() {
    this.syncItemsFromValue();
    this.reportDuplicateItemValues();
  }

  reportDuplicateItemValues() {
    const items = this.getItems();

    // Report duplicate values since they can break selection logic
    const duplicateValues = items.map(item => item.value).filter((e, i, a) => a.indexOf(e) !== i);
    if (duplicateValues.length) {
      throw new Error('Duplicate value found on <sl-menu-item> in <sl-select>: "' + duplicateValues.join('", "') + '"');
    }
  }

  resizeMenu() {
    this.menu.style.width = `${this.input.clientWidth}px`;
  }

  syncItemsFromValue() {
    const items = this.getItems();
    const value = this.getValueAsArray();

    // Sync checked states
    items.map(item => (item.checked = value.includes(item.value)));

    // Sync display label
    if (this.multiple) {
      const checkedItems = [];
      value.map(val => items.map(item => (item.value === val ? checkedItems.push(item) : null)));

      this.displayTags = checkedItems.map(item => {
        return (
          <sl-tag
            exportparts="base:tag"
            type="info"
            size={this.size}
            pill={this.pill}
            clearable
            onClick={event => event.stopPropagation()}
            onSlClear={() => {
              item.checked = false;
              this.syncValueFromItems();
            }}
          >
            {this.getItemLabel(item)}
          </sl-tag>
        );
      });

      if (this.maxTagsVisible > 0 && this.displayTags.length > this.maxTagsVisible) {
        const total = this.displayTags.length;
        this.displayTags = this.displayTags.slice(0, this.maxTagsVisible);
        this.displayTags.push(
          <sl-tag exportparts="base:tag" type="info" size={this.size}>
            +{total - this.maxTagsVisible}
          </sl-tag>
        );
      }

      this.displayLabel = '';
    } else {
      const checkedItem = items.filter(item => item.value === value[0])[0];
      this.displayLabel = checkedItem ? this.getItemLabel(checkedItem) : '';
      this.displayTags = [];
    }
  }

  syncValueFromItems() {
    const items = this.getItems();
    const checkedItems = items.filter(item => item.checked);
    const checkedValues = checkedItems.map(item => item.value);

    if (this.multiple) {
      this.value = (this.value as []).filter(val => checkedValues.includes(val));
    } else {
      this.value = checkedValues.length > 0 ? checkedValues[0] : '';
    }
  }

  render() {
    return (
      <div
        part="form-control"
        class={{
          'form-control': true,
          'form-control--has-label': this.label.length > 0,
          'form-control--valid': this.valid,
          'form-control--invalid': this.invalid
        }}
      >
        <label
          part="label"
          id={this.labelId}
          class={{
            label: true,
            'label--small': this.size === 'small',
            'label--medium': this.size === 'medium',
            'label--large': this.size === 'large',
            'label--valid': this.valid,
            'label--invalid': this.invalid
          }}
          htmlFor={this.inputId}
          onClick={this.handleLabelClick}
        >
          {this.label}
        </label>

        <sl-dropdown
          part="base"
          ref={el => (this.dropdown = el)}
          closeOnSelect={!this.multiple}
          containingElement={this.host}
          class={{
            select: true,
            'select--open': this.isOpen,
            'select--focused': this.hasFocus,
            'select--disabled': this.disabled,
            'select--multiple': this.multiple,
            'select--small': this.size === 'small',
            'select--medium': this.size === 'medium',
            'select--large': this.size === 'large',
            'select--pill': this.pill
          }}
          onSlShow={this.handleMenuShow}
          onSlHide={this.handleMenuHide}
        >
          <sl-input
            slot="trigger"
            part="input"
            ref={el => (this.input = el)}
            id={this.inputId}
            class="select__input"
            name={this.name}
            value={this.displayLabel}
            disabled={this.disabled}
            pill={this.pill}
            placeholder={this.displayLabel === '' && this.displayTags.length === 0 ? this.placeholder : null}
            readonly={true}
            size={this.size}
            valid={this.valid}
            invalid={this.invalid}
            aria-labelledby={this.labelId}
            aria-describedby={this.helpTextId}
            onSlFocus={this.handleFocus}
            onSlBlur={this.handleBlur}
            onKeyDown={this.handleKeyDown}
          >
            {this.displayTags.length && (
              <span part="tags" slot="prefix" class="select__tags">
                {this.displayTags}
              </span>
            )}

            <span part="icon" slot="suffix" class="select__icon">
              <sl-icon name="chevron-down" />
            </span>
          </sl-input>

          <sl-menu
            ref={el => (this.menu = el)}
            part="menu"
            class="select__menu"
            onSlSelect={this.handleMenuSelect}
            onKeyDown={this.handleMenuKeyDown}
          >
            <slot />
          </sl-menu>
        </sl-dropdown>

        <div
          part="help-text"
          id={this.helpTextId}
          class={{
            'help-text': true,
            'help-text--small': this.size === 'small',
            'help-text--medium': this.size === 'medium',
            'help-text--large': this.size === 'large',
            'help-text--valid': this.valid,
            'help-text--invalid': this.invalid
          }}
        >
          <slot name="help-text" />
        </div>
      </div>
    );
  }
}
