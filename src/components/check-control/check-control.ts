import { LitElement } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { emit } from '../../internal/event';
import { watch } from '../../internal/watch';

/**
 * @since 2.0
 * @status draft
 *
 * @event sl-blur - Emitted when the control loses focus.
 * @event sl-change - Emitted when the control's checked state changes.
 * @event sl-focus - Emitted when the control gains focus.
 */

export class SlCheckControl extends LitElement {

  @query('input[type="checkbox"]') input: HTMLInputElement;

  @state() protected hasFocus = false;

  /** The check control's name attribute. */
  @property() name: string;

  /** The check control's value attribute. */
  @property() value: string;

  /** Disables the check control. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Makes the check control a required field. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Draws the check control in a checked state. */
  @property({ type: Boolean, reflect: true }) checked = false;

  /** This will be true when the control is in an invalid state. Validity is determined by the `required` prop. */
  @property({ type: Boolean, reflect: true }) invalid = false;

  firstUpdated() {
    this.invalid = !this.input.checkValidity();
  }

  handleClick() {
    this.checked = !this.checked;
    emit(this, 'sl-change');
  }

  /** Simulates a click on the check control. */
  click() {
    this.input.click();
  }

  /** Sets focus on the check control. */
  focus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the check control. */
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

  handleFocus() {
    this.hasFocus = true;
    emit(this, 'sl-focus');
  }

  handleBlur() {
    this.hasFocus = false;
    emit(this, 'sl-blur');
  }

  @watch('disabled')
  handleDisabledChange() {
    // Disabled form controls are always valid, so we need to recheck validity when the state changes
    if (this.input) {
      this.input.disabled = this.disabled;
      this.invalid = !this.input.checkValidity();
    }
  }
}
