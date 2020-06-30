import { Component, Event, EventEmitter, Method, h } from '@stencil/core';

interface FormControlSerializer {
  elements: string[];
  serialize: (el: any) => any;
  click?: (event: MouseEvent) => any;
  keyDown?: (event: KeyboardEvent) => any;
}

/**
 * @since 1.0.0
 * @status ready
 */

//
// TODO:
//
// - restructure serializer logic to make more sense
// - serialize file inputs
//

@Component({
  tag: 'sl-form',
  styleUrl: 'form.scss',
  shadow: true
})
export class Form {
  form: HTMLElement;
  serializers: FormControlSerializer[];

  constructor() {
    this.serializers = [
      {
        elements: ['sl-button', 'sl-input', 'sl-range', 'sl-select', 'sl-textarea'],
        serialize: el => (!el.name || el.disabled ? null : { name: el.name, value: el.value }),
        click: (event: MouseEvent) => {
          const target = event.target as any;
          const tag = target.tagName.toLowerCase();

          if (tag === 'sl-button' && target.submit) {
            this.submit();
          }
        },
        keyDown: (event: KeyboardEvent) => {
          const target = event.target as any;
          const tag = target.tagName.toLowerCase();

          if (event.key === 'Enter' && tag === 'sl-input') {
            this.submit();
          }

          // Submit buttons should trigger a submit
          if (tag === 'sl-button' && target.submit && event.key === 'Enter') {
            this.submit();
          }
        }
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

          if (el.type === 'file') {
            console.log(el.files);
            return el.multiple ? el.files : el.files[0];
          }

          return { name: el.name, value: el.value };
        },
        click: (event: MouseEvent) => {
          const target = event.target as any;
          const tag = target.tagName.toLowerCase();

          if (tag === 'button' && target.type === 'submit' && target.submit) {
            this.submit();
          }
        },
        keyDown: (event: KeyboardEvent) => {
          const target = event.target as HTMLInputElement;
          const tag = target.tagName.toLowerCase();

          // Pressing enter in an input should submit
          if (event.key === 'Enter' && tag === 'input') {
            this.submit();
          }

          // Submit buttons should trigger a submit
          if (tag === 'button' && target.type === 'submit' && event.key === 'Enter') {
            this.submit();
          }
        }
      }
    ];

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  /** Emitted when the form is submitted. */
  @Event() slSubmit: EventEmitter;

  /** Serializes form controls and returns all data as a FormData object. */
  @Method()
  async getFormData() {
    const formData = new FormData();
    const assignedElements = this.getAssignedElements();

    assignedElements.map(el => {
      const data = this.serializeElement(el);
      if (data) {
        formData.append(data.name, data.value);
      }
    });

    return formData;
  }

  /** Submits the form. */
  @Method()
  async submit() {
    const formData = await this.getFormData();
    this.slSubmit.emit({ formData });
  }

  getAssignedElements() {
    const slot = this.form.querySelector('slot');
    return slot.assignedElements({ flatten: true }) as HTMLElement[];
  }

  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const tag = target.tagName.toLowerCase();

    for (const serializer of this.serializers) {
      if (serializer.elements.includes(tag) && serializer.keyDown) {
        serializer.click(event);
      }
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    const tag = target.tagName.toLowerCase();

    for (const serializer of this.serializers) {
      if (serializer.elements.includes(tag) && serializer.keyDown) {
        serializer.keyDown(event);
      }
    }
  }

  serializeElement(el: HTMLElement) {
    const tag = el.tagName.toLowerCase();

    for (const serializer of this.serializers) {
      if (serializer.elements.includes(tag)) {
        return serializer.serialize(el);
      }
    }

    return null;
  }

  render() {
    return (
      <div
        ref={el => (this.form = el)}
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
