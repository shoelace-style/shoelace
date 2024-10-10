import { classMap } from 'lit/directives/class-map.js';
import {
  customErrorValidityState,
  FormControlController,
  validValidityState,
  valueMissingValidityState
} from '../../internal/form.js';
import { HasSlotController } from '../../internal/slot.js';
import { html } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { watch } from '../../internal/watch.js';
import componentStyles from '../../styles/component.styles.js';
import formControlStyles from '../../styles/form-control.styles.js';
import ShoelaceElement from '../../internal/shoelace-element.js';
import SlButtonGroup from '../button-group/button-group.component.js';
import styles from './radio-group.styles.js';
import type { CSSResultGroup } from 'lit';
import type { ShoelaceFormControl } from '../../internal/shoelace-element.js';
import type SlRadio from '../radio/radio.js';
import type SlRadioButton from '../radio-button/radio-button.js';

/**
 * @summary Radio groups are used to group multiple [radios](/components/radio) or [radio buttons](/components/radio-button) so they function as a single form control.
 * @documentation https://shoelace.style/components/radio-group
 * @status stable
 * @since 2.0
 *
 * @dependency sl-button-group
 *
 * @slot - The default slot where `<sl-radio>` or `<sl-radio-button>` elements are placed.
 * @slot label - The radio group's label. Required for proper accessibility. Alternatively, you can use the `label`
 *  attribute.
 * @slot help-text - Text that describes how to use the radio group. Alternatively, you can use the `help-text` attribute.
 *
 * @event sl-change - Emitted when the radio group's selected value changes.
 * @event sl-input - Emitted when the radio group receives user input.
 * @event sl-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The input's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart button-group - The button group that wraps radio buttons.
 * @csspart button-group__base - The button group's `base` part.
 */
export default class SlRadioGroup extends ShoelaceElement implements ShoelaceFormControl {
  static styles: CSSResultGroup = [componentStyles, formControlStyles, styles];
  static dependencies = { 'sl-button-group': SlButtonGroup };

  protected readonly formControlController = new FormControlController(this);
  private readonly hasSlotController = new HasSlotController(this, 'help-text', 'label');
  private customValidityMessage = '';
  private validationTimeout: number;

  @query('slot:not([name])') defaultSlot: HTMLSlotElement;
  @query('.radio-group__validation-input') validationInput: HTMLInputElement;

  @state() private hasButtonGroup = false;
  @state() private errorMessage = '';
  @state() defaultValue = '';

  /**
   * The radio group's label. Required for proper accessibility. If you need to display HTML, use the `label` slot
   * instead.
   */
  @property() label = '';

  /** The radio groups's help text. If you need to display HTML, use the `help-text` slot instead. */
  @property({ attribute: 'help-text' }) helpText = '';

  /** The name of the radio group, submitted as a name/value pair with form data. */
  @property() name = 'option';

  /** The current value of the radio group, submitted as a name/value pair with form data. */
  @property({ reflect: true }) value = '';

  /** The radio group's size. This size will be applied to all child radios and radio buttons. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
   * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
   * the same document or shadow root for this to work.
   */
  @property({ reflect: true }) form = '';

  /** Ensures a child radio is checked before allowing the containing form to submit. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Gets the validity state object */
  get validity() {
    const isRequiredAndEmpty = this.required && !this.value;
    const hasCustomValidityMessage = this.customValidityMessage !== '';

    if (hasCustomValidityMessage) {
      return customErrorValidityState;
    } else if (isRequiredAndEmpty) {
      return valueMissingValidityState;
    }

    return validValidityState;
  }

  /** Gets the validation message */
  get validationMessage() {
    const isRequiredAndEmpty = this.required && !this.value;
    const hasCustomValidityMessage = this.customValidityMessage !== '';

    if (hasCustomValidityMessage) {
      return this.customValidityMessage;
    } else if (isRequiredAndEmpty) {
      return this.validationInput.validationMessage;
    }

    return '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.defaultValue = this.value;
  }

  firstUpdated() {
    this.formControlController.updateValidity();
  }

  private getAllRadios() {
    return [...this.querySelectorAll<SlRadio | SlRadioButton>('sl-radio, sl-radio-button')];
  }

  private handleRadioClick(event: MouseEvent) {
    const target = (event.target as HTMLElement).closest<SlRadio | SlRadioButton>('sl-radio, sl-radio-button')!;
    const radios = this.getAllRadios();
    const oldValue = this.value;

    if (!target || target.disabled) {
      return;
    }

    this.value = target.value;
    radios.forEach(radio => (radio.checked = radio === target));

    if (this.value !== oldValue) {
      this.emit('sl-change');
      this.emit('sl-input');
    }
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(event.key)) {
      return;
    }

    const radios = this.getAllRadios().filter(radio => !radio.disabled);
    const checkedRadio = radios.find(radio => radio.checked) ?? radios[0];
    const incr = event.key === ' ' ? 0 : ['ArrowUp', 'ArrowLeft'].includes(event.key) ? -1 : 1;
    const oldValue = this.value;
    let index = radios.indexOf(checkedRadio) + incr;

    if (index < 0) {
      index = radios.length - 1;
    }

    if (index > radios.length - 1) {
      index = 0;
    }

    this.getAllRadios().forEach(radio => {
      radio.checked = false;

      if (!this.hasButtonGroup) {
        radio.setAttribute('tabindex', '-1');
      }
    });

    this.value = radios[index].value;
    radios[index].checked = true;

    if (!this.hasButtonGroup) {
      radios[index].setAttribute('tabindex', '0');
      radios[index].focus();
    } else {
      radios[index].shadowRoot!.querySelector('button')!.focus();
    }

    if (this.value !== oldValue) {
      this.emit('sl-change');
      this.emit('sl-input');
    }

    event.preventDefault();
  }

  private handleLabelClick() {
    this.focus();
  }

  private handleInvalid(event: Event) {
    this.formControlController.setValidity(false);
    this.formControlController.emitInvalidEvent(event);
  }

  private async syncRadioElements() {
    const radios = this.getAllRadios();

    await Promise.all(
      // Sync the checked state and size
      radios.map(async radio => {
        await radio.updateComplete;
        radio.checked = radio.value === this.value;
        radio.size = this.size;
      })
    );

    this.hasButtonGroup = radios.some(radio => radio.tagName.toLowerCase() === 'sl-radio-button');

    if (radios.length > 0 && !radios.some(radio => radio.checked)) {
      if (this.hasButtonGroup) {
        const buttonRadio = radios[0].shadowRoot?.querySelector('button');

        if (buttonRadio) {
          buttonRadio.setAttribute('tabindex', '0');
        }
      } else {
        radios[0].setAttribute('tabindex', '0');
      }
    }

    if (this.hasButtonGroup) {
      const buttonGroup = this.shadowRoot?.querySelector('sl-button-group');

      if (buttonGroup) {
        buttonGroup.disableRole = true;
      }
    }
  }

  private syncRadios() {
    if (customElements.get('sl-radio') && customElements.get('sl-radio-button')) {
      this.syncRadioElements();
      return;
    }

    if (customElements.get('sl-radio')) {
      this.syncRadioElements();
    } else {
      customElements.whenDefined('sl-radio').then(() => this.syncRadios());
    }

    if (customElements.get('sl-radio-button')) {
      this.syncRadioElements();
    } else {
      // Rerun this handler when <sl-radio> or <sl-radio-button> is registered
      customElements.whenDefined('sl-radio-button').then(() => this.syncRadios());
    }
  }

  private updateCheckedRadio() {
    const radios = this.getAllRadios();
    radios.forEach(radio => (radio.checked = radio.value === this.value));
    this.formControlController.setValidity(this.validity.valid);
  }

  @watch('size', { waitUntilFirstUpdate: true })
  handleSizeChange() {
    this.syncRadios();
  }

  @watch('value')
  handleValueChange() {
    if (this.hasUpdated) {
      this.updateCheckedRadio();
    }
  }

  /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
  checkValidity() {
    const isRequiredAndEmpty = this.required && !this.value;
    const hasCustomValidityMessage = this.customValidityMessage !== '';

    if (isRequiredAndEmpty || hasCustomValidityMessage) {
      this.formControlController.emitInvalidEvent();
      return false;
    }

    return true;
  }

  /** Gets the associated form, if one exists. */
  getForm(): HTMLFormElement | null {
    return this.formControlController.getForm();
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity(): boolean {
    const isValid = this.validity.valid;

    this.errorMessage = this.customValidityMessage || isValid ? '' : this.validationInput.validationMessage;
    this.formControlController.setValidity(isValid);
    this.validationInput.hidden = true;
    clearTimeout(this.validationTimeout);

    if (!isValid) {
      // Show the browser's constraint validation message
      this.validationInput.hidden = false;
      this.validationInput.reportValidity();
      this.validationTimeout = setTimeout(() => (this.validationInput.hidden = true), 10000) as unknown as number;
    }

    return isValid;
  }

  /** Sets a custom validation message. Pass an empty string to restore validity. */
  setCustomValidity(message = '') {
    this.customValidityMessage = message;
    this.errorMessage = message;
    this.validationInput.setCustomValidity(message);
    this.formControlController.updateValidity();
  }

  /** Sets focus on the radio-group. */
  public focus(options?: FocusOptions) {
    const radios = this.getAllRadios();
    const checked = radios.find(radio => radio.checked);
    const firstEnabledRadio = radios.find(radio => !radio.disabled);
    const radioToFocus = checked || firstEnabledRadio;

    // Call focus for the checked radio
    // If no radio is checked, focus the first one that is not disabled
    if (radioToFocus) {
      radioToFocus.focus(options);
    }
  }

  render() {
    const hasLabelSlot = this.hasSlotController.test('label');
    const hasHelpTextSlot = this.hasSlotController.test('help-text');
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
    const defaultSlot = html`
      <slot @slotchange=${this.syncRadios} @click=${this.handleRadioClick} @keydown=${this.handleKeyDown}></slot>
    `;

    return html`
      <fieldset
        part="form-control"
        class=${classMap({
          'form-control': true,
          'form-control--small': this.size === 'small',
          'form-control--medium': this.size === 'medium',
          'form-control--large': this.size === 'large',
          'form-control--radio-group': true,
          'form-control--has-label': hasLabel,
          'form-control--has-help-text': hasHelpText
        })}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="help-text"
        aria-errormessage="error-message"
      >
        <label
          part="form-control-label"
          id="label"
          class="form-control__label"
          aria-hidden=${hasLabel ? 'false' : 'true'}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div class="visually-hidden">
            <div id="error-message" aria-live="assertive">${this.errorMessage}</div>
            <label class="radio-group__validation">
              <input
                type="text"
                class="radio-group__validation-input"
                ?required=${this.required}
                tabindex="-1"
                hidden
                @invalid=${this.handleInvalid}
              />
            </label>
          </div>

          ${this.hasButtonGroup
            ? html`
                <sl-button-group part="button-group" exportparts="base:button-group__base" role="presentation">
                  ${defaultSlot}
                </sl-button-group>
              `
            : defaultSlot}
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${hasHelpText ? 'false' : 'true'}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </fieldset>
    `;
  }
}
