import { html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { defaultValue } from '../../internal/default-value';
import { emit } from '../../internal/event';
import { FormSubmitController } from '../../internal/form';
import { watch } from '../../internal/watch';
import styles from './radio.styles';
import type { CSSResultGroup } from 'lit';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The radio's label.
 *
 * @event sl-blur - Emitted when the control loses focus.
 * @event sl-change - Emitted when the control's checked state changes.
 * @event sl-focus - Emitted when the control gains focus.
 *
 * @csspart base - The component's internal wrapper.
 * @csspart control - The radio control.
 * @csspart checked-icon - The container the wraps the checked icon.
 * @csspart label - The radio label.
 */
@customElement('sl-radio')
export default class SlRadio extends LitElement {
  static styles: CSSResultGroup = styles;

  @query('.radio__input') input: HTMLInputElement;

  protected readonly formSubmitController = new FormSubmitController(this, {
    value: (control: SlRadio) => (control.checked ? control.value || 'on' : undefined),
    defaultValue: (control: SlRadio) => control.defaultChecked,
    setValue: (control: SlRadio, checked: boolean) => (control.checked = checked)
  });

  @state() protected hasFocus = false;

  /** The radio's name attribute. */
  @property() name: string;

  /** The radio's value attribute. */
  @property() value: string;

  /** Disables the radio. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Draws the radio in a checked state. */
  @property({ type: Boolean, reflect: true }) checked = false;

  /**
   * This will be true when the control is in an invalid state. Validity in radios is determined by the message provided
   * by the `setCustomValidity` method.
   */
  @property({ type: Boolean, reflect: true }) invalid = false;

  /** Gets or sets the default value used to reset this element. The initial value corresponds to the one originally specified in the HTML that created this element. */
  @defaultValue('checked')
  defaultChecked = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'radio');
  }

  /** Simulates a click on the radio. */
  click() {
    this.input.click();
  }

  /** Sets focus on the radio. */
  focus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the radio. */
  blur() {
    this.input.blur();
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity(): boolean {
    const group = this.closest('sl-radio-group');
    const allRadios = group?.getAllRadios().filter(radio => !radio.disabled);
    const isRequired = group?.required;
    const isChecked = allRadios?.some(radio => radio.checked);
    const internalRadio = (radio: SlRadio): HTMLInputElement =>
      radio.shadowRoot!.querySelector<HTMLInputElement>('input[type="radio"]')!;

    // If no radio group or radios are found, skip validation
    if (!group || !allRadios) {
      return true;
    }

    // If the radio group is required but no radios are checked, mark the first internal radio required and report it
    if (isRequired && !isChecked) {
      const radio = internalRadio(allRadios[0]);
      radio.required = true;
      return radio.reportValidity();
    }

    // Reset the required state of all internal radios so we can accurately report custom validation messages
    allRadios.forEach(radio => (internalRadio(radio).required = false));

    // Report custom validation errors
    for (const radio of allRadios) {
      if (!internalRadio(radio).reportValidity()) {
        return false;
      }
    }

    return true;
  }

  /** Sets a custom validation message. If `message` is not empty, the field will be considered invalid. */
  setCustomValidity(message: string) {
    this.input.setCustomValidity(message);
    this.invalid = !this.input.checkValidity();
  }

  handleBlur() {
    this.hasFocus = false;
    emit(this, 'sl-blur');
  }

  handleClick() {
    if (!this.disabled) {
      this.checked = true;
    }
  }

  handleFocus() {
    this.hasFocus = true;
    emit(this, 'sl-focus');
  }

  @watch('checked')
  handleCheckedChange() {
    this.setAttribute('aria-checked', this.checked ? 'true' : 'false');

    if (this.hasUpdated) {
      emit(this, 'sl-change');
    }
  }

  @watch('disabled', { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');

    // Disabled form controls are always valid, so we need to recheck validity when the state changes
    if (this.hasUpdated) {
      this.input.disabled = this.disabled;
      this.invalid = !this.input.checkValidity();
    }
  }

  render() {
    return html`
      <label
        part="base"
        class=${classMap({
          radio: true,
          'radio--checked': this.checked,
          'radio--disabled': this.disabled,
          'radio--focused': this.hasFocus
        })}
      >
        <input
          class="radio__input"
          type="radio"
          name=${ifDefined(this.name)}
          value=${ifDefined(this.value)}
          .checked=${live(this.checked)}
          .disabled=${this.disabled}
          @click=${this.handleClick}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
        />
        <span part="control" class="radio__control">
          <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g fill="currentColor">
                <circle cx="8" cy="8" r="3.42857143"></circle>
              </g>
            </g>
          </svg>
        </span>

        <span part="label" class="radio__label">
          <slot></slot>
        </span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-radio': SlRadio;
  }
}
