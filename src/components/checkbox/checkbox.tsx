import { Component, Event, EventEmitter, Method, Prop, State, Watch, h } from '@stencil/core';

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
    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
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

  /** Set to true to draw the checkbox in an indeterminate state. */
  @Prop({ mutable: true }) indeterminate = false;

  /** Emitted when the control loses focus. */
  @Event() slBlur: EventEmitter;

  /** Emitted when the control's state changes. */
  @Event() slChange: EventEmitter;

  /** Emitted when the control gains focus. */
  @Event() slFocus: EventEmitter;

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

  handleClick(event: MouseEvent) {
    const slChange = this.slChange.emit();

    if (slChange.defaultPrevented) {
      event.preventDefault();
    } else {
      this.checked = this.input.checked;
      this.indeterminate = this.input.indeterminate;
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
          {this.checked && (
            <span class="sl-checkbox__icon">
              <svg viewBox="0 0 16 16">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                  <g stroke="currentColor" stroke-width="2">
                    <g transform="translate(3.428571, 3.428571)">
                      <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
                      <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </span>
          )}

          {!this.checked && this.indeterminate && (
            <span class="sl-checkbox__icon">
              <svg viewBox="0 0 16 16">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                  <g stroke="currentColor" stroke-width="2">
                    <g transform="translate(2.285714, 6.857143)">
                      <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </span>
          )}

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
          />
        </span>

        <span id={this.labelId} class="sl-checkbox__label">
          <slot />
        </span>
      </label>
    );
  }
}
