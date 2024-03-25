import type { ReactiveController, ReactiveControllerHost } from 'lit';
import type { ShoelaceFormControl } from '../internal/shoelace-element.js';
import type SlButton from '../components/button/button.js';

//
// We store a WeakMap of forms + controls so we can keep references to all Shoelace controls within a given form. As
// elements connect and disconnect to/from the DOM, their containing form is used as the key and the form control is
// added and removed from the form's set, respectively.
//
export const formCollections: WeakMap<HTMLFormElement, Set<ShoelaceFormControl>> = new WeakMap();

//
// We store a WeakMap of reportValidity() overloads so we can override it when form controls connect to the DOM and
// restore the original behavior when they disconnect.
//
const reportValidityOverloads: WeakMap<HTMLFormElement, () => boolean> = new WeakMap();
const checkValidityOverloads: WeakMap<HTMLFormElement, () => boolean> = new WeakMap();

//
// We store a Set of controls that users have interacted with. This allows us to determine the interaction state
// without littering the DOM with additional data attributes.
//
const userInteractedControls: WeakSet<ShoelaceFormControl> = new WeakSet();

//
// We store a WeakMap of interactions for each form control so we can track when all conditions are met for validation.
//
const interactions = new WeakMap<ShoelaceFormControl, string[]>();

export interface FormControlControllerOptions {
  /** A function that returns the form containing the form control. */
  form: (input: ShoelaceFormControl) => HTMLFormElement | null;
  /** A function that returns the form control's name, which will be submitted with the form data. */
  name: (input: ShoelaceFormControl) => string;
  /** A function that returns the form control's current value. */
  value: (input: ShoelaceFormControl) => unknown | unknown[];
  /** A function that returns the form control's default value. */
  defaultValue: (input: ShoelaceFormControl) => unknown | unknown[];
  /** A function that returns the form control's current disabled state. If disabled, the value won't be submitted. */
  disabled: (input: ShoelaceFormControl) => boolean;
  /**
   * A function that maps to the form control's reportValidity() function. When the control is invalid, this will
   * prevent submission and trigger the browser's constraint violation warning.
   */
  reportValidity: (input: ShoelaceFormControl) => boolean;

  /**
   * A function that maps to the form control's `checkValidity()` function. When the control is invalid, this will return false.
   *   this is helpful is you want to check validation without triggering the native browser constraint violation warning.
   */
  checkValidity: (input: ShoelaceFormControl) => boolean;
  /** A function that sets the form control's value */
  setValue: (input: ShoelaceFormControl, value: unknown) => void;
  /**
   * An array of event names to listen to. When all events in the list are emitted, the control will receive validity
   * states such as user-valid and user-invalid.user interacted validity states. */
  assumeInteractionOn: string[];
}

/** A reactive controller to allow form controls to participate in form submission, validation, etc. */
export class FormControlController implements ReactiveController {
  host: ShoelaceFormControl & ReactiveControllerHost;
  form?: HTMLFormElement | null;
  options: FormControlControllerOptions;

  constructor(host: ReactiveControllerHost & ShoelaceFormControl, options?: Partial<FormControlControllerOptions>) {
    (this.host = host).addController(this);
    this.options = {
      form: input => {
        // If there's a form attribute, use it to find the target form by id
        // Controls may not always reflect the 'form' property. For example, `<sl-button>` doesn't reflect.
        const formId = input.form;

        if (formId) {
          const root = input.getRootNode() as Document | ShadowRoot | HTMLElement;
          const form = root.querySelector(`#${formId}`);

          if (form) {
            return form as HTMLFormElement;
          }
        }

        return input.closest('form');
      },
      name: input => input.name,
      value: input => input.value,
      defaultValue: input => input.defaultValue,
      disabled: input => input.disabled ?? false,
      reportValidity: input => (typeof input.reportValidity === 'function' ? input.reportValidity() : true),
      checkValidity: input => (typeof input.checkValidity === 'function' ? input.checkValidity() : true),
      setValue: (input, value: string) => (input.value = value),
      assumeInteractionOn: ['sl-input'],
      ...options
    };
  }

  hostConnected() {
    const form = this.options.form(this.host);

    if (form) {
      this.attachForm(form);
    }

    // Listen for interactions
    interactions.set(this.host, []);
    this.options.assumeInteractionOn.forEach(event => {
      this.host.addEventListener(event, this.handleInteraction);
    });
  }

  hostDisconnected() {
    this.detachForm();

    // Clean up interactions
    interactions.delete(this.host);
    this.options.assumeInteractionOn.forEach(event => {
      this.host.removeEventListener(event, this.handleInteraction);
    });
  }

  hostUpdated() {
    const form = this.options.form(this.host);

    // Detach if the form no longer exists
    if (!form) {
      this.detachForm();
    }

    // If the form has changed, reattach it
    if (form && this.form !== form) {
      this.detachForm();
      this.attachForm(form);
    }

    if (this.host.hasUpdated) {
      this.setValidity(this.host.validity.valid);
    }
  }

  private attachForm(form?: HTMLFormElement) {
    if (form) {
      this.form = form;

      // Add this element to the form's collection
      if (formCollections.has(this.form)) {
        formCollections.get(this.form)!.add(this.host);
      } else {
        formCollections.set(this.form, new Set<ShoelaceFormControl>([this.host]));
      }

      this.form.addEventListener('formdata', this.handleFormData);
      this.form.addEventListener('submit', this.handleFormSubmit);
      this.form.addEventListener('reset', this.handleFormReset);

      // Overload the form's reportValidity() method so it looks at Shoelace form controls
      if (!reportValidityOverloads.has(this.form)) {
        reportValidityOverloads.set(this.form, this.form.reportValidity);
        this.form.reportValidity = () => this.reportFormValidity();
      }

      // Overload the form's checkValidity() method so it looks at Shoelace form controls
      if (!checkValidityOverloads.has(this.form)) {
        checkValidityOverloads.set(this.form, this.form.checkValidity);
        this.form.checkValidity = () => this.checkFormValidity();
      }
    } else {
      this.form = undefined;
    }
  }

  private detachForm() {
    if (!this.form) return;

    const formCollection = formCollections.get(this.form);

    if (!formCollection) {
      return;
    }

    // Remove this host from the form's collection
    formCollection.delete(this.host);

    // Check to make sure there's no other form controls in the collection. If we do this
    // without checking if any other controls are still in the collection, then we will wipe out the
    // validity checks for all other elements.
    // see: https://github.com/shoelace-style/shoelace/issues/1703
    if (formCollection.size <= 0) {
      this.form.removeEventListener('formdata', this.handleFormData);
      this.form.removeEventListener('submit', this.handleFormSubmit);
      this.form.removeEventListener('reset', this.handleFormReset);

      // Remove the overload and restore the original method
      if (reportValidityOverloads.has(this.form)) {
        this.form.reportValidity = reportValidityOverloads.get(this.form)!;
        reportValidityOverloads.delete(this.form);
      }

      if (checkValidityOverloads.has(this.form)) {
        this.form.checkValidity = checkValidityOverloads.get(this.form)!;
        checkValidityOverloads.delete(this.form);
      }

      // So it looks weird here to not always set the form to undefined. But I _think_ if we unattach this.form here,
      // we end up in this fun spot where future validity checks don't have a reference to the form validity handler.
      // First form element in sets the validity handler. So we can't clean up `this.form` until there are no other form elements in the form.
      this.form = undefined;
    }
  }

  private handleFormData = (event: FormDataEvent) => {
    const disabled = this.options.disabled(this.host);
    const name = this.options.name(this.host);
    const value = this.options.value(this.host);

    // For buttons, we only submit the value if they were the submitter. This is currently done in doAction() by
    // injecting the name/value on a temporary button, so we can just skip them here.
    const isButton = this.host.tagName.toLowerCase() === 'sl-button';

    if (
      this.host.isConnected &&
      !disabled &&
      !isButton &&
      typeof name === 'string' &&
      name.length > 0 &&
      typeof value !== 'undefined'
    ) {
      if (Array.isArray(value)) {
        (value as unknown[]).forEach(val => {
          event.formData.append(name, (val as string | number | boolean).toString());
        });
      } else {
        event.formData.append(name, (value as string | number | boolean).toString());
      }
    }
  };

  private handleFormSubmit = (event: Event) => {
    const disabled = this.options.disabled(this.host);
    const reportValidity = this.options.reportValidity;

    // Update the interacted state for all controls when the form is submitted
    if (this.form && !this.form.noValidate) {
      formCollections.get(this.form)?.forEach(control => {
        this.setUserInteracted(control, true);
      });
    }

    if (this.form && !this.form.noValidate && !disabled && !reportValidity(this.host)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };

  private handleFormReset = () => {
    this.options.setValue(this.host, this.options.defaultValue(this.host));
    this.setUserInteracted(this.host, false);
    interactions.set(this.host, []);
  };

  private handleInteraction = (event: Event) => {
    const emittedEvents = interactions.get(this.host)!;

    if (!emittedEvents.includes(event.type)) {
      emittedEvents.push(event.type);
    }

    // Mark it as user-interacted as soon as all associated events have been emitted
    if (emittedEvents.length === this.options.assumeInteractionOn.length) {
      this.setUserInteracted(this.host, true);
    }
  };

  private checkFormValidity = () => {
    //
    // This is very similar to the `reportFormValidity` function, but it does not trigger native constraint validation
    // Allow the user to simply check if the form is valid and handling validity in their own way.
    //
    // We preserve the original method in a WeakMap, but we don't call it from the overload because that would trigger
    // validations in an unexpected order. When the element disconnects, we revert to the original behavior. This won't
    // be necessary once we can use ElementInternals.
    //
    // Note that we're also honoring the form's novalidate attribute.
    //
    if (this.form && !this.form.noValidate) {
      // This seems sloppy, but checking all elements will cover native inputs, Shoelace inputs, and other custom
      // elements that support the constraint validation API.
      const elements = this.form.querySelectorAll<HTMLInputElement>('*');

      for (const element of elements) {
        if (typeof element.checkValidity === 'function') {
          if (!element.checkValidity()) {
            return false;
          }
        }
      }
    }

    return true;
  };

  private reportFormValidity = () => {
    //
    // Shoelace form controls work hard to act like regular form controls. They support the Constraint Validation API
    // and its associated methods such as setCustomValidity() and reportValidity(). However, the HTMLFormElement also
    // has a reportValidity() method that will trigger validation on all child controls. Since we're not yet using
    // ElementInternals, we need to overload this method so it looks for any element with the reportValidity() method.
    //
    // We preserve the original method in a WeakMap, but we don't call it from the overload because that would trigger
    // validations in an unexpected order. When the element disconnects, we revert to the original behavior. This won't
    // be necessary once we can use ElementInternals.
    //
    // Note that we're also honoring the form's novalidate attribute.
    //
    if (this.form && !this.form.noValidate) {
      // This seems sloppy, but checking all elements will cover native inputs, Shoelace inputs, and other custom
      // elements that support the constraint validation API.
      const elements = this.form.querySelectorAll<HTMLInputElement>('*');

      for (const element of elements) {
        if (typeof element.reportValidity === 'function') {
          if (!element.reportValidity()) {
            return false;
          }
        }
      }
    }

    return true;
  };

  private setUserInteracted(el: ShoelaceFormControl, hasInteracted: boolean) {
    if (hasInteracted) {
      userInteractedControls.add(el);
    } else {
      userInteractedControls.delete(el);
    }

    el.requestUpdate();
  }

  private doAction(type: 'submit' | 'reset', submitter?: HTMLInputElement | SlButton) {
    if (this.form) {
      const button = document.createElement('button');
      button.type = type;
      button.style.position = 'absolute';
      button.style.width = '0';
      button.style.height = '0';
      button.style.clipPath = 'inset(50%)';
      button.style.overflow = 'hidden';
      button.style.whiteSpace = 'nowrap';

      // Pass name, value, and form attributes through to the temporary button
      if (submitter) {
        button.name = submitter.name;
        button.value = submitter.value;

        ['formaction', 'formenctype', 'formmethod', 'formnovalidate', 'formtarget'].forEach(attr => {
          if (submitter.hasAttribute(attr)) {
            button.setAttribute(attr, submitter.getAttribute(attr)!);
          }
        });
      }

      this.form.append(button);
      button.click();
      button.remove();
    }
  }

  /** Returns the associated `<form>` element, if one exists. */
  getForm() {
    return this.form ?? null;
  }

  /** Resets the form, restoring all the control to their default value */
  reset(submitter?: HTMLInputElement | SlButton) {
    this.doAction('reset', submitter);
  }

  /** Submits the form, triggering validation and form data injection. */
  submit(submitter?: HTMLInputElement | SlButton) {
    // Calling form.submit() bypasses the submit event and constraint validation. To prevent this, we can inject a
    // native submit button into the form, "click" it, then remove it to simulate a standard form submission.
    this.doAction('submit', submitter);
  }

  /**
   * Synchronously sets the form control's validity. Call this when you know the future validity but need to update
   * the host element immediately, i.e. before Lit updates the component in the next update.
   */
  setValidity(isValid: boolean) {
    const host = this.host;
    const hasInteracted = Boolean(userInteractedControls.has(host));
    const required = Boolean(host.required);

    //
    // We're mapping the following "states" to data attributes. In the future, we can use ElementInternals.states to
    // create a similar mapping, but instead of [data-invalid] it will look like :--invalid.
    //
    // See this RFC for more details: https://github.com/shoelace-style/shoelace/issues/1011
    //
    host.toggleAttribute('data-required', required);
    host.toggleAttribute('data-optional', !required);
    host.toggleAttribute('data-invalid', !isValid);
    host.toggleAttribute('data-valid', isValid);
    host.toggleAttribute('data-user-invalid', !isValid && hasInteracted);
    host.toggleAttribute('data-user-valid', isValid && hasInteracted);
  }

  /**
   * Updates the form control's validity based on the current value of `host.validity.valid`. Call this when anything
   * that affects constraint validation changes so the component receives the correct validity states.
   */
  updateValidity() {
    const host = this.host;
    this.setValidity(host.validity.valid);
  }

  /**
   * Dispatches a non-bubbling, cancelable custom event of type `sl-invalid`.
   * If the `sl-invalid` event will be cancelled then the original `invalid`
   * event (which may have been passed as argument) will also be cancelled.
   * If no original `invalid` event has been passed then the `sl-invalid`
   * event will be cancelled before being dispatched.
   */
  emitInvalidEvent(originalInvalidEvent?: Event) {
    const slInvalidEvent = new CustomEvent<Record<PropertyKey, never>>('sl-invalid', {
      bubbles: false,
      composed: false,
      cancelable: true,
      detail: {}
    });

    if (!originalInvalidEvent) {
      slInvalidEvent.preventDefault();
    }

    if (!this.host.dispatchEvent(slInvalidEvent)) {
      originalInvalidEvent?.preventDefault();
    }
  }
}

/*
 * Predefined common validity states.
 * All of them are read-only.
 */

// A validity state object that represents `valid`
export const validValidityState: ValidityState = Object.freeze({
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valid: true,
  valueMissing: false
});

// A validity state object that represents `value missing`
export const valueMissingValidityState: ValidityState = Object.freeze({
  ...validValidityState,
  valid: false,
  valueMissing: true
});

// A validity state object that represents a custom error
export const customErrorValidityState: ValidityState = Object.freeze({
  ...validValidityState,
  valid: false,
  customError: true
});
