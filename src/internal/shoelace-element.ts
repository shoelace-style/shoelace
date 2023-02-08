import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

type SlEventInit<T> = T extends keyof GlobalEventHandlersEventMap
  ? GlobalEventHandlersEventMap[T] extends CustomEvent
    ? CustomEventInit<GlobalEventHandlersEventMap[T]['detail']>
    : CustomEventInit
  : CustomEventInit;

export default class ShoelaceElement extends LitElement {
  // Make localization attributes reactive
  @property() dir: string;
  @property() lang: string;

  /** Emits a custom event with more convenient defaults. */
  emit<T extends string>(name: T, options?: SlEventInit<T>) {
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

  // Validation methods
  checkValidity: () => boolean;
  reportValidity: () => boolean;
  setCustomValidity: (message: string) => void;
}
