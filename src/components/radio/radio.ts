import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { emit } from '../../internal/event';
import { watch } from '../../internal/watch';
import { FormSubmitController } from '../../internal/form-control';
import styles from './radio.styles';

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
 * @csspart base - The component's base wrapper.
 * @csspart control - The radio control.
 * @csspart checked-icon - The container the wraps the checked icon.
 * @csspart label - The radio label.
 */
@customElement('sl-radio')
export default class SlRadio extends LitElement {
  static styles = styles;

  @query('input[type="radio"]') input: HTMLInputElement;

  // @ts-ignore
  private formSubmitController = new FormSubmitController(this, {
    value: (control: SlRadio) => (control.checked ? control.value : undefined)
  });

  @state() private hasFocus = false;

  /** The radio's name attribute. */
  @property() name: string;

  /** The radio's value attribute. */
  @property() value: string;

  /** Disables the radio. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Draws the radio in a checked state. */
  @property({ type: Boolean, reflect: true }) checked = false;

  /**
   * This will be true when the control is in an invalid state. Validity in range inputs is determined by the message
   * provided by the `setCustomValidity` method.
   */
  @property({ type: Boolean, reflect: true }) invalid = false;

  firstUpdated() {
    const radios = this.getAllRadios();
    const checkedRadio = radios.find(radio => radio.checked);

    radios.map(radio => {
      if (radio.input) {
        radio.input.tabIndex = -1;
      }
    });

    if (checkedRadio) {
      checkedRadio.input.tabIndex = 0;
    } else if (radios.length) {
      radios[0].input.tabIndex = 0;
    }
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
  reportValidity() {
    return this.input.reportValidity();
  }

  /** Sets a custom validation message. If `message` is not empty, the field will be considered invalid. */
  setCustomValidity(message: string) {
    this.input.setCustomValidity(message);
    this.invalid = !this.input.checkValidity();
  }

  getAllRadios() {
    const radioGroup = this.closest('sl-radio-group');

    // Radios must be part of a radio group
    if (!radioGroup) {
      return [this];
    }

    return [...radioGroup.querySelectorAll('sl-radio')].filter((radio: this) => radio.name === this.name) as this[];
  }

  getSiblingRadios() {
    return this.getAllRadios().filter(radio => radio !== this) as this[];
  }

  handleBlur() {
    this.hasFocus = false;
    emit(this, 'sl-blur');
  }

  @watch('checked', { waitUntilFirstUpdate: true })
  handleCheckedChange() {
    if (this.checked) {
      this.input.tabIndex = 0;

      this.getSiblingRadios().map(radio => {
        radio.input.tabIndex = -1;
        radio.checked = false;
      });
    }
  }

  handleClick() {
    this.checked = true;
    emit(this, 'sl-change');
  }

  @watch('disabled')
  handleDisabledChange() {
    // Disabled form controls are always valid, so we need to recheck validity when the state changes
    if (this.input) {
      this.input.disabled = this.disabled;
      this.invalid = !this.input.checkValidity();
    }
  }

  handleFocus() {
    this.hasFocus = true;
    emit(this, 'sl-focus');
  }

  handleKeyDown(event: KeyboardEvent) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      const radios = this.getAllRadios().filter(radio => !radio.disabled);
      const incr = ['ArrowUp', 'ArrowLeft'].includes(event.key) ? -1 : 1;
      let index = radios.indexOf(this) + incr;
      if (index < 0) index = radios.length - 1;
      if (index > radios.length - 1) index = 0;

      this.getAllRadios().map(radio => {
        radio.checked = false;
        radio.input.tabIndex = -1;
      });

      radios[index].focus();
      radios[index].checked = true;
      radios[index].input.tabIndex = 0;

      emit(radios[index], 'sl-change');

      event.preventDefault();
    }
  }

  render() {
    this.setAttribute('role', 'radio');
    this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');

    return html`
      <label
        part="base"
        class=${classMap({
          radio: true,
          'radio--checked': this.checked,
          'radio--disabled': this.disabled,
          'radio--focused': this.hasFocus
        })}
        @keydown=${this.handleKeyDown}
      >
        <input
          class="radio__input"
          type="radio"
          name=${ifDefined(this.name)}
          value=${ifDefined(this.value)}
          .checked=${live(this.checked)}
          .disabled=${this.disabled}
          aria-hidden="true"
          @click=${this.handleClick}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
        />
        <span part="control" class="radio__control">
          <span part="checked-icon" class="radio__icon">
            <svg viewBox="0 0 16 16">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g fill="currentColor">
                  <circle cx="8" cy="8" r="3.42857143"></circle>
                </g>
              </g>
            </svg>
          </span>
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
