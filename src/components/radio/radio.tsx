import { Component, Element, Method, Prop, State, h } from '@stencil/core';

let id = 0;

/** @slot - The radio's label. */

@Component({
  tag: 'sh-radio',
  styleUrl: 'radio.scss',
  shadow: true
})
export class Radio {
  id = `sh-radio-${++id}`;
  labelId = `sh-radio-label-${id}`;
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

  /** The radio's tabindex attribute. */
  @Prop() nativeTabindex: number;

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
  }

  render() {
    return (
      <label
        htmlFor={this.id}
        role="radio"
        class={{
          'sh-radio': true,
          'sh-radio--checked': this.checked,
          'sh-radio--disabled': this.disabled,
          'sh-radio--focused': this.hasFocus
        }}
      >
        <span class="sh-radio__control">
          {this.checked ? (
            <svg
              viewBox="0 0 16 16"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g fill="currentColor">
                  <circle cx="8" cy="8" r="3.42857143"></circle>
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
            tabIndex={this.nativeTabindex}
            aria-labeledby={this.labelId}
            onBlur={() => (this.hasFocus = false)}
            onFocus={() => (this.hasFocus = true)}
            onInput={this.handleInput}
          />
        </span>

        <span id={this.labelId} class="sh-radio__label">
          <slot />
        </span>
      </label>
    );
  }
}
