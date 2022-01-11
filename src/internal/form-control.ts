import { html, ReactiveController, ReactiveControllerHost, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import './formdata-event-polyfill';

export interface FormSubmitControllerOptions {
  /** A function that returns the form containing the form control. */
  form: (input: unknown) => HTMLFormElement;
  /** A function that returns the form control's name, which will be submitted with the form data. */
  name: (input: unknown) => string;
  /** A function that returns the form control's current value. */
  value: (input: unknown) => any;
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
  form?: HTMLFormElement;
  options?: FormSubmitControllerOptions;

  constructor(host: ReactiveControllerHost & Element, options?: FormSubmitControllerOptions) {
    (this.host = host).addController(this);
    this.options = Object.assign(
      {
        form: (input: HTMLInputElement) => input.closest('form'),
        name: (input: HTMLInputElement) => input.name,
        value: (input: HTMLInputElement) => input.value,
        disabled: (input: HTMLInputElement) => input.disabled,
        reportValidity: (input: HTMLInputElement) => {
          return typeof input.reportValidity === 'function' ? input.reportValidity() : true;
        }
      },
      options
    );
    this.handleFormData = this.handleFormData.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  hostConnected() {
    this.form = this.options?.form(this.host);

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
    const disabled = this.options?.disabled(this.host);
    const name = this.options?.name(this.host);
    const value = this.options?.value(this.host);

    if (!disabled && name && value !== undefined) {
      if (Array.isArray(value)) {
        value.map(val => event.formData.append(name, val));
      } else {
        event.formData.append(name, value);
      }
    }
  }

  handleFormSubmit(event: Event) {
    const form = this.form;
    const disabled = this.options?.disabled(this.host);
    const reportValidity = this.options?.reportValidity;

    if (form && !form.noValidate && !disabled && reportValidity && !reportValidity(this.host)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  submit() {
    // Calling form.submit() seems to bypass the submit event and constraint validation. Instead, we can inject a
    // native submit button into the form, click it, then remove it to simulate a standard form submission.
    const button = document.createElement('button');
    if (this.form) {
      button.type = 'submit';
      button.style.position = 'absolute';
      button.style.width = '0';
      button.style.height = '0';
      button.style.clip = 'rect(0 0 0 0)';
      button.style.clipPath = 'inset(50%)';
      button.style.overflow = 'hidden';
      button.style.whiteSpace = 'nowrap';
      this.form.append(button);
      button.click();
      button.remove();
    }
  }
}

export const renderFormControl = (
  props: {
    /** The input id, used to map the input to the label */
    inputId: string;

    /** The size of the form control */
    size: 'small' | 'medium' | 'large';

    /** The label id, used to map the label to the input */
    labelId?: string;

    /** The label text (if the label slot isn't used) */
    label?: string;

    /** Whether or not a label slot has been provided. */
    hasLabelSlot?: boolean;

    /** The help text id, used to map the input to the help text */
    helpTextId?: string;

    /** The help text (if the help-text slot isn't used) */
    helpText?: string;

    /** Whether or not a help text slot has been provided. */
    hasHelpTextSlot?: boolean;

    /** A function that gets called when the label is clicked. */
    onLabelClick?: (event: MouseEvent) => void;
  },
  input: TemplateResult
) => {
  const hasLabel = props.label ? true : !!props.hasLabelSlot;
  const hasHelpText = props.helpText ? true : !!props.hasHelpTextSlot;

  return html`
    <div
      part="form-control"
      class=${classMap({
        'form-control': true,
        'form-control--small': props.size === 'small',
        'form-control--medium': props.size === 'medium',
        'form-control--large': props.size === 'large',
        'form-control--has-label': hasLabel,
        'form-control--has-help-text': hasHelpText
      })}
    >
      <label
        part="label"
        id=${ifDefined(props.labelId)}
        class="form-control__label"
        for=${props.inputId}
        aria-hidden=${hasLabel ? 'false' : 'true'}
        @click=${(event: MouseEvent) => (props.onLabelClick ? props.onLabelClick(event) : null)}
      >
        <slot name="label">${props.label}</slot>
      </label>

      <div class="form-control__input">${html`${input}`}</div>

      <div
        part="help-text"
        id=${ifDefined(props.helpTextId)}
        class="form-control__help-text"
        aria-hidden=${hasHelpText ? 'false' : 'true'}
      >
        <slot name="help-text">${props.helpText}</slot>
      </div>
    </div>
  `;
};

export function getLabelledBy(props: {
  /** The label id, used to map the label to the input */
  labelId: string;

  /** The label text (if the label slot isn't used) */
  label: string;

  /** Whether or not a label slot has been provided. */
  hasLabelSlot: boolean;

  /** The help text id, used to map the input to the help text */
  helpTextId: string;

  /** The help text (if the help-text slot isn't used) */
  helpText: string;

  /** Whether or not a help text slot has been provided. */
  hasHelpTextSlot: boolean;
}) {
  const labelledBy = [
    props.label || props.hasLabelSlot ? props.labelId : '',
    props.helpText || props.hasHelpTextSlot ? props.helpTextId : ''
  ].filter(val => val);

  return labelledBy.join(' ') || undefined;
}
