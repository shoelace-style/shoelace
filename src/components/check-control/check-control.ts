import { LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { emit } from '../../internal/event';
import { watch } from '../../internal/watch';

/**
 * @since 2.0
 * @status draft
 *
 * @slot - The checkcontrol's label.
 *
 * @event sl-blur - Emitted when the control loses focus.
 * @event sl-change - Emitted when the control's checked state changes.
 * @event sl-focus - Emitted when the control gains focus.
 *
 * @csspart base - The component's base wrapper.
 * @csspart control - The checkbox control.
 * @csspart label - The checkbox label.
 */

export class SlCheckControl extends LitElement {

  @state() private hasFocus = false;

  /** The checkbox's name attribute. */
  @property() name: string;

  /** The checkbox's value attribute. */
  @property() value: string;

  /** Disables the checkbox. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Makes the checkbox a required field. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Draws the checkbox in a checked state. */
  @property({ type: Boolean, reflect: true }) checked = false;

  /** Draws the checkbox in an indeterminate state. */
  @property({ type: Boolean, reflect: true }) indeterminate = false;

  /** This will be true when the control is in an invalid state. Validity is determined by the `required` prop. */
  @property({ type: Boolean, reflect: true }) invalid = false;

  firstUpdated() {
    this.invalid = !this.input.checkValidity();
  }

  /** Simulates a click on the checkbox. */
  click() {
    this.input.click();
  }

  /** Sets focus on the checkbox. */
  focus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the checkbox. */
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

  @watch('disabled')
  handleDisabledChange() {
    // Disabled form controls are always valid, so we need to recheck validity when the state changes
    if (this.input) {
      this.input.disabled = this.disabled;
      this.invalid = !this.input.checkValidity();
    }
  }
}
