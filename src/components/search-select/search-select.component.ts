import { animateTo, stopAnimations } from '../../internal/animate.js';
import { classMap } from 'lit/directives/class-map.js';
import { FormControlController } from '../../internal/form.js';
import { getAnimation, setDefaultAnimation } from '../../utilities/animation-registry.js';
import { HasSlotController } from '../../internal/slot.js';
import { html } from 'lit';
import { LocalizeController } from '../../utilities/localize.js';
import { property, query, state } from 'lit/decorators.js';
import { scrollIntoView } from '../../internal/scroll.js';
import { waitForEvent } from '../../internal/event.js';
import { watch } from '../../internal/watch.js';
import componentStyles from '../../styles/component.styles.js';
import formControlStyles from '../../styles/form-control.styles.js';
import selectStyles from '../select/select.styles.js';
import ShoelaceElement from '../../internal/shoelace-element.js';
import SlIcon from '../icon/icon.component.js';
import SlPopup from '../popup/popup.component.js';
import type { CSSResultGroup } from 'lit';
import type { ShoelaceFormControl } from '../../internal/shoelace-element.js';
import type SlOption from '../option/option.component.js';

/**
 * @summary Combobox with an always-editable text field and `<sl-option>` items; intended for async search or filter UIs.
 * @status experimental
 *
 * @dependency sl-icon
 * @dependency sl-popup
 *
 * @slot - Options (`<sl-option>`).
 * @slot label - The control's label.
 * @slot prefix - Icon or element before the field.
 * @slot suffix - Content after the field.
 * @slot clear-icon - Icon for the clear button.
 * @slot expand-icon - Expand/collapse icon.
 * @slot help-text - Help text.
 *
 * @event sl-change - Emitted when the value changes due to user action.
 * @event sl-clear - Emitted when the value is cleared.
 * @event sl-input - Emitted on each change to the search text (`searchQuery`).
 * @event sl-focus - Emitted when the control gains focus.
 * @event sl-blur - Emitted when the control loses focus.
 */
export default class SlSearchSelect extends ShoelaceElement implements ShoelaceFormControl {
  static styles: CSSResultGroup = [componentStyles, formControlStyles, selectStyles];
  static dependencies = {
    'sl-icon': SlIcon,
    'sl-popup': SlPopup
  };

  private readonly formControlController = new FormControlController(this, {
    assumeInteractionOn: ['sl-blur', 'sl-input']
  });
  private readonly hasSlotController = new HasSlotController(this, 'help-text', 'label');
  private readonly localize = new LocalizeController(this);
  private typeToSelectString = '';
  private typeToSelectTimeout: number;
  private closeWatcher: CloseWatcher | null;

  @query('.select') popup: SlPopup;
  @query('.select__display-input') displayInput: HTMLInputElement;
  @query('.select__value-input') valueInput: HTMLInputElement;
  @query('.select__listbox') listbox: HTMLSlotElement;

  @state() private hasFocus = false;
  @state() displayLabel = '';
  /** Current search string; use with `sl-input` listeners to filter options (e.g. async). */
  @state() searchQuery = '';
  @state() currentOption: SlOption;
  @state() selectedOptions: SlOption[] = [];
  @state() private valueHasChanged = false;

  @property() name = '';

  private _value = '';

  get value() {
    return this._value;
  }

  @state()
  set value(val: string) {
    if (this._value === val) {
      return;
    }
    this.valueHasChanged = true;
    this._value = val;
  }

  @property({ attribute: 'value' }) defaultValue = '';

  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';
  @property() placeholder = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean }) clearable = false;
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Boolean }) hoist = false;
  @property({ type: Boolean, reflect: true }) filled = false;
  @property({ type: Boolean, reflect: true }) pill = false;
  @property() label = '';
  @property({ reflect: true }) placement: 'top' | 'bottom' = 'bottom';
  @property({ attribute: 'help-text' }) helpText = '';
  @property({ reflect: true }) form = '';
  @property({ type: Boolean, reflect: true }) required = false;

  get validity() {
    return this.valueInput.validity;
  }

  get validationMessage() {
    return this.valueInput.validationMessage;
  }

  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => this.handleDefaultSlotChange(), 0);
    this.open = false;
  }

  private addOpenListeners() {
    document.addEventListener('focusin', this.handleDocumentFocusIn);
    document.addEventListener('keydown', this.handleDocumentKeyDown);
    document.addEventListener('mousedown', this.handleDocumentMouseDown);
    if (this.getRootNode() !== document) {
      this.getRootNode().addEventListener('focusin', this.handleDocumentFocusIn);
    }
    if ('CloseWatcher' in window) {
      this.closeWatcher?.destroy();
      this.closeWatcher = new CloseWatcher();
      this.closeWatcher.onclose = () => {
        if (this.open) {
          this.hide();
          this.displayInput.focus({ preventScroll: true });
        }
      };
    }
  }

  private removeOpenListeners() {
    document.removeEventListener('focusin', this.handleDocumentFocusIn);
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
    document.removeEventListener('mousedown', this.handleDocumentMouseDown);
    if (this.getRootNode() !== document) {
      this.getRootNode().removeEventListener('focusin', this.handleDocumentFocusIn);
    }
    this.closeWatcher?.destroy();
  }

  private handleFocus() {
    this.hasFocus = true;
    this.displayInput.setSelectionRange(0, 0);
    this.emit('sl-focus');
  }

  private handleBlur() {
    this.hasFocus = false;
    this.emit('sl-blur');
    setTimeout(() => this.maybeClearSearchAfterFocusLeave(), 0);
  }

  private isFocusInsideComponent(): boolean {
    const active = document.activeElement;
    if (!active) return false;
    if (this.contains(active)) return true;
    if (this.shadowRoot?.contains(active)) return true;
    return false;
  }

  private maybeClearSearchAfterFocusLeave() {
    if (this.searchQuery === '') return;
    if (this.isFocusInsideComponent()) return;
    const noSelection = this.selectedOptions.length === 0 || !this.value;
    if (!noSelection) return;
    this.searchQuery = '';
    if (this.placeholder) {
      this.displayLabel = '';
    }
    this.emit('sl-input');
  }

  private handleDisplayInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const nextValue = input.value;
    const hadSelection = this.selectedOptions.length > 0;

    if (hadSelection) {
      this.valueHasChanged = true;
      this.searchQuery = nextValue;
      this.setSelectedOptions([], false);
      this.setCurrentOption(this.getFirstOption());
    } else {
      this.searchQuery = nextValue;
    }

    this.emit('sl-input');
    if (hadSelection) {
      this.emit('sl-change');
    }
  }

  private handleDisplayKeyDown(event: KeyboardEvent) {
    const isTypingKey =
      (event.key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) ||
      event.key === 'Backspace' ||
      event.key === 'Delete';
    if (isTypingKey) {
      event.stopPropagation();
    }
  }

  private handleDocumentFocusIn = (event: FocusEvent) => {
    const path = event.composedPath();
    if (this && !path.includes(this)) {
      this.hide();
    }
  };

  private handleDocumentKeyDown = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement;
    const isClearButton = target.closest('.select__clear') !== null;
    const isIconButton = target.closest('sl-icon-button') !== null;
    if (isClearButton || isIconButton) {
      return;
    }

    if (event.key === 'Escape' && this.open && !this.closeWatcher) {
      event.preventDefault();
      event.stopPropagation();
      this.hide();
      this.displayInput.focus({ preventScroll: true });
    }

    if (event.key === 'Enter' || (event.key === ' ' && this.typeToSelectString === '')) {
      event.preventDefault();
      event.stopImmediatePropagation();

      if (!this.open) {
        this.show();
        return;
      }

      if (this.currentOption && !this.currentOption.disabled) {
        this.valueHasChanged = true;
        this.setSelectedOptions(this.currentOption);
        this.updateComplete.then(() => {
          this.emit('sl-input');
          this.emit('sl-change');
        });
        this.hide();
        this.displayInput.focus({ preventScroll: true });
      }
      return;
    }

    if (['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
      const allOptions = this.getAllOptions();
      const currentIndex = allOptions.indexOf(this.currentOption);
      let newIndex = Math.max(0, currentIndex);
      event.preventDefault();

      if (!this.open) {
        this.show();
        if (this.currentOption) {
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

    if ((event.key && event.key.length === 1) || event.key === 'Backspace') {
      const allOptions = this.getAllOptions();
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

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

      for (const option of allOptions) {
        const label = option.getTextLabel().toLowerCase();
        if (label.startsWith(this.typeToSelectString)) {
          this.setCurrentOption(option);
          break;
        }
      }
    }
  };

  private handleDocumentMouseDown = (event: MouseEvent) => {
    const path = event.composedPath();
    if (this && !path.includes(this)) {
      this.hide();
    }
  };

  private handleLabelClick() {
    this.displayInput.focus();
  }

  private handleComboboxMouseDown(event: MouseEvent) {
    const path = event.composedPath();
    const isIconButton = path.some(el => el instanceof Element && el.tagName.toLowerCase() === 'sl-icon-button');
    if (this.disabled || isIconButton) {
      return;
    }
    event.preventDefault();
    this.displayInput.focus({ preventScroll: true });
    this.open = !this.open;
  }

  private handleComboboxKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      return;
    }
    event.stopPropagation();
    this.handleDocumentKeyDown(event);
  }

  private handleClearClick(event: MouseEvent) {
    event.stopPropagation();
    this.valueHasChanged = true;
    if (this.value !== '') {
      this.setSelectedOptions([]);
      this.displayInput.focus({ preventScroll: true });
      this.updateComplete.then(() => {
        this.emit('sl-clear');
        this.emit('sl-input');
        this.emit('sl-change');
      });
    }
  }

  private handleClearMouseDown(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
  }

  private handleOptionClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const option = target.closest('sl-option');
    const oldValue = this.value;

    if (option && !option.disabled) {
      this.valueHasChanged = true;
      this.setSelectedOptions(option);
      this.updateComplete.then(() => this.displayInput.focus({ preventScroll: true }));

      if (this.value !== oldValue) {
        this.updateComplete.then(() => {
          this.emit('sl-input');
          this.emit('sl-change');
        });
      }

      this.hide();
      this.displayInput.focus({ preventScroll: true });
    }
  }

  public handleDefaultSlotChange() {
    if (!customElements.get('sl-option')) {
      customElements.whenDefined('sl-option').then(() => this.handleDefaultSlotChange());
    }
    const allOptions = this.getAllOptions();
    const val = this.valueHasChanged ? this.value : this.defaultValue;
    const value = [val];
    this.setSelectedOptions(allOptions.filter(el => value.includes(el.value)), false);
    if (this.open) {
      this.setCurrentOption(this.getFirstOption());
    }
  }

  private getAllOptions() {
    return [...this.querySelectorAll<SlOption>('sl-option')];
  }

  private getFirstOption() {
    return this.querySelector<SlOption>('sl-option');
  }

  private setCurrentOption(option: SlOption | null) {
    const allOptions = this.getAllOptions();
    allOptions.forEach(el => {
      el.current = false;
      el.tabIndex = -1;
    });
    if (option) {
      this.currentOption = option;
      option.current = true;
      option.tabIndex = 0;
    }
  }

  private setSelectedOptions(option: SlOption | SlOption[], clearSearchQuery = true) {
    const allOptions = this.getAllOptions();
    const newSelectedOptions = Array.isArray(option) ? option : [option];
    allOptions.forEach(el => (el.selected = false));
    if (newSelectedOptions.length) {
      newSelectedOptions.forEach(el => (el.selected = true));
    }
    this.selectionChanged(clearSearchQuery);
  }

  private selectionChanged(clearSearchQuery = true) {
    const options = this.getAllOptions();
    this.selectedOptions = options.filter(el => el.selected);
    const cachedValueHasChanged = this.valueHasChanged;

    const selectedOption = this.selectedOptions[0];
    this.value = selectedOption?.value ?? '';
    this.displayLabel = selectedOption?.getTextLabel?.() ?? '';

    if (clearSearchQuery) {
      this.searchQuery = '';
    }
    this.valueHasChanged = cachedValueHasChanged;

    this.updateComplete.then(() => {
      this.formControlController.updateValidity();
    });
  }

  private handleInvalid(event: Event) {
    this.formControlController.setValidity(false);
    this.formControlController.emitInvalidEvent(event);
  }

  @watch('disabled', { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    if (this.disabled) {
      this.open = false;
      this.handleOpenChange();
    }
  }

  attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (name === 'value') {
      const cachedValueHasChanged = this.valueHasChanged;
      this.value = this.defaultValue;
      this.valueHasChanged = cachedValueHasChanged;
    }
  }

  @watch(['defaultValue', 'value'], { waitUntilFirstUpdate: true })
  handleValueChange() {
    if (!this.valueHasChanged) {
      const cachedValueHasChanged = this.valueHasChanged;
      this.value = this.defaultValue;
      this.valueHasChanged = cachedValueHasChanged;
    }

    const allOptions = this.getAllOptions();
    const selected = allOptions.filter(el => [this.value].includes(el.value));
    const clearSearchQuery = selected.length > 0;
    this.setSelectedOptions(selected, clearSearchQuery);
  }

  @watch('open', { waitUntilFirstUpdate: true })
  async handleOpenChange(prevOpen?: boolean) {
    if (this.open && !this.disabled) {
      this.setCurrentOption(this.selectedOptions[0] || this.getFirstOption());
      this.emit('sl-show');
      this.addOpenListeners();

      await stopAnimations(this);
      this.listbox.hidden = false;
      this.popup.active = true;

      requestAnimationFrame(() => {
        this.setCurrentOption(this.currentOption);
      });

      const { keyframes, options } = getAnimation(this, 'select.show', { dir: this.localize.dir() });
      await animateTo(this.popup.popup, keyframes, options);

      if (this.currentOption) {
        scrollIntoView(this.currentOption, this.listbox, 'vertical', 'auto');
      }

      this.emit('sl-after-show');
    } else {
      if (prevOpen) {
        const hadSearchQuery = this.searchQuery !== '';
        this.searchQuery = '';
        if (this.selectedOptions.length > 0) {
          this.displayLabel = this.selectedOptions[0]?.getTextLabel?.() ?? '';
        } else if (this.placeholder) {
          this.displayLabel = '';
        }
        if (hadSearchQuery) {
          this.emit('sl-input');
        }
      }
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

  async show() {
    if (this.open || this.disabled) {
      return undefined;
    }
    this.open = true;
    return waitForEvent(this, 'sl-after-show');
  }

  async hide() {
    if (!this.open) {
      return undefined;
    }
    this.open = false;
    return waitForEvent(this, 'sl-after-hide');
  }

  checkValidity() {
    return this.valueInput.checkValidity();
  }

  getForm(): HTMLFormElement | null {
    return this.formControlController.getForm();
  }

  reportValidity() {
    return this.valueInput.reportValidity();
  }

  setCustomValidity(message: string) {
    this.valueInput.setCustomValidity(message);
    this.formControlController.updateValidity();
  }

  focus(options?: FocusOptions) {
    this.displayInput.focus(options);
  }

  blur() {
    this.displayInput.blur();
  }

  render() {
    const hasLabelSlot = this.hasSlotController.test('label');
    const hasHelpTextSlot = this.hasSlotController.test('help-text');
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
    const hasClearIcon = this.clearable && !this.disabled && this.value.length > 0;
    const isPlaceholderVisible = Boolean(this.placeholder && !this.value);

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
              part="combobox"
              class="select__combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
            >
              <slot part="prefix" name="prefix" class="select__prefix"></slot>

              <input
                part="display-input"
                class="select__display-input"
                type="text"
                placeholder=${this.placeholder}
                .disabled=${this.disabled}
                .value=${this.searchQuery || this.displayLabel}
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
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
                @input=${this.handleDisplayInput}
                @keydown=${this.handleDisplayKeyDown}
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
                @invalid=${this.handleInvalid}
              />

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

              <slot name="suffix" part="suffix" class="select__suffix"></slot>

              <slot name="expand-icon" part="expand-icon" class="select__expand-icon">
                <sl-icon library="system" name="chevron-down"></sl-icon>
              </slot>
            </div>

            <div
              id="listbox"
              role="listbox"
              aria-expanded=${this.open ? 'true' : 'false'}
              aria-labelledby="label"
              part="listbox"
              class="select__listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
              @slotchange=${this.handleDefaultSlotChange}
            >
              <slot></slot>
            </div>
          </sl-popup>
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
