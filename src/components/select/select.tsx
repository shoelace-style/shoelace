import { Component, Element, Event, EventEmitter, Prop, State, Watch, h } from '@stencil/core';
import ResizeObserver from 'resize-observer-polyfill';
import { getTextContent } from '../../utilities/slot';

/**
 * @since 1.0.0
 * @status ready
 */

@Component({
  tag: 'sl-select',
  styleUrl: 'select.scss',
  shadow: true
})
export class Select {
  constructor() {
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMenuKeyDown = this.handleMenuKeyDown.bind(this);
    this.handleMenuHide = this.handleMenuHide.bind(this);
    this.handleMenuShow = this.handleMenuShow.bind(this);
    this.handleMenuSelect = this.handleMenuSelect.bind(this);
    this.handleSlotChange = this.handleSlotChange.bind(this);
  }

  dropdown: HTMLSlDropdownElement;
  input: HTMLSlInputElement;
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

  /** The select's placeholder text. */
  @Prop() placeholder = '';

  /** The select's size. */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /** The value of the control. This will be a string or an array depending on `multiple`. */
  @Prop({ mutable: true }) value: string | Array<string> = '';

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

  componentDidLoad() {
    this.menu.querySelector('slot').addEventListener('slotchange', this.handleSlotChange);
    this.resizeObserver = new ResizeObserver(() => this.resizeMenu());

    this.reportDuplicateItemValues();

    // We need to do an initial sync after the component has rendered, so this will suppress the re-render warning
    requestAnimationFrame(() => this.syncItemsFromValue());
  }

  componentDidUnload() {
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
  }

  handleKeyDown(event: KeyboardEvent) {
    // Open the dropdown when enter is pressed
    if (!this.isOpen && event.key === 'Enter') {
      this.dropdown.show();
      event.preventDefault();
      return;
    }
  }

  handleMenuKeyDown(event: KeyboardEvent) {
    event.stopPropagation();
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
            type="info"
            size={this.size}
            removable
            onClick={event => event.stopPropagation()}
            onSlRemove={() => {
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
          <sl-tag type="info" size={this.size}>
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
      <sl-dropdown
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
          'select--large': this.size === 'large'
        }}
        onSlShow={this.handleMenuShow}
        onSlHide={this.handleMenuHide}
      >
        <sl-input
          slot="trigger"
          ref={el => (this.input = el)}
          class="select__input"
          value={this.displayLabel}
          disabled={this.disabled}
          placeholder={this.displayLabel === '' && this.displayTags.length === 0 ? this.placeholder : null}
          readonly={true}
          size={this.size}
          onSlFocus={this.handleFocus}
          onSlBlur={this.handleBlur}
          onKeyDown={this.handleKeyDown}
        >
          {this.displayTags.length && (
            <span slot="prefix" class="select__tags">
              {this.displayTags}
            </span>
          )}

          <sl-icon slot="suffix" class="select__icon" name="chevron-down" />
        </sl-input>

        <sl-menu
          ref={el => (this.menu = el)}
          class="select__menu"
          onSlSelect={this.handleMenuSelect}
          onKeyDown={this.handleMenuKeyDown}
        >
          <slot />
        </sl-menu>
      </sl-dropdown>
    );
  }
}
