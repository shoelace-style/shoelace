import { LitElement } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { emit } from '~/internal/event';
import { FormSubmitController } from '~/internal/form';
import { watch } from '~/internal/watch';

/**
 * The following events are emitted by the base class. When extending, these comments should be prepended to the
 * component so they show up in its documentation.
 *
 * @event sl-blur - Emitted when the control loses focus.
 * @event sl-change - Emitted when the control's checked state changes.
 * @event sl-focus - Emitted when the control gains focus.
 */
export default abstract class RadioBase extends LitElement {
  @query('input[type="radio"], button') input: HTMLInputElement;

  protected readonly formSubmitController = new FormSubmitController(this, {
    value: (control: RadioBase) => (control.checked ? control.value : undefined)
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
  reportValidity() {
    return this.input.reportValidity();
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
}
