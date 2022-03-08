import type SlButton from '~/components/button/button';
import './formdata-event-polyfill';
import type { ReactiveController, ReactiveControllerHost } from 'lit';

export interface FormSubmitControllerOptions {
  /** A function that returns the form containing the form control. */
  form: (input: unknown) => HTMLFormElement | null;
  /** A function that returns the form control's name, which will be submitted with the form data. */
  name: (input: unknown) => string;
  /** A function that returns the form control's current value. */
  value: (input: unknown) => unknown | unknown[];
  /** A function that returns the form control's current disabled state. If disabled, the value won't be submitted. */
  disabled: (input: unknown) => boolean;
  /**
   * A function that maps to the form control's reportValidity() function. When the control is invalid, this will
   * prevent submission and trigger the browser's constraint violation warning.
   */
  reportValidity: (input: unknown) => boolean;
}

export class FormSubmitController implements ReactiveController {
  host?: ReactiveControllerHost & Element;
  form?: HTMLFormElement | null;
  options: FormSubmitControllerOptions;

  constructor(host: ReactiveControllerHost & Element, options?: Partial<FormSubmitControllerOptions>) {
    (this.host = host).addController(this);
    this.options = {
      form: (input: HTMLInputElement) => input.closest('form'),
      name: (input: HTMLInputElement) => input.name,
      value: (input: HTMLInputElement) => input.value,
      disabled: (input: HTMLInputElement) => input.disabled,
      reportValidity: (input: HTMLInputElement) => {
        return typeof input.reportValidity === 'function' ? input.reportValidity() : true;
      },
      ...options
    };
    this.handleFormData = this.handleFormData.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  hostConnected() {
    this.form = this.options.form(this.host);

    if (this.form) {
      this.form.addEventListener('formdata', this.handleFormData);
      this.form.addEventListener('submit', this.handleFormSubmit);
    }
  }

  hostDisconnected() {
    if (this.form) {
      this.form.removeEventListener('formdata', this.handleFormData);
      this.form.removeEventListener('submit', this.handleFormSubmit);
      this.form = undefined;
    }
  }

  handleFormData(event: FormDataEvent) {
    const disabled = this.options.disabled(this.host);
    const name = this.options.name(this.host);
    const value = this.options.value(this.host);

    if (!disabled && typeof name === 'string' && typeof value !== 'undefined') {
      if (Array.isArray(value)) {
        (value as unknown[]).forEach(val => {
          event.formData.append(name, (val as string | number | boolean).toString());
        });
      } else {
        event.formData.append(name, (value as string | number | boolean).toString());
      }
    }
  }

  handleFormSubmit(event: Event) {
    const disabled = this.options.disabled(this.host);
    const reportValidity = this.options.reportValidity;

    if (this.form && !this.form.noValidate && !disabled && !reportValidity(this.host)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  submit(submitter?: HTMLInputElement | SlButton) {
    // Calling form.submit() bypasses the submit event and constraint validation. To prevent this, we can inject a
    // native submit button into the form, "click" it, then remove it to simulate a standard form submission.
    if (this.form) {
      const button = document.createElement('button');
      button.type = 'submit';
      button.style.position = 'absolute';
      button.style.width = '0';
      button.style.height = '0';
      button.style.clip = 'rect(0 0 0 0)';
      button.style.clipPath = 'inset(50%)';
      button.style.overflow = 'hidden';
      button.style.whiteSpace = 'nowrap';

      // Pass form override properties through to the temporary button
      if (submitter) {
        button.formAction = submitter.formAction;
        button.formMethod = submitter.formMethod;
        button.formNoValidate = submitter.formNoValidate;
        button.formTarget = submitter.formTarget;
      }

      this.form.append(button);
      button.click();
      button.remove();
    }
  }
}
