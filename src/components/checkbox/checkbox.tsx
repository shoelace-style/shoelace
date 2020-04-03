import { Component, Method, Prop, State, Watch, h } from '@stencil/core';

import checkboxCheckIcon from '../../icons/checkbox-check.svg';
import checkboxIndeterminateIcon from '../../icons/checkbox-indeterminate.svg';

let id = 0;

/** @slot - The checkbox's label. */

@Component({
  tag: 'sl-checkbox',
  styleUrl: 'checkbox.scss',
  shadow: true
})
export class Checkbox {
  id = `sl-checkbox-${++id}`;
  labelId = `sl-checkbox-label-${id}`;
  input: HTMLInputElement;

  constructor() {
    this.handleInput = this.handleInput.bind(this);
  }

  @State() hasFocus = false;

  /** A native input's name attribute. */
  @Prop() name: string;

  /** The native input's value attribute. */
  @Prop() value: string;

  /** Set to true to disable the checkbox. */
  @Prop() disabled = false;

  /** Set to true to draw the checkbox in a checked state. */
  @Prop({ mutable: true }) checked = false;

  /** The checkbox's tabindex attribute. */
  @Prop() nativeTabindex: number;

  /** Set to true to draw the checkbox in an indeterminate state. */
  @Prop({ mutable: true }) indeterminate = false;

  @Watch('indeterminate')
  handleIndeterminateChange() {
    this.input.indeterminate = this.indeterminate;
  }

  componentDidLoad() {
    this.input.indeterminate = this.indeterminate;
  }

  /** Sets focus on the checkbox. */
  @Method()
  async setFocus() {
    this.input.focus();
  }

  /** Removes focus from the checkbox. */
  @Method()
  async removeFocus() {
    this.input.blur();
  }

  handleInput() {
    this.checked = this.input.checked;
    this.indeterminate = this.input.indeterminate;
  }

  render() {
    return (
      <label
        htmlFor={this.id}
        role="checkbox"
        class={{
          'sl-checkbox': true,
          'sl-checkbox--checked': this.checked,
          'sl-checkbox--disabled': this.disabled,
          'sl-checkbox--focused': this.hasFocus,
          'sl-checkbox--indeterminate': this.indeterminate
        }}
      >
        <span class="sl-checkbox__control">
          {this.checked && <span class="sl-checkbox__icon" innerHTML={checkboxCheckIcon} />}

          {!this.checked && this.indeterminate && (
            <span class="sl-checkbox__icon" innerHTML={checkboxIndeterminateIcon} />
          )}

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
            onInput={this.handleInput}
          />
        </span>

        <span id={this.labelId} class="sl-checkbox__label">
          <slot />
        </span>
      </label>
    );
  }
}
