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
// - Placeholder
// - Users MUST be able to access items with more than the arrow keys. Instead of type-ahead search, which is arguably
//   unintuitive, let's add an input that filters. The filter function can be overrided if necessary, but the basic
//   filter will be case-insensitive (should we latinize too?)
// - Replace tags with <sl-tag> and make clearable
//

@Component({
  tag: 'sl-select',
  styleUrl: 'select.scss',
  shadow: true
})
export class Select {
  control: HTMLElement;
  dropdown: HTMLSlDropdownElement;
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
  @State() label: any = '';

  /** Set to true to enable multiselect. */
  @Prop() multiple = false;

  /**
   * The maximum number of tags to display before collapsing. Only applies when `multiple` is true. Set to -1 to remove
   * the limit.
   */
  @Prop() maxVisibleTags = 3;

  /** Set to true to disable the select control. */
  @Prop() disabled = false;

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
    this.syncFromValue();
    this.menu.querySelector('slot').addEventListener('slotchange', this.handleSlotChange);
    this.resizeObserver = new ResizeObserver(() => this.resizeMenu());
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
    this.control.focus();
  }

  handleSlotChange() {
    //
    // TODO - make sure all value items still exist and update items checked state
    //
    console.log('slotchange');
  }

  resizeMenu() {
    this.menu.style.width = `${this.control.clientWidth}px`;
  }

  syncFromValue() {
    const items = this.getItems();
    const value = this.getValueAsArray();
    const labels = [];

    // Update checked states
    items.map(item => (item.checked = value.includes(item.value)));

    // Set labels based on the order they appear up in `this.value`
    value.map(v => items.map(item => (item.value === v ? labels.push(this.getItemLabel(item)) : null)));
    if (this.multiple) {
      this.label = labels.map(label => {
        return <span class="sl-select__tag">{label}</span>;
      });

      if (this.maxVisibleTags > 0 && this.label.length > this.maxVisibleTags) {
        const total = this.label.length;
        this.label = this.label.slice(0, this.maxVisibleTags);
        this.label.push(<span class="sl-select__tag">+{total - this.maxVisibleTags}</span>);
      }
    } else {
      this.label = labels.length > 0 ? labels[0] : '';
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
        <div
          slot="trigger"
          ref={el => (this.control = el)}
          class="sl-select__control"
          role="button"
          tabIndex={this.disabled ? -1 : 0}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeyDown}
        >
          <div class="sl-select__label">{this.label}</div>
          <div class="sl-select__icon">
            <sl-icon name="chevron-down" />
          </div>
        </div>

        <sl-menu ref={el => (this.menu = el)} class="sl-select__menu" onSlSelect={this.handleMenuSelect}>
          <slot />
        </sl-menu>
      </sl-dropdown>
    );
  }
}
