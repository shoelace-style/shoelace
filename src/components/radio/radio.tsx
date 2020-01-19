import { Component, Element, Method, Prop, State, h } from '@stencil/core';

let id = 0;

/** @slot - The radio's label. */

@Component({
  tag: 'sl-radio',
  styleUrl: 'radio.scss',
  scoped: true
})
export class Radio {
  id = `sl-radio-${++id}`;
  labelId = `sl-radio-label-${id}`;
  input: HTMLInputElement;

  constructor() {
    this.handleInput = this.handleInput.bind(this);
  }

  @Element() host: HTMLElement;

  @State() hasFocus = false;

  /** A native input's name attribute. */
  @Prop() name: string;

  /** The native input's value attribute. */
  @Prop() value: string;

  /** Set to true to disable the radio. */
  @Prop() disabled = false;

  /** Set to true to draw the radio in a checked state. */
  @Prop({ mutable: true }) checked = false;

  /** Sets focus on the radio. */
  @Method()
  async setFocus() {
    this.input.focus();
  }

  /** Removes focus from the radio. */
  @Method()
  async removeFocus() {
    this.input.blur();
  }

  handleInput() {
    this.checked = this.input.checked;

    // No event is fired when a radio is unchecked, so we need to sync all radios with the same name to their native
    // input element's checked state. This lets us borrow the native browser radio selection behavior while keeping
    // the checked prop of our custom elements in sync.
    if (this.checked) {
      [...document.querySelectorAll(`sl-radio[name="${this.name}"]`)].map((radio: HTMLSlRadioElement) => {
        const nativeInput = radio.querySelector('input[type="radio"]') as HTMLInputElement; // tslint:disable-line
        if (nativeInput) {
          radio.checked = nativeInput.checked;
        }
      });
    }
  }

  render() {
    return (
      <label
        htmlFor={this.id}
        role="radio"
        class={{
          'sl-radio': true,
          'sl-radio--checked': this.checked,
          'sl-radio--disabled': this.disabled,
          'sl-radio--focused': this.hasFocus
        }}
      >
        <span class="sl-radio__control">
          {this.checked ? (
            <svg
              viewBox="0 0 14 14"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g fill="currentColor">
                  <circle cx="7" cy="7" r="3"></circle>
                </g>
              </g>
            </svg>
          ) : null}

          <input
            ref={el => (this.input = el)}
            id={this.id}
            type="radio"
            name={this.name}
            value={this.value}
            checked={this.checked}
            disabled={this.disabled}
            aria-labeledby={this.labelId}
            onBlur={() => (this.hasFocus = false)}
            onFocus={() => (this.hasFocus = true)}
            onInput={this.handleInput}
          />
        </span>

        <span id={this.labelId} class="sl-radio__label">
          <slot />
        </span>
      </label>
    );
  }
}
