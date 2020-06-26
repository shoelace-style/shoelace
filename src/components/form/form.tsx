import { Component, Method, Listen, h } from '@stencil/core';

interface FormSerializer {
  elements: string[];
  serialize: (el: HTMLFormElement | any) => null | { name: string; value: any };
}

/**
 * @since 1.0.0
 * @status ready
 */

@Component({
  tag: 'sl-form',
  styleUrl: 'form.scss',
  shadow: true
})
export class Form {
  form: HTMLElement;

  constructor() {
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /** Serializes form controls and returns all data as a FormData object. */
  @Method()
  async getFormData() {
    const slot = this.form.querySelector('slot');
    const formData = new FormData();
    const assignedElements = slot.assignedElements({ flatten: true });

    assignedElements.map((el: HTMLElement) => {
      const data = this.serializeElement(el);
      if (data) {
        formData.append(data.name, data.value);
      }
    });

    return formData;
  }

  @Listen('slSubmit')
  handleSubmit(event: Event) {
    // console.log('handleSubmit', event);
  }

  serializeElement(el: HTMLElement) {
    const tagName = el.tagName.toLowerCase();
    const serializers: FormSerializer[] = [
      {
        elements: ['sl-button', 'sl-input', 'sl-range', 'sl-select', 'sl-textarea'],
        serialize: el => (!el.name || el.disabled ? null : { name: el.name, value: el.value })
      },
      {
        elements: ['sl-checkbox', 'sl-radio', 'sl-switch'],
        serialize: el => (!el.name || !el.checked || el.disabled ? null : { name: el.name, value: el.value })
      },
      {
        elements: ['button', 'input', 'select', 'textarea'],
        serialize: el => {
          if (!el.name || el.disabled) {
            return null;
          }

          if ((el.type === 'checkbox' || el.type === 'radio') && !el.checked) {
            return null;
          }

          return { name: el.name, value: el.value };
        }
      }
    ];

    for (const serializer of serializers) {
      if (serializer.elements.includes(tagName)) {
        return serializer.serialize(el);
      }
    }

    return null;
  }

  render() {
    return (
      <form ref={el => (this.form = el)} class="form" onSubmit={this.handleSubmit}>
        <slot />
      </form>
    );
  }
}
