import { Component, Element, Event, EventEmitter, Prop, State, Watch, h } from '@stencil/core';
import ResizeObserver from 'resize-observer-polyfill';
import { getTextContent } from '../../utilities/slot';

/**
 * @since 1.0.0
 * @status experimental
 */

//
// TODO:
//
// - Users MUST be able to access items with more than the arrow keys. Instead of type-ahead search, which is arguably
//   unintuitive, let's add an input that filters. The filter function can be overrided if necessary, but the basic
//   filter will be case-insensitive (should we latinize it too?)
// - Replace tags with <sl-tag> and make clearable
//

@Component({
  tag: 'sl-select',
  styleUrl: 'select.scss',
  shadow: true
})
export class Select {
  dropdown: HTMLSlDropdownElement;
  input: HTMLSlInputElement;
  menu: HTMLSlMenuElement;
  resizeObserver: any;

  constructor() {
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMenuHide = this.handleMenuHide.bind(this);
    this.handleMenuShow = this.handleMenuShow.bind(this);
    this.handleMenuSelect = this.handleMenuSelect.bind(this);
    this.handleSlotChange = this.handleSlotChange.bind(this);
  }

  @Element() host: HTMLSlSelectElement;

  @State() hasFocus = false;
  @State() isOpen = false;
  @State() items = [];
  @State() displayLabel = '';
  @State() displayTags = [];

  /** Set to true to enable multiselect. */
  @Prop() multiple = false;

  /**
   * The maximum number of tags to display before collapsing. Only applies when `multiple` is true. Set to -1 to remove
   * the limit.
   */
  @Prop() maxVisibleTags = 3;

  /** Set to true to disable the select control. */
  @Prop() disabled = false;

  /** The select's placeholder text. */
  @Prop() placeholder = '';

  /** The select's size. */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /** The value of the control. This will be a string unless `multiple` is true, in which case it will be an array. */
  @Prop({ mutable: true }) value: string | Array<string> = '';

  @Watch('multiple')
  handleMultipleChange() {
    // Cast to array | string based on `this.multiple`
    const value = this.getValueAsArray();
    this.value = this.multiple ? value : value[0] || '';
    this.syncFromValue();
  }

  @Watch('value')
  handleValueChange() {
    this.syncFromValue();
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

    // We need to do an initial sync after the component has rendered, so this will suppress the re-render warning
    requestAnimationFrame(() => this.syncFromValue());
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
    if (!this.isOpen && (event.key === 'Enter' || event.key === ' ')) {
      this.dropdown.show();
      event.preventDefault();
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

    this.syncFromValue();
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
    //
    // TODO - make sure all value items still exist and update items checked state
    //
    console.log('slotchange');
  }

  resizeMenu() {
    this.menu.style.width = `${this.input.clientWidth}px`;
  }

  syncFromValue() {
    const items = this.getItems();
    const value = this.getValueAsArray();

    // Sync checked states
    items.map(item => (item.checked = value.includes(item.value)));

    // Sync display label
    if (this.multiple) {
      const checkedItems = [];
      value.map(val => items.map(item => (item.value === val ? checkedItems.push(item) : null)));

      this.displayTags = checkedItems.map(item => {
        return <span class="sl-select__tag">{this.getItemLabel(item)}</span>;
      });

      if (this.maxVisibleTags > 0 && this.displayTags.length > this.maxVisibleTags) {
        const total = this.displayTags.length;
        this.displayTags = this.displayTags.slice(0, this.maxVisibleTags);
        this.displayTags.push(<span class="sl-select__tag">+{total - this.maxVisibleTags}</span>);
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

    if (this.multiple) {
      this.value = checkedItems.map(item => item.value);
    } else {
      this.value = checkedItems.length > 0 ? checkedItems[0].value : '';
    }
  }

  render() {
    return (
      <sl-dropdown
        ref={el => (this.dropdown = el)}
        closeOnSelect={!this.multiple}
        containingElement={this.host}
        class={{
          'sl-select': true,
          'sl-select--open': this.isOpen,
          'sl-select--focused': this.hasFocus,
          'sl-select--disabled': this.disabled,
          'sl-select--multiple': this.multiple,
          'sl-select--small': this.size === 'small',
          'sl-select--medium': this.size === 'medium',
          'sl-select--large': this.size === 'large'
        }}
        onSlShow={this.handleMenuShow}
        onSlHide={this.handleMenuHide}
      >
        <sl-input
          slot="trigger"
          ref={el => (this.input = el)}
          class="sl-select__input"
          value={this.displayLabel}
          disabled={this.disabled}
          placeholder={this.displayLabel === '' && this.displayTags.length === 0 ? this.placeholder : null}
          readonly={true}
          size={this.size}
          onSlFocus={this.handleFocus}
          onSlBlur={this.handleBlur}
          onKeyDown={this.handleKeyDown}
        >
          {this.displayTags.length && <span slot="prefix">{this.displayTags}</span>}

          <sl-icon slot="suffix" class="sl-select__icon" name="chevron-down" />
        </sl-input>

        <sl-menu ref={el => (this.menu = el)} class="sl-select__menu" onSlSelect={this.handleMenuSelect}>
          <slot />
        </sl-menu>
      </sl-dropdown>
    );
  }
}
