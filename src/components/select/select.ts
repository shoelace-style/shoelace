import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { scrollIntoView } from 'src/internal/scroll';
import { animateTo, stopAnimations } from '../../internal/animate';
import { defaultValue } from '../../internal/default-value';
import { waitForEvent } from '../../internal/event';
import { FormSubmitController } from '../../internal/form';
import ShoelaceElement from '../../internal/shoelace-element';
import { HasSlotController } from '../../internal/slot';
import { watch } from '../../internal/watch';
import { getAnimation, setDefaultAnimation } from '../../utilities/animation-registry';
import { LocalizeController } from '../../utilities/localize';
import styles from './select.styles';
import type { ShoelaceFormControl } from '../../internal/shoelace-element';
import type SlOption from '../option/option';
import type SlPopup from '../popup/popup';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Selects allow you to choose items from a menu of predefined options.
 *
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon
 *
 * @slot - The select's options in the form of menu items.
 *
 * @event sl-change - Emitted when the control's value changes.
 * @event sl-clear - Emitted when the control's value is cleared.
 * @event sl-input - Emitted when the control receives input.
 * @event sl-focus - Emitted when the control gains focus.
 * @event sl-blur - Emitted when the control loses focus.
 * @event sl-show - Emitted when the select's menu opens.
 * @event sl-after-show - Emitted after the select's menu opens and all animations are complete.
 * @event sl-hide - Emitted when the select's menu closes.
 * @event sl-after-hide - Emitted after the select's menu closes and all animations are complete.
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The select's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 */
@customElement('sl-select')
export default class SlSelect extends ShoelaceElement implements ShoelaceFormControl {
  static styles: CSSResultGroup = styles;

  @query('.select') popup: SlPopup;
  @query('.select__combobox') combobox: HTMLSlotElement;
  @query('.select__display-input') displayInput: HTMLInputElement;
  @query('.select__value-input') valueInput: HTMLInputElement;
  @query('.select__listbox') listbox: HTMLSlotElement;

  // @ts-expect-error -- Controller is currently unused
  private readonly formSubmitController = new FormSubmitController(this);
  private readonly hasSlotController = new HasSlotController(this, 'help-text', 'label');
  private readonly localize = new LocalizeController(this);
  private typeToSelectString = '';
  private typeToSelectTimeout: number;

  @state() displayLabel = '';
  @state() private hasFocus = false;
  @state() invalid = false;

  /** The name of the select, submitted as a name/value pair with form data. */
  @property() name = '';

  /** The current value of the select, submitted as a name/value pair with form data. */
  @property() value = '';

  /** The default value of the form control. Primarily used for resetting the form control. */
  @defaultValue() defaultValue = '';

  /** The select's size. */
  @property() size: 'small' | 'medium' | 'large' = 'medium';

  /** Placeholder text to show as a hint when the select is empty. */
  @property() placeholder = '';

  /** Disables the select control. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Indicates whether or not the select is open. You can toggle this attribute to show and hide the menu, or you can
   * use the `show()` and `hide()` methods and this attribute will reflect the select's open state.
   */
  @property({ type: Boolean, reflect: true }) open = false;

  /**
   * Enable this option to prevent the listbox from being clipped when the component is placed inside a container with
   * `overflow: auto|scroll`. Hoisting uses a fixed positioning strategy that works in many, but not all, scenarios.
   */
  @property({ type: Boolean }) hoist = false;

  /** Draws a filled select. */
  @property({ type: Boolean, reflect: true }) filled = false;

  /** Draws a pill-style select with rounded edges. */
  @property({ type: Boolean, reflect: true }) pill = false;

  /** The select's label. If you need to display HTML, use the `label` slot instead. */
  @property() label = '';

  /**
   * The preferred placement of the select's menu. Note that the actual placement may vary as needed to keep the listbox
   * inside of the viewport.
   */
  @property({ reflect: true }) placement: 'top' | 'bottom' = 'bottom';

  /** The select's help text. If you need to display HTML, use the `help-text` slot instead. */
  @property({ attribute: 'help-text' }) helpText = '';

  /** The select's required attribute. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Adds a clear button when the select is not empty. */
  @property({ type: Boolean }) clearable = false;

  connectedCallback() {
    super.connectedCallback();
    this.handleDocumentFocusIn = this.handleDocumentFocusIn.bind(this);
    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
    this.handleDocumentMouseDown = this.handleDocumentMouseDown.bind(this);

    // Because this is a form control, it shouldn't be opened initially
    this.open = false;
  }

  firstUpdated() {
    this.invalid = !this.checkValidity();
  }

  /** Checks for validity but does not show the browser's validation message. */
  checkValidity() {
    return this.valueInput.checkValidity();
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    return this.valueInput.reportValidity();
  }

  /** Sets a custom validation message. If `message` is not empty, the field will be considered invalid. */
  setCustomValidity(message: string) {
    this.valueInput.setCustomValidity(message);
    this.invalid = !this.valueInput.checkValidity();
  }

  /** Sets focus on the control. */
  focus(options?: FocusOptions) {
    this.displayInput.focus(options);
  }

  /** Removes focus from the control. */
  blur() {
    this.displayInput.blur();
  }

  handleFocus() {
    this.hasFocus = true;
    this.displayInput.setSelectionRange(0, 0);
    this.emit('sl-focus');
  }

  handleBlur() {
    this.hasFocus = false;
    this.emit('sl-blur');
  }

  handleDocumentFocusIn(event: KeyboardEvent) {
    // Close when focusing out of the select
    const path = event.composedPath();
    if (this && !path.includes(this)) {
      this.hide();
    }
  }

  handleDocumentKeyDown(event: KeyboardEvent) {
    // Close when pressing escape
    if (event.key === 'Escape' && this.open) {
      event.preventDefault();
      event.stopPropagation();
      this.hide();
    }

    // Handle enter and space. When pressing space, we allow for type to select behaviors so if there's anything in the
    // buffer we _don't_ close it.
    if (event.key === 'Enter' || (event.key === ' ' && this.typeToSelectString === '')) {
      event.preventDefault();

      // If it's not open, open it
      if (!this.open) {
        this.show();
        return;
      }

      // If it is open, update the value based on the current selection and close it
      const currentOption = this.getCurrentOption();
      if (currentOption) {
        this.setSelectedOption(currentOption);
        this.displayLabel = currentOption.textContent ?? '';
        this.value = currentOption.value;
        this.valueInput.value = currentOption.value; // synchronous update for validation
        this.invalid = !this.checkValidity();
        this.emit('sl-input');
        this.emit('sl-change');
      }

      this.hide();
      this.displayInput.focus();
      return;
    }

    // Navigate options
    if (['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
      const allOptions = this.getAllOptions();
      const currentOption = this.getCurrentOption();
      const currentIndex = allOptions.indexOf(currentOption);
      let newIndex = Math.max(0, currentIndex);

      // Prevent scrolling
      event.preventDefault();

      // Open it
      if (!this.open) {
        this.show();

        // If an option is already selected, stop here because we want that one to remain highlighted when the listbox
        // opens for the first time
        if (currentOption) {
          return;
        }
      }

      if (event.key === 'ArrowDown') {
        newIndex = currentIndex + 1;
        if (newIndex > allOptions.length - 1) newIndex = 0;
      } else if (event.key === 'ArrowUp') {
        newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = allOptions.length - 1;
      } else if (event.key === 'Home') {
        newIndex = 0;
      } else if (event.key === 'End') {
        newIndex = allOptions.length - 1;
      }

      this.setCurrentOption(allOptions[newIndex]);
    }

    // All other "printable" keys trigger type to select
    if (event.key.length === 1 || event.key === 'Backspace') {
      const allOptions = this.getAllOptions();

      // Don't block important key combos like CMD+R
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      // Open, unless the key that triggered is backspace
      if (!this.open) {
        if (event.key === 'Backspace') {
          return;
        }

        this.show();
      }

      event.stopPropagation();
      event.preventDefault();

      clearTimeout(this.typeToSelectTimeout);
      this.typeToSelectTimeout = window.setTimeout(() => (this.typeToSelectString = ''), 1000);

      if (event.key === 'Backspace') {
        this.typeToSelectString = this.typeToSelectString.slice(0, -1);
      } else {
        this.typeToSelectString += event.key.toLowerCase();
      }

      console.log(this.typeToSelectString);

      for (const option of allOptions) {
        const label = (option.textContent ?? '').toLowerCase();

        if (label.startsWith(this.typeToSelectString)) {
          this.setCurrentOption(option);
          break;
        }
      }
    }
  }

  handleDocumentMouseDown(event: MouseEvent) {
    // Close when clicking outside of the select
    const path = event.composedPath();
    if (this && !path.includes(this)) {
      this.hide();
    }
  }

  handleLabelClick() {
    this.displayInput.focus();
  }

  // We use mousedown/mouseup instead of click to allow macOS-style menu behavior
  handleComboboxMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.displayInput.focus();
    this.open = !this.open;
  }

  handleComboboxKeyDown(event: KeyboardEvent) {
    event.stopPropagation();
    this.handleDocumentKeyDown(event);
  }

  handleClearClick(event: MouseEvent) {
    event.stopPropagation();

    if (this.value !== '') {
      this.displayLabel = '';
      this.value = '';
      this.valueInput.value = ''; // synchronous update for validation
      this.invalid = !this.checkValidity();
      this.emit('sl-clear');
      this.emit('sl-input');
      this.emit('sl-change');
    }
  }

  handleClearMouseDown(event: MouseEvent) {
    event.stopPropagation();
  }

  // We use mousedown/mouseup instead of click to allow macOS-style menu behavior
  handleOptionMouseUp(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const option = target.closest('sl-option');
    const oldValue = this.value;

    if (!option) {
      return;
    }

    // Update the value and focus after updating so the value is read by screen readers
    this.value = option.value;
    this.valueInput.value = option.value; // synchronous update for validation
    this.invalid = !this.checkValidity();
    this.updateComplete.then(() => this.displayInput.focus());

    if (this.value !== oldValue) {
      this.emit('sl-input');
      this.emit('sl-change');
    }

    this.hide();
  }

  handleDefaultSlotChange() {
    const allOptions = this.getAllOptions();
    const values: string[] = [];

    // Check for duplicate values in menu items
    allOptions.forEach(option => {
      if (values.includes(option.value)) {
        console.error(`Duplicate value found in <sl-select>`, option);
      }
      values.push(option.value);
    });

    // Update the selected option
    const option = this.getOptionByValue(this.value);
    if (option) {
      this.setSelectedOption(option);
      this.value = option.value;
      this.displayLabel = option.textContent ?? '';
    } else {
      // Clear selection
      this.setSelectedOption(null);
    }
  }

  // Gets an array of all <sl-option> elements
  getAllOptions() {
    return [...this.querySelectorAll<SlOption>('sl-option')];
  }

  // Gets the first <sl-option> element
  getFirstOption() {
    return this.querySelector<SlOption>('sl-option');
  }

  // Gets an option based on its value
  getOptionByValue(value: string) {
    return this.getAllOptions().filter((el: SlOption) => el.value === value)[0];
  }

  // Gets the current option
  getCurrentOption() {
    return this.getAllOptions().filter(el => el.current)[0];
  }

  // Sets the current option
  setCurrentOption(option: SlOption | null) {
    const allOptions = this.getAllOptions();

    // Clear selection
    allOptions.forEach(el => {
      el.current = false;
      el.tabIndex = -1;
    });

    // Select the target option
    if (option) {
      option.current = true;
      option.tabIndex = 0;
      option.focus();
      scrollIntoView(option, this.listbox);
    }
  }

  // Gets the selected option
  getSelectedOption() {
    return this.getAllOptions().filter(el => el.selected)[0];
  }

  // Sets the selected option
  setSelectedOption(option: SlOption | null) {
    const allOptions = this.getAllOptions();

    // Clear selection
    allOptions.forEach(el => (el.selected = false));

    // Select the target option
    if (option) {
      option.selected = true;
      scrollIntoView(option, this.listbox);
    }
  }

  @watch('value', { waitUntilFirstUpdate: true })
  handleValueChange() {
    const option = this.getOptionByValue(this.value);

    // Update the selection
    this.setSelectedOption(option);

    if (option) {
      this.value = option.value;
      this.displayLabel = option.textContent ?? '';
    } else {
      // No option, reset the control
      this.value = '';
      this.displayLabel = '';
    }
  }

  /** Shows the listbox. */
  async show() {
    if (this.open || this.disabled) {
      this.open = false;
      return undefined;
    }

    this.open = true;
    return waitForEvent(this, 'sl-after-show');
  }

  /** Hides the listbox. */
  async hide() {
    if (!this.open || this.disabled) {
      this.open = false;
      return undefined;
    }

    this.open = false;
    return waitForEvent(this, 'sl-after-hide');
  }

  addOpenListeners() {
    document.addEventListener('focusin', this.handleDocumentFocusIn);
    document.addEventListener('keydown', this.handleDocumentKeyDown);
    document.addEventListener('mousedown', this.handleDocumentMouseDown);
  }

  removeOpenListeners() {
    document.removeEventListener('focusin', this.handleDocumentFocusIn);
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
    document.removeEventListener('mousedown', this.handleDocumentMouseDown);
  }

  @watch('open', { waitUntilFirstUpdate: true })
  async handleOpenChange() {
    if (this.disabled) {
      this.hide();
      return;
    }

    if (this.open) {
      const selectedOption = this.getOptionByValue(this.value);
      const currentOption = selectedOption || this.getFirstOption();

      // Show
      this.emit('sl-show');
      this.addOpenListeners();

      await stopAnimations(this);
      this.listbox.hidden = false;
      this.popup.active = true;

      // Select the appropriate option based on value after the listbox opens
      requestAnimationFrame(() => {
        this.setSelectedOption(selectedOption);
        this.setCurrentOption(currentOption);
      });

      const { keyframes, options } = getAnimation(this, 'select.show', { dir: this.localize.dir() });
      await animateTo(this.popup.popup, keyframes, options);

      // Make sure the current option is scrolled into view (required for Safari)
      if (currentOption) {
        scrollIntoView(currentOption, this.listbox, 'vertical', 'auto');
      }

      this.emit('sl-after-show');
    } else {
      // Hide
      this.emit('sl-hide');
      this.removeOpenListeners();

      await stopAnimations(this);
      const { keyframes, options } = getAnimation(this, 'select.hide', { dir: this.localize.dir() });
      await animateTo(this.popup.popup, keyframes, options);
      this.listbox.hidden = true;
      this.popup.active = false;

      this.emit('sl-after-hide');
    }
  }

  render() {
    const hasLabelSlot = this.hasSlotController.test('label');
    const hasHelpTextSlot = this.hasSlotController.test('help-text');
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
    const hasClearIcon = this.clearable && !this.disabled && this.value.length > 0;
    const isPlaceholderVisible = this.value === '';
    const isRtl = this.localize.dir() === 'rtl';

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
          id="label"
          part="form-control-label"
          class="form-control__label"
          aria-hidden=${hasLabel ? 'false' : 'true'}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <sl-popup
            part="base"
            class=${classMap({
              select: true,
              'select--standard': true,
              'select--filled': this.filled,
              'select--pill': this.pill,
              'select--open': this.open,
              'select--disabled': this.disabled,
              'select--focused': this.hasFocus,
              'select--placeholder-visible': isPlaceholderVisible,
              'select--top': this.placement === 'top',
              'select--bottom': this.placement === 'bottom',
              'select--small': this.size === 'small',
              'select--medium': this.size === 'medium',
              'select--large': this.size === 'large'
            })}
            placement=${this.placement}
            strategy=${this.hoist ? 'fixed' : 'absolute'}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              slot="anchor"
              class="select__combobox-wrapper"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
            >
              <div class="select__combobox">
                <slot name="prefix" class="select__prefix"></slot>

                <input
                  class="select__display-input"
                  type="text"
                  placeholder=${this.placeholder}
                  .value=${this.displayLabel}
                  autocomplete="off"
                  spellcheck="false"
                  autocapitalize="off"
                  readonly
                  aria-controls="listbox"
                  aria-expanded=${this.open ? 'true' : 'false'}
                  aria-haspopup="listbox"
                  aria-labelledby="label"
                  aria-disabled=${this.disabled ? 'true' : 'false'}
                  aria-describedby="help-text"
                  role="combobox"
                  tabindex="0"
                  @focus=${this.handleFocus}
                  @blur=${this.handleBlur}
                />

                <input
                  class="select__value-input"
                  type="text"
                  ?disabled=${this.disabled}
                  ?required=${this.required}
                  .value=${this.value}
                  tabindex="-1"
                  aria-hidden="true"
                  @focus=${() => this.focus()}
                />
              </div>

              ${hasClearIcon
                ? html`
                    <button
                      part="clear-button"
                      class="select__clear"
                      type="button"
                      aria-label=${this.localize.term('clearEntry')}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <sl-icon name="x-circle-fill" library="system"></sl-icon>
                      </slot>
                    </button>
                  `
                : ''}

              <span part="expand-icon" class="select__expand-icon">
                <slot part="expand-icon" name="expand-icon">
                  <sl-icon library="system" name="chevron-down"></sl-icon>
                </slot>
              </span>
            </div>

            <slot
              id="listbox"
              role="listbox"
              aria-expanded=${this.open ? 'true' : 'false'}
              aria-multiselectable="false"
              aria-labelledby="label"
              part="panel"
              class="select__listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionMouseUp}
              @slotchange=${this.handleDefaultSlotChange}
            ></slot>
          </sl-popup>

          <slot
            name="help-text"
            part="form-control-help-text"
            id="help-text"
            class="form-control__help-text"
            aria-hidden=${hasHelpText ? 'false' : 'true'}
          >
            ${this.helpText}
          </slot>
        </div>
      </div>
    `;
  }
}

setDefaultAnimation('select.show', {
  keyframes: [
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1 }
  ],
  options: { duration: 100, easing: 'ease' }
});

setDefaultAnimation('select.hide', {
  keyframes: [
    { opacity: 1, scale: 1 },
    { opacity: 0, scale: 0.9 }
  ],
  options: { duration: 100, easing: 'ease' }
});

declare global {
  interface HTMLElementTagNameMap {
    'sl-select': SlSelect;
  }
}
