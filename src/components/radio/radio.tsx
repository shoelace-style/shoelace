import { Component, Element, Event, EventEmitter, Method, Prop, State, h } from '@stencil/core';

let id = 0;

/**
 * @since 1.0
 * @status stable
 *
 * @slot - The radio's label.
 */

@Component({
  tag: 'sl-radio',
  styleUrl: 'radio.scss',
  shadow: true
})
export class Radio {
  constructor() {
    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  inputId = `radio-${++id}`;
  labelId = `radio-label-${id}`;
  input: HTMLInputElement;

  @Element() host: HTMLSlRadioElement;

  @State() hasFocus = false;

  /** A native input's name attribute. */
  @Prop() name: string;

  /** The native input's value attribute. */
  @Prop() value: string;

  /** Set to true to disable the radio. */
  @Prop() disabled = false;

  /** Set to true to draw the radio in a checked state. */
  @Prop({ mutable: true }) checked = false;

  /** Emitted when the control loses focus. */
  @Event() slBlur: EventEmitter;

  /** Emitted when the control's state changes. */
  @Event() slChange: EventEmitter;

  /** Emitted when the control gains focus. */
  @Event() slFocus: EventEmitter;

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

  handleClick(event: MouseEvent) {
    const slChange = this.slChange.emit();

    if (slChange.defaultPrevented) {
      event.preventDefault();
    } else {
      this.checked = this.input.checked;
    }
  }

  handleBlur() {
    this.hasFocus = false;
    this.slBlur.emit();
  }

  handleFocus() {
    this.hasFocus = true;
    this.slFocus.emit();
  }

  handleMouseDown(event: MouseEvent) {
    // Prevent clicks on the label from briefly blurring the input
    event.preventDefault();
    this.input.focus();
  }

  render() {
    return (
      <label
        htmlFor={this.inputId}
        role="radio"
        class={{
          radio: true,
          'radio--checked': this.checked,
          'radio--disabled': this.disabled,
          'radio--focused': this.hasFocus
        }}
        onMouseDown={this.handleMouseDown}
      >
        <span class="radio__control">
          <span class="radio__icon">
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
            id={this.inputId}
            type="radio"
            name={this.name}
            value={this.value}
            checked={this.checked}
            disabled={this.disabled}
            aria-labeledby={this.labelId}
            onClick={this.handleClick}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
          />
        </span>

        <span id={this.labelId} class="radio__label">
          <slot />
        </span>
      </label>
    );
  }
}
