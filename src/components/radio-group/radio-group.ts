import { html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { emit } from 'src/internal/event';
import { FormSubmitController } from 'src/internal/form';
import { watch } from 'src/internal/watch';
import '../../components/button-group/button-group';
import styles from './radio-group.styles';
import type SlRadio from '../../components/radio/radio';
import type SlRadioButton from '../radio-button/radio-button';
import type { CSSResultGroup } from 'lit';

const RADIO_CHILDREN = ['sl-radio', 'sl-radio-button'];

/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-button-group
 *
 * @slot - The default slot where radio controls are placed.
 * @slot label - The radio group label. Required for proper accessibility. Alternatively, you can use the label prop.
 *
 * @csspart base - The component's internal wrapper.
 * @csspart label - The radio group's label.
 * @csspart button-group - The button group that wraps radio buttons.
 * @csspart button-group__base - The button group's `base` part.
 */
@customElement('sl-radio-group')
export default class SlRadioGroup extends LitElement {
  static styles: CSSResultGroup = styles;

  @query('slot:not([name])') defaultSlot: HTMLSlotElement;
  @query('.radio-group__validation-input') input: HTMLInputElement;

  @state() private hasButtonGroup = false;
  @state() private isInvalid = false;
  @state() private errorMessage = '';

  /** The radio group label. Required for proper accessibility. Alternatively, you can use the label slot. */
  @property() label = '';

  /** The selected value of the control. */
  @property({ reflect: true }) value = '';

  /** The name assigned to the radio controls. */
  @property() name = 'option';

  /** Shows the fieldset and legend that surrounds the radio group. */
  @property({ type: Boolean, attribute: 'fieldset', reflect: true }) fieldset = false;

  /** Ensures a child radio is checked before allowing the containing form to submit. */
  @property({ type: Boolean, reflect: true }) required = false;

  @watch('value')
  handleValueChange() {
    if (this.hasUpdated) {
      emit(this, 'sl-change');
    }
  }

  connectedCallback() {
    super.connectedCallback();
  }

  setCustomValidity(message: string) {
    this.errorMessage = message;

    if (!message) {
      this.isInvalid = false;
    } else {
      this.isInvalid = true;
      this.input.setCustomValidity(message);
      this.showNativeErrorMessage();
    }
  }

  get validity(): ValidityState {
    const isValid = (this.value && this.required) || !this.required;

    return {
      badInput: false,
      customError: false,
      patternMismatch: false,
      rangeOverflow: false,
      rangeUnderflow: false,
      stepMismatch: false,
      tooLong: false,
      tooShort: false,
      typeMismatch: false,
      valid: isValid,
      valueMissing: !isValid
    };
  }

  reportValidity() {
    const validity = this.validity;
    this.errorMessage = validity.valid ? '' : this.input.validationMessage;
    this.isInvalid = !validity.valid;

    if (!validity.valid) {
      this.showNativeErrorMessage();
    }
  }

  private showNativeErrorMessage() {
    this.input.hidden = false;
    this.input.reportValidity();
    setTimeout(() => (this.input.hidden = true), 10000);
  }

  private getAllRadios() {
    return [...this.querySelectorAll(RADIO_CHILDREN.join(','))].filter(el =>
      RADIO_CHILDREN.includes(el.tagName.toLowerCase())
    ) as SlRadio[];
  }

  private handleRadioClick(event: MouseEvent) {
    const target = event.target as SlRadio | SlRadioButton;

    if (target.disabled) {
      return;
    }

    this.value = target.value;
    const radios = this.getAllRadios();
    radios.forEach(radio => (radio.checked = radio === target));
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(event.key)) {
      return;
    }

    const radios = this.getAllRadios().filter(radio => !radio.disabled);
    const checkedRadio = radios.find(radio => radio.checked) ?? radios[0];
    const incr = event.key === ' ' ? 0 : ['ArrowUp', 'ArrowLeft'].includes(event.key) ? -1 : 1;
    let index = radios.indexOf(checkedRadio) + incr;
    if (index < 0) {
      index = radios.length - 1;
    }
    if (index > radios.length - 1) {
      index = 0;
    }

    this.getAllRadios().forEach(radio => {
      radio.checked = false;

      if(!this.hasButtonGroup) {
        radio.tabIndex = -1;
      }
    });

    this.value = radios[index].value;
    radios[index].checked = true;
    
    if(!this.hasButtonGroup) {
      radios[index].tabIndex = 0;
      radios[index].focus();
    } else {
      radios[index].shadowRoot!.querySelector('button')!.focus();
    }

    event.preventDefault();
  }

  private handleSlotChange() {
    const radios = this.getAllRadios();

    radios.forEach(radio => {
      radio.name = this.name;
      radio.checked = radio.value === this.value;
    });

    this.hasButtonGroup = radios.some(radio => radio.tagName.toLowerCase() === 'sl-radio-button');

    if (!radios.some(radio => radio.checked)) {
      if(this.hasButtonGroup) {
        const buttonRadio = radios[0].shadowRoot!.querySelector('button')!;
        buttonRadio.tabIndex = 0;
      } else {
        radios[0].tabIndex = 0;
      }
    }

    if (this.hasButtonGroup) {
      const buttonGroup = this.shadowRoot?.querySelector('sl-button-group');

      if (buttonGroup) {
        buttonGroup.disableRole = true;
      }
    }
  }

  render() {
    const defaultSlot = html`
      <slot
        @click=${this.handleRadioClick}
        @keydown=${this.handleKeyDown}
        @slotchange=${this.handleSlotChange}
        role="presentation"
      ></slot>
    `;

    return html`
      <fieldset
        part="base"
        role="radiogroup"
        aria-errormessage="radio-error-message"
        aria-invalid="${this.isInvalid}"
        class=${classMap({
          'radio-group': true,
          'radio-group--has-fieldset': this.fieldset,
          'radio-group--required': this.required
        })}
      >
        <legend part="label" class="radio-group__label">
          <slot name="label">${this.label}</slot>
        </legend>
        <div class="visually-hidden">
          <div id="radio-error-message" aria-live="assertive">${this.errorMessage}</div>
          <label class="radio-group__validation visually-hidden">
            <input type="text" class="radio-group__validation-input" ?required=${this.required} tabindex="-1" hidden />
          </label>
        </div>
        ${this.hasButtonGroup
          ? html`<sl-button-group part="button-group">${defaultSlot}</sl-button-group>`
          : defaultSlot}
      </fieldset>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-radio-group': SlRadioGroup;
  }
}
