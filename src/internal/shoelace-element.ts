import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export default class ShoelaceElement extends LitElement {
  // Make localization attributes reactive
  @property() dir: string;
  @property() lang: string;

  /** Emits a custom event with more convenient defaults. */
  emit(name: string, options?: CustomEventInit) {
    const event = new CustomEvent(name, {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: {},
      ...options
    });

    this.dispatchEvent(event);

    return event;
  }
}

export interface ShoelaceFormControl extends ShoelaceElement {
  // Standard form attributes
  name: string;
  value: unknown;
  disabled?: boolean;
  defaultValue?: unknown;
  defaultChecked?: boolean;
  form?: string;

  // Standard validation attributes
  pattern?: string;
  min?: number | Date;
  max?: number | Date;
  step?: number | 'any';
  required?: boolean;
  minlength?: number;
  maxlength?: number;

  // Validation properties
  readonly validity: ValidityState;
  readonly validationMessage: string;

  // Validation methods
  checkValidity: () => boolean;
  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity: () => boolean;
  setCustomValidity: (message: string) => void;
}
