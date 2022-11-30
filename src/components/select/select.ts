import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { defaultValue } from '../../internal/default-value';
import { FormSubmitController } from '../../internal/form';
import ShoelaceElement from '../../internal/shoelace-element';
import { HasSlotController } from '../../internal/slot';
import { watch } from '../../internal/watch';
import { LocalizeController } from '../../utilities/localize';
import '../dropdown/dropdown';
import '../icon-button/icon-button';
import '../icon/icon';
import '../menu/menu';
import '../tag/tag';
import styles from './select.styles';
import type { ShoelaceFormControl } from '../../internal/shoelace-element';
import type SlDropdown from '../dropdown/dropdown';
import type SlIconButton from '../icon-button/icon-button';
import type SlMenuItem from '../menu-item/menu-item';
import type { MenuSelectEventDetail } from '../menu/menu';
import type SlMenu from '../menu/menu';
import type { TemplateResult, CSSResultGroup } from 'lit';

/**
 * @summary Selects allow you to choose one or more items from a dropdown menu.
 *
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
 * @slot prefix - Used to prepend an icon or similar element to the select.
 * @slot suffix - Used to append an icon or similar element to the select.
 * @slot clear-icon - An icon to use in lieu of the default clear icon.
 * @slot label - The select's label. Alternatively, you can use the `label` attribute.
 * @slot help-text - Help text that describes how to use the select. Alternatively, you can use the `help-text` attribute.
 *
 * @event sl-clear - Emitted when the clear button is activated.
 * @event sl-change - Emitted when the control's value changes.
 * @event sl-input - Emitted when the control receives input.
 * @event sl-focus - Emitted when the control gains focus.
 * @event sl-blur - Emitted when the control loses focus.
 *
 * @csspart form-control - The form control that wraps the label, input, and help-text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The select's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart base - The component's internal wrapper.
 * @csspart clear-button - The clear button.
 * @csspart control - The container that holds the prefix, label, and suffix.
 * @csspart display-label - The label that displays the current selection. Not available when used with `multiple`.
 * @csspart icon - The select's icon.
 * @csspart prefix - The select's prefix.
 * @csspart suffix - The select's suffix.
 * @csspart menu - The select menu, an `<sl-menu>` element.
 * @csspart tag - The multi select option, an `<sl-tag>` element.
 * @csspart tag__base - The tag's `base` part.
 * @csspart tag__content - The tag's `content` part.
 * @csspart tag__remove-button - The tag's `remove-button` part.
 * @csspart tags - The container in which multi select options are rendered.
 */
@customElement('sl-select')
export default class SlSelect extends ShoelaceElement implements ShoelaceFormControl {
  static styles: CSSResultGroup = styles;

  @query('.select') dropdown: SlDropdown;
  @query('.select__control') control: SlDropdown;
  @query('.select__hidden-select') input: HTMLInputElement;
  @query('.select__menu') menu: SlMenu;

  // @ts-expect-error -- Controller is currently unused
  private readonly formSubmitController = new FormSubmitController(this);
  private readonly hasSlotController = new HasSlotController(this, 'help-text', 'label');
  private readonly localize = new LocalizeController(this);
  private menuItems: SlMenuItem[] = [];
  private resizeObserver: ResizeObserver;

  @state() private hasFocus = false;
  @state() private isOpen = false;
  @state() private displayLabel = '';
  @state() private displayTags: TemplateResult[] = [];
  @state() invalid = false;

  /** Enables multi select. With this enabled, value will be an array. */
  @property({ type: Boolean, reflect: true }) multiple = false;

  /**
   * The maximum number of tags to show when `multiple` is true. After the maximum, "+n" will be shown to indicate the
   * number of additional items that are selected. Set to -1 to remove the limit.
   */
  @property({ attribute: 'max-tags-visible', type: Number }) maxTagsVisible = 3;

  /** Disables the select control. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** The select's name. */
  @property() name = '';

  /** The select's placeholder text. */
  @property() placeholder = '';

  /** The select's size. */
  @property() size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Enable this option to prevent the panel from being clipped when the component is placed inside a container with
   * `overflow: auto|scroll`.
   */
  @property({ type: Boolean }) hoist = false;

  /** The value of the control. This will be a string or an array depending on `multiple`. */
  @property() value: string | string[] = '';

  /** Draws a filled select. */
  @property({ type: Boolean, reflect: true }) filled = false;

  /** Draws a pill-style select with rounded edges. */
  @property({ type: Boolean, reflect: true }) pill = false;

  /** The select's label. If you need to display HTML, you can use the `label` slot instead. */
  @property() label = '';

  /**
   * The preferred placement of the select's menu. Note that the actual placement may vary as needed to keep the panel
   * inside of the viewport.
   */
  @property() placement: 'top' | 'bottom' = 'bottom';

  /** The select's help text. If you need to display HTML, you can use the `help-text` slot instead. */
  @property({ attribute: 'help-text' }) helpText = '';

  /** The select's required attribute. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Adds a clear button when the select is populated. */
  @property({ type: Boolean }) clearable = false;

  /** Gets or sets the default value used to reset this element. The initial value corresponds to the one originally specified in the HTML that created this element. */
  @defaultValue() defaultValue = '';

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

  /** Checks for validity but does not show the browser's validation message. */
  checkValidity() {
    return this.input.checkValidity();
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

  getValueAsArray() {
    // Single selects use '' as an empty selection value, so convert this to [] for an empty multi select
    if (this.multiple && this.value === '') {
      return [];
    }

    return Array.isArray(this.value) ? this.value : [this.value];
  }

  /** Sets focus on the control. */
  focus(options?: FocusOptions) {
    this.control.focus(options);
  }

  /** Removes focus from the control. */
  blur() {
    this.control.blur();
  }

  handleBlur() {
    // Don't blur if the control is open. We'll move focus back once it closes.
    if (!this.isOpen) {
      this.hasFocus = false;
      this.emit('sl-blur');
    }
  }

  handleClearClick(event: MouseEvent) {
    event.stopPropagation();
    this.value = this.multiple ? [] : '';
    this.emit('sl-clear');
    this.syncItemsFromValue();
  }

  @watch('disabled', { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    if (this.disabled && this.isOpen) {
      this.dropdown.hide();
    }

    // Disabled form controls are always valid, so we need to recheck validity when the state changes
    this.input.disabled = this.disabled;
    this.invalid = !this.input.checkValidity();
  }

  handleFocus() {
    if (!this.hasFocus) {
      this.hasFocus = true;
      this.emit('sl-focus');
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    const firstItem = this.menuItems[0];
    const lastItem = this.menuItems[this.menuItems.length - 1];

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
      if (event.key === 'ArrowDown') {
        this.menu.setCurrentItem(firstItem);
        firstItem.focus();
        return;
      }

      if (event.key === 'ArrowUp') {
        this.menu.setCurrentItem(lastItem);
        lastItem.focus();
        return;
      }
    }

    // don't open the menu when a CTRL/Command key is pressed
    if (event.ctrlKey || event.metaKey) {
      return;
    }

    // All other "printable" keys open the menu and initiate type to select
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

  handleMenuSelect(event: CustomEvent<MenuSelectEventDetail>) {
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

  handleMenuShow() {
    this.resizeMenu();
    this.isOpen = true;
  }

  handleMenuHide() {
    this.isOpen = false;

    // Restore focus on the box after the menu is hidden
    this.control.focus();
  }

  handleMenuItemLabelChange() {
    // Update the display label when checked menu item's label changes
    if (!this.multiple) {
      const checkedItem = this.menuItems.find(item => item.value === this.value);
      this.displayLabel = checkedItem ? checkedItem.getTextLabel() : '';
    }
  }

  @watch('multiple')
  handleMultipleChange() {
    // Cast to array | string based on `this.multiple`
    const value = this.getValueAsArray();
    this.value = this.multiple ? value : value[0] ?? '';
    this.syncItemsFromValue();
  }

  async handleMenuSlotChange() {
    // Wait for items to render before gathering labels otherwise the slot won't exist
    this.menuItems = [...this.querySelectorAll<SlMenuItem>('sl-menu-item')];

    // Check for duplicate values in menu items
    const values: string[] = [];
    this.menuItems.forEach(item => {
      if (values.includes(item.value)) {
        console.error(`Duplicate value found in <sl-select> menu item: '${item.value}'`, item);
      }

      values.push(item.value);
    });

    await Promise.all(this.menuItems.map(item => item.render));
    this.syncItemsFromValue();
  }

  handleTagInteraction(event: KeyboardEvent | MouseEvent) {
    // Don't toggle the menu when a tag's clear button is activated
    const path = event.composedPath();
    const clearButton = path.find((el: SlIconButton) => {
      if (el instanceof HTMLElement) {
        const element = el as HTMLElement;
        return element.classList.contains('tag__remove');
      }
      return false;
    });

    if (clearButton) {
      event.stopPropagation();
    }
  }

  @watch('value', { waitUntilFirstUpdate: true })
  async handleValueChange() {
    this.syncItemsFromValue();
    await this.updateComplete;

    this.invalid = !this.input.checkValidity();

    this.emit('sl-change');
    this.emit('sl-input');
  }

  resizeMenu() {
    this.menu.style.width = `${this.control.clientWidth}px`;
    requestAnimationFrame(() => this.dropdown.reposition());
  }

  syncItemsFromValue() {
    const value = this.getValueAsArray();

    // Sync checked states
    this.menuItems.forEach(item => (item.checked = value.includes(item.value)));

    // Sync display label and tags
    if (this.multiple) {
      const checkedItems = this.menuItems.filter(item => value.includes(item.value));

      this.displayLabel = checkedItems.length > 0 ? checkedItems[0].getTextLabel() : '';
      this.displayTags = checkedItems.map((item: SlMenuItem) => {
        return html`
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
            @sl-remove=${(event: CustomEvent) => {
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
        this.displayLabel = '';
        this.displayTags = this.displayTags.slice(0, this.maxTagsVisible);
        this.displayTags.push(html`
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
      const checkedItem = this.menuItems.find(item => item.value === value[0]);

      this.displayLabel = checkedItem ? checkedItem.getTextLabel() : '';
      this.displayTags = [];
    }
  }

  syncValueFromItems() {
    const checkedItems = this.menuItems.filter(item => item.checked);
    const checkedValues = checkedItems.map(item => item.value);

    if (this.multiple) {
      this.value = (this.value as []).filter(val => checkedValues.includes(val));
    } else {
      this.value = checkedValues.length > 0 ? checkedValues[0] : '';
    }
  }

  render() {
    const hasLabelSlot = this.hasSlotController.test('label');
    const hasHelpTextSlot = this.hasSlotController.test('help-text');
    const hasSelection = this.multiple ? this.value.length > 0 : this.value !== '';
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
    const hasClearIcon = this.clearable && !this.disabled && hasSelection;

    return html`
      <div
        part="form-control"
        class=${classMap({
          'form-control': true,
          'form-control--small': this.size === 'small',
          'form-control--medium': this.size === 'medium',
          'form-control--large': this.size === 'large',
          'form-control--has-label': hasLabel,
          'form-control--has-help-text': hasHelpText
        })}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${hasLabel ? 'false' : 'true'}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <sl-dropdown
            part="base"
            .hoist=${this.hoist}
            .placement=${this.placement === 'bottom' ? 'bottom-start' : 'top-start'}
            .stayOpenOnSelect=${this.multiple}
            .containingElement=${this as HTMLElement}
            ?disabled=${this.disabled}
            class=${classMap({
              select: true,
              'select--open': this.isOpen,
              'select--empty': !this.value,
              'select--focused': this.hasFocus,
              'select--clearable': this.clearable,
              'select--disabled': this.disabled,
              'select--multiple': this.multiple,
              'select--standard': !this.filled,
              'select--filled': this.filled,
              'select--has-tags': this.multiple && this.displayTags.length > 0,
              'select--placeholder-visible': this.displayLabel === '',
              'select--small': this.size === 'small',
              'select--medium': this.size === 'medium',
              'select--large': this.size === 'large',
              'select--pill': this.pill,
              'select--invalid': this.invalid
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
              aria-disabled=${this.disabled ? 'true' : 'false'}
              aria-expanded=${this.isOpen ? 'true' : 'false'}
              aria-controls="menu"
              tabindex=${this.disabled ? '-1' : '0'}
              @blur=${this.handleBlur}
              @focus=${this.handleFocus}
              @keydown=${this.handleKeyDown}
            >
              <span part="prefix" class="select__prefix">
                <slot name="prefix"></slot>
              </span>

              <div part="display-label" class="select__label">
                ${this.displayTags.length > 0
                  ? html` <span part="tags" class="select__tags"> ${this.displayTags} </span> `
                  : this.displayLabel.length > 0
                  ? this.displayLabel
                  : this.placeholder}
              </div>

              ${hasClearIcon
                ? html`
                    <button
                      part="clear-button"
                      class="select__clear"
                      @click=${this.handleClearClick}
                      aria-label=${this.localize.term('clearEntry')}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <sl-icon name="x-circle-fill" library="system"></sl-icon>
                      </slot>
                    </button>
                  `
                : ''}

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
                .value=${hasSelection ? '1' : ''}
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
          aria-hidden=${hasHelpText ? 'false' : 'true'}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-select': SlSelect;
  }
}
