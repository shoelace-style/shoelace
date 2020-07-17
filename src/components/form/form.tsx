import { Component, Event, EventEmitter, Method, h } from '@stencil/core';

interface FormControl {
  tag: string;
  serialize: (el: HTMLElement, formData: FormData) => void;
  click?: (event: MouseEvent) => any;
  keyDown?: (event: KeyboardEvent) => any;
}

/**
 * @since 2.0
 * @status experimental
 *
 * @slot - The form's content.
 *
 * @part base - The component's base wrapper.
 */

@Component({
  tag: 'sl-form',
  styleUrl: 'form.scss',
  shadow: true
})
export class Form {
  form: HTMLElement;
  formControls: FormControl[];

  constructor() {
    this.formControls = [
      {
        tag: 'button',
        serialize: (el: HTMLButtonElement, formData) =>
          el.name && !el.disabled ? formData.append(el.name, el.value) : null,
        click: event => {
          const target = event.target as HTMLButtonElement;
          if (target.type === 'submit') {
            this.submit();
          }
        }
      },
      {
        tag: 'input',
        serialize: (el: HTMLInputElement, formData) => {
          if (!el.name || el.disabled) {
            return;
          }

          if ((el.type === 'checkbox' || el.type === 'radio') && !el.checked) {
            return;
          }

          if (el.type === 'file') {
            [...el.files].map(file => formData.append(el.name, file));
            return;
          }

          formData.append(el.name, el.value);
        },
        click: event => {
          const target = event.target as HTMLInputElement;
          if (target.type === 'submit') {
            this.submit();
          }
        },
        keyDown: event => {
          const target = event.target as HTMLInputElement;
          if (event.key === 'Enter' && !['checkbox', 'file', 'radio'].includes(target.type)) {
            this.submit();
          }
        }
      },
      {
        tag: 'select',
        serialize: (el: HTMLSelectElement, formData) => {
          if (el.name && !el.disabled) {
            if (el.multiple) {
              const selectedOptions = [...el.querySelectorAll('option:checked')];
              if (selectedOptions.length) {
                selectedOptions.map((option: HTMLOptionElement) => formData.append(el.name, option.value));
              } else {
                formData.append(el.name, '');
              }
            } else {
              formData.append(el.name, el.value);
            }
          }
        }
      },
      {
        tag: 'sl-button',
        serialize: (el: HTMLSlButtonElement, formData) =>
          el.name && !el.disabled ? formData.append(el.name, el.value) : null,
        click: event => {
          const target = event.target as HTMLSlButtonElement;
          if (target.submit) {
            this.submit();
          }
        }
      },
      {
        tag: 'sl-checkbox',
        serialize: (el: HTMLSlCheckboxElement, formData) =>
          el.name && el.checked && !el.disabled ? formData.append(el.name, el.value) : null
      },
      {
        tag: 'sl-input',
        serialize: (el: HTMLSlInputElement, formData) =>
          el.name && !el.disabled ? formData.append(el.name, el.value) : null,
        keyDown: event => {
          if (event.key === 'Enter') {
            this.submit();
          }
        }
      },
      {
        tag: 'sl-radio',
        serialize: (el: HTMLSlRadioElement, formData) =>
          el.name && el.checked && !el.disabled ? formData.append(el.name, el.value) : null
      },
      {
        tag: 'sl-range',
        serialize: (el: HTMLSlRangeElement, formData) => {
          if (el.name && !el.disabled) {
            formData.append(el.name, el.value + '');
          }
        }
      },
      {
        tag: 'sl-select',
        serialize: (el: HTMLSlSelectElement, formData) => {
          if (el.name && !el.disabled) {
            if (el.multiple) {
              const selectedOptions = [...el.value];
              if (selectedOptions.length) {
                selectedOptions.map(value => formData.append(el.name, value));
              } else {
                formData.append(el.name, '');
              }
            } else {
              formData.append(el.name, el.value + '');
            }
          }
        }
      },
      {
        tag: 'sl-switch',
        serialize: (el: HTMLSlSwitchElement, formData) =>
          el.name && el.checked && !el.disabled ? formData.append(el.name, el.value) : null
      },
      {
        tag: 'sl-textarea',
        serialize: (el: HTMLSlTextareaElement, formData) =>
          el.name && !el.disabled ? formData.append(el.name, el.value) : null
      },
      {
        tag: 'textarea',
        serialize: (el: HTMLTextAreaElement, formData) =>
          el.name && !el.disabled ? formData.append(el.name, el.value) : null
      }
    ];

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  /** Emitted when the form is submitted. */
  @Event() slSubmit: EventEmitter;

  /** Serializes all form controls elements and returns a `FormData` object. */
  @Method()
  async getFormData() {
    const formData = new FormData();
    const formControls = await this.getFormControls();

    formControls.map(el => this.serializeElement(el, formData));

    return formData;
  }

  /** Gets all form control elements (native and custom). */
  @Method()
  async getFormControls() {
    const slot = this.form.querySelector('slot');
    const tags = this.formControls.map(control => control.tag);
    return slot
      .assignedElements({ flatten: true })
      .filter(el => tags.includes(el.tagName.toLowerCase())) as HTMLElement[];
  }

  /** Submits the form. */
  @Method()
  async submit() {
    const formData = await this.getFormData();
    const formControls = await this.getFormControls();

    this.slSubmit.emit({ formData, formControls });
  }

  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const tag = target.tagName.toLowerCase();

    for (const formControl of this.formControls) {
      if (formControl.tag === tag && formControl.click) {
        formControl.click(event);
      }
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    const tag = target.tagName.toLowerCase();

    for (const formControl of this.formControls) {
      if (formControl.tag === tag && formControl.keyDown) {
        formControl.keyDown(event);
      }
    }
  }

  serializeElement(el: HTMLElement, formData: FormData) {
    const tag = el.tagName.toLowerCase();

    for (const formControl of this.formControls) {
      if (formControl.tag === tag) {
        return formControl.serialize(el, formData);
      }
    }

    return null;
  }

  render() {
    return (
      <div
        ref={el => (this.form = el)}
        part="base"
        class="form"
        role="form"
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
      >
        <slot />
      </div>
    );
  }
}
