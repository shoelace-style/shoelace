import { Component, Event, EventEmitter, Method, Prop, State, h } from '@stencil/core';

let id = 0;

/** @slot - The switch's label. */

@Component({
  tag: 'sl-switch',
  styleUrl: 'switch.scss',
  shadow: true
})
export class Switch {
  id = `sl-switch-${++id}`;
  labelId = `sl-switch-label-${id}`;
  input: HTMLInputElement;

  constructor() {
    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  @State() hasFocus = false;

  /** A native input's name attribute. */
  @Prop() name: string;

  /** The native input's value attribute. */
  @Prop() value: string;

  /** Set to true to disable the switch. */
  @Prop() disabled = false;

  /** Set to true to draw the switch in a checked state. */
  @Prop({ mutable: true }) checked = false;

  /** Emitted when the control loses focus. */
  @Event() slBlur: EventEmitter;

  /** Emitted when the control's state changes. */
  @Event() slChange: EventEmitter;

  /** Emitted when the control gains focus. */
  @Event() slFocus: EventEmitter;

  /** Sets focus on the switch. */
  @Method()
  async setFocus() {
    this.input.focus();
  }

  /** Removes focus from the switch. */
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

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.checked = false;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.checked = true;
    }
  }

  handleMouseDown(event: MouseEvent) {
    // Prevent clicks on the label from briefly blurring the input
    event.preventDefault();
    this.input.focus();
  }

  render() {
    return (
      <label
        htmlFor={this.id}
        role="switch"
        class={{
          'sl-switch': true,
          'sl-switch--checked': this.checked,
          'sl-switch--disabled': this.disabled,
          'sl-switch--focused': this.hasFocus
        }}
        onMouseDown={this.handleMouseDown}
      >
        <span class="sl-switch__control">
          <span class="sl-switch__thumb" />

          <input
            ref={el => (this.input = el)}
            id={this.id}
            type="checkbox"
            name={this.name}
            value={this.value}
            checked={this.checked}
            disabled={this.disabled}
            aria-labeledby={this.labelId}
            onClick={this.handleClick}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            onKeyDown={this.handleKeyDown}
          />
        </span>

        <span id={this.labelId} class="sl-switch__label">
          <slot />
        </span>
      </label>
    );
  }
}
