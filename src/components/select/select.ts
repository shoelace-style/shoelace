import { classMap, html, Hole, Shoemaker } from '@shoelace-style/shoemaker';
import styles from 'sass:./select.scss';
import { SlDropdown, SlIconButton, SlMenu, SlMenuItem } from '../../shoelace';
import { renderFormControl } from '../../internal/form-control';
import { getTextContent } from '../../internal/slot';
import { hasSlot } from '../../internal/slot';

let id = 0;

/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-dropdown
 * @dependency sl-icon
 * @dependency sl-icon-button
 * @dependency sl-menu
 * @dependency sl-tag
 *
 * @slot - The select's options in the form of menu items.
 * @slot label - The select's label. Alternatively, you can use the label prop.
 * @slot help-text - Help text that describes how to use the select.
 *
 * @part base - The component's base wrapper.
 * @part clear-button - The input's clear button, exported from <sl-input>.
 * @part form-control - The form control that wraps the label, input, and help text.
 * @part help-text - The select's help text.
 * @part icon - The select's icon.
 * @part label - The select's label.
 * @part menu - The select menu, a <sl-menu> element.
 * @part tag - The multiselect option, a <sl-tag> element.
 * @part tags - The container in which multiselect options are rendered.
 *
 * @emit sl-change - Emitted when the control's value changes.
 * @emit sl-focus - Emitted when the control gains focus.
 * @emit sl-blur - Emitted when the control loses focus.
 */
export default class SlSelect extends Shoemaker {
  static tag = 'sl-select';
  static props = [
    'hasFocus',
    'hasHelpTextSlot',
    'hasLabelSlot',
    'isOpen',
    'items',
    'displayLabel',
    'displayTags',
    'multiple',
    'maxTagsVisible',
    'disabled',
    'name',
    'placeholder',
    'size',
    'hoist',
    'value',
    'pill',
    'label',
    'helpText',
    'required',
    'clearable',
    'invalid'
  ];
  static reflect = ['disabled', 'invalid'];
  static styles = styles;

  private displayLabel = '';
  private displayTags: Hole[] = [];
  private dropdown: SlDropdown;
  private hasFocus = false;
  private hasHelpTextSlot = false;
  private hasLabelSlot = false;
  private helpTextId = `select-help-text-${id}`;
  private input: HTMLInputElement;
  private inputId = `select-${++id}`;
  private isOpen = false;
  private labelId = `select-label-${id}`;
  private menu: SlMenu;
  private resizeObserver: ResizeObserver;

  /** Enables multiselect. With this enabled, value will be an array. */
  multiple = false;

  /**
   * The maximum number of tags to show when `multiple` is true. After the maximum, "+n" will be shown to indicate the
   * number of additional items that are selected. Set to -1 to remove the limit.
   */
  maxTagsVisible = 3;

  /** Disables the select control. */
  disabled = false;

  /** The select's name. */
  name = '';

  /** The select's placeholder text. */
  placeholder = '';

  /** The select's size. */
  size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Enable this option to prevent the panel from being clipped when the component is placed inside a container with
   * `overflow: auto|scroll`.
   */
  hoist = false;

  /** The value of the control. This will be a string or an array depending on `multiple`. */
  value: string | Array<string> = '';

  /** Draws a pill-style select with rounded edges. */
  pill = false;

  /** The select's label. Alternatively, you can use the label slot. */
  label = '';

  /** The select's help text. Alternatively, you can use the help-text slot. */
  helpText = '';

  /** The select's required attribute. */
  required = false;

  /** Adds a clear button when the select is populated. */
  clearable = false;

  /** This will be true when the control is in an invalid state. Validity is determined by the `required` prop. */
  invalid = false;

  onConnect() {
    this.handleSlotChange = this.handleSlotChange.bind(this);
    this.shadowRoot!.addEventListener('slotchange', this.handleSlotChange);
    this.handleSlotChange();
  }

  onReady() {
    this.resizeObserver = new ResizeObserver(() => this.resizeMenu());

    // We need to do an initial sync after the component has rendered, so this will suppress the re-render warning
    requestAnimationFrame(() => this.syncItemsFromValue());
  }

  onDisconnect() {
    this.shadowRoot!.removeEventListener('slotchange', this.handleSlotChange);
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    return this.input.reportValidity();
  }

  /** Sets a custom validation message. If `message` is not empty, the field will be considered invalid. */
  setCustomValidity(message: string) {
    this.input.setCustomValidity(message);
    this.invalid = !this.input.checkValidity();
  }

  getItemLabel(item: SlMenuItem) {
    const slot = item.shadowRoot!.querySelector('slot:not([name])') as HTMLSlotElement;
    return getTextContent(slot);
  }

  getItems() {
    return [...this.querySelectorAll('sl-menu-item')] as SlMenuItem[];
  }

  getValueAsArray() {
    return Array.isArray(this.value) ? this.value : [this.value];
  }

  handleBlur() {
    this.hasFocus = false;
    this.emit('sl-blur');
  }

  handleFocus() {
    this.hasFocus = true;
    this.emit('sl-focus');
  }

  handleClearClick(event: MouseEvent) {
    event.stopPropagation();
    this.value = this.multiple ? [] : '';
    this.syncItemsFromValue();
  }

  handleKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    const items = this.getItems();
    const firstItem = items[0];
    const lastItem = items[items.length - 1];

    // Ignore key presses on tags
    if (target.tagName.toLowerCase() === 'sl-tag') {
      return;
    }

    // Tabbing out of the control closes it
    if (event.key === 'Tab') {
      if (this.isOpen) {
        this.dropdown.hide();
      }
      return;
    }

    // Up/down opens the menu
    if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
      event.preventDefault();

      // Show the menu if it's not already open
      if (!this.isOpen) {
        this.dropdown.show();
      }

      // Focus on a menu item
      if (event.key === 'ArrowDown' && firstItem) {
        firstItem.setFocus();
        return;
      }

      if (event.key === 'ArrowUp' && lastItem) {
        lastItem.setFocus();
        return;
      }
    }

    // All other keys open the menu and initiate type to select
    if (!this.isOpen) {
      event.stopPropagation();
      event.preventDefault();
      this.dropdown.show();
      this.menu.typeToSelect(event.key);
    }
  }

  handleLabelClick() {
    const box = this.shadowRoot?.querySelector('.select__box') as HTMLElement;
    box.focus();
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
    this.resizeObserver.observe(this);
    this.isOpen = true;
  }

  handleMenuHide() {
    this.resizeObserver.unobserve(this);
    this.isOpen = false;
  }

  handleSlotChange() {
    this.hasHelpTextSlot = hasSlot(this, 'help-text');
    this.hasLabelSlot = hasSlot(this, 'label');
    this.syncItemsFromValue();
  }

  handleTagInteraction(event: KeyboardEvent | MouseEvent) {
    // Don't toggle the menu when a tag's clear button is activated
    const path = event.composedPath() as Array<EventTarget>;
    const clearButton = path.find((el: SlIconButton) => {
      if (el instanceof HTMLElement) {
        const element = el as HTMLElement;
        return element.classList.contains('tag__clear');
      }
      return false;
    });

    if (clearButton) {
      event.stopPropagation();
    }
  }

  resizeMenu() {
    const box = this.shadowRoot?.querySelector('.select__box') as HTMLElement;
    this.menu.style.width = `${box.clientWidth}px`;
    this.dropdown.reposition();
  }

  syncItemsFromValue() {
    const items = this.getItems();
    const value = this.getValueAsArray();

    // Sync checked states
    items.map(item => (item.checked = value.includes(item.value)));

    // Sync display label
    if (this.multiple) {
      const checkedItems: SlMenuItem[] = [];
      value.map(val => items.map(item => (item.value === val ? checkedItems.push(item) : null)));

      this.displayTags = checkedItems.map((item: SlMenuItem) => {
        return html`
          <sl-tag
            exportparts="base:tag"
            type="info"
            size=${this.size}
            pill=${this.pill}
            clearable
            onclick=${this.handleTagInteraction.bind(this)}
            onkeydown=${this.handleTagInteraction.bind(this)}
            onsl-clear=${(event: CustomEvent) => {
              event.stopPropagation();
              if (!this.disabled) {
                item.checked = false;
                this.syncValueFromItems();
              }
            }}
          >
            ${this.getItemLabel(item)}
          </sl-tag>
        `;
      });

      if (this.maxTagsVisible > 0 && this.displayTags.length > this.maxTagsVisible) {
        const total = this.displayTags.length;
        this.displayLabel = '';
        this.displayTags = this.displayTags.slice(0, this.maxTagsVisible);
        this.displayTags.push(html`
          <sl-tag exportparts="base:tag" type="info" size=${this.size}> +${total - this.maxTagsVisible} </sl-tag>
        `);
      }
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

  watchDisabled() {
    if (this.disabled && this.isOpen) {
      this.dropdown.hide();
    }
  }

  watchHelpText() {
    this.handleSlotChange();
  }

  watchLabel() {
    this.handleSlotChange();
  }

  watchMultiple() {
    // Cast to array | string based on `this.multiple`
    const value = this.getValueAsArray();
    this.value = this.multiple ? value : value[0] || '';
    this.syncItemsFromValue();
  }

  watchValue() {
    this.syncItemsFromValue();
    this.emit('sl-change');
  }

  render() {
    const hasSelection = this.multiple ? this.value.length > 0 : this.value !== '';

    return renderFormControl(
      {
        inputId: this.inputId,
        label: this.label,
        labelId: this.labelId,
        hasLabelSlot: this.hasLabelSlot,
        helpTextId: this.helpTextId,
        helpText: this.helpText,
        hasHelpTextSlot: this.hasHelpTextSlot,
        size: this.size,
        onLabelClick: () => this.handleLabelClick()
      },
      html`
        <sl-dropdown
          part="base"
          ref=${(el: SlDropdown) => (this.dropdown = el)}
          .hoist=${this.hoist}
          .closeOnSelect=${!this.multiple}
          .containingElement=${this}
          class=${classMap({
            select: true,
            'select--open': this.isOpen,
            'select--empty': this.value?.length === 0,
            'select--focused': this.hasFocus,
            'select--clearable': this.clearable,
            'select--disabled': this.disabled,
            'select--multiple': this.multiple,
            'select--has-tags': this.multiple && hasSelection,
            'select--placeholder-visible': this.displayLabel === '',
            'select--small': this.size === 'small',
            'select--medium': this.size === 'medium',
            'select--large': this.size === 'large',
            'select--pill': this.pill,
            'select--invalid': this.invalid
          })}
          onsl-show=${this.handleMenuShow.bind(this)}
          onsl-hide=${this.handleMenuHide.bind(this)}
        >
          <div
            slot="trigger"
            id=${this.inputId}
            class="select__box"
            role="combobox"
            aria-labelledby=${this.labelId}
            aria-describedby=${this.helpTextId}
            aria-haspopup="true"
            aria-expanded=${this.isOpen ? 'true' : 'false'}
            tabindex=${this.disabled ? '-1' : '0'}
            onblur=${this.handleBlur.bind(this)}
            onfocus=${this.handleFocus.bind(this)}
            onkeydown=${this.handleKeyDown.bind(this)}
          >
            <div class="select__label">
              ${this.displayTags.length
                ? html` <span part="tags" class="select__tags"> ${this.displayTags} </span> `
                : this.displayLabel || this.placeholder}
            </div>

            ${this.clearable && hasSelection
              ? html`
                  <sl-icon-button
                    exportparts="base:clear-button"
                    class="select__clear"
                    name="x-circle"
                    onclick=${this.handleClearClick.bind(this)}
                    tabindex="-1"
                  />
                `
              : ''}

            <span part="icon" class="select__icon">
              <sl-icon name="chevron-down" />
            </span>

            <!-- The hidden input tricks the browser's built-in validation so it works as expected. We use an input 
            instead of a select because, otherwise, iOS will show a list of options during validation. -->
            <input
              ref=${(el: HTMLInputElement) => (this.input = el)}
              class="select__hidden-select"
              aria-hidden="true"
              required=${this.required ? true : null}
              .value=${hasSelection ? '1' : ''}
              tabindex="-1"
            />
          </div>

          <sl-menu
            ref=${(el: SlMenu) => (this.menu = el)}
            part="menu"
            class="select__menu"
            onsl-select=${this.handleMenuSelect.bind(this)}
          >
            <slot onslotchange=${this.handleSlotChange} />
          </sl-menu>
        </sl-dropdown>
      `
    );
  }
}
