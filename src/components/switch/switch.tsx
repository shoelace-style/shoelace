import { Component, Method, Prop, State, h } from '@stencil/core';

let id = 0;

/** @slot - The switch's label. */

@Component({
  tag: 'sl-switch',
  styleUrl: 'switch.scss',
  scoped: true
})
export class Switch {
  id = `sl-switch-${++id}`;
  labelId = `sl-switch-label-${id}`;
  input: HTMLInputElement;

  constructor() {
    this.handleInput = this.handleInput.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
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

  /** The switch's tabindex attribute. */
  @Prop() nativeTabindex: number;

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

  handleInput() {
    this.checked = this.input.checked;
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
            tabIndex={this.nativeTabindex}
            aria-labeledby={this.labelId}
            onBlur={() => (this.hasFocus = false)}
            onFocus={() => (this.hasFocus = true)}
            onKeyDown={this.handleKeyDown}
            onInput={this.handleInput}
          />
        </span>

        <span id={this.labelId} class="sl-switch__label">
          <slot />
        </span>
      </label>
    );
  }
}
