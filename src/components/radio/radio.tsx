import { Component, Element, Method, Prop, State, h } from '@stencil/core';

let id = 0;

/** @slot - The radio's label. */

@Component({
  tag: 'sl-radio',
  styleUrl: 'radio.scss',
  shadow: true
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
          'sl-radio': true,
          'sl-radio--checked': this.checked,
          'sl-radio--disabled': this.disabled,
          'sl-radio--focused': this.hasFocus
        }}
      >
        <span class="sl-radio__control">
          <span class="sl-radio__icon">
            <svg viewBox="0 0 16 16">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g fill="currentColor">
                  <circle cx="8" cy="8" r="3.42857143"></circle>
                </g>
              </g>
            </svg>
          </span>

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

        <span id={this.labelId} class="sl-radio__label">
          <slot />
        </span>
      </label>
    );
  }
}
