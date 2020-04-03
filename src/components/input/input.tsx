import { Component, Element, Method, Prop, State, h } from '@stencil/core';

import inputEyeOpenIcon from '../../icons/input-eye-open.svg';
import inputEyeSlashIcon from '../../icons/input-eye-slash.svg';
import inputClearIcon from '../../icons/input-clear.svg';

/**
 * @slot before - Used to insert an addon before the input.
 * @slot after - Used to insert an addon after the input.
 * @slot prefix - Used to prepend an icon or similar element to the input.
 * @slot suffix - Used to append an icon or similar element to the input.
 */

@Component({
  tag: 'sl-input',
  styleUrl: 'input.scss',
  shadow: true
})
export class Input {
  input: HTMLInputElement;

  constructor() {
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handlePasswordToggle = this.handlePasswordToggle.bind(this);
  }

  @Element() host: HTMLElement;

  @State() hasFocus = false;
  @State() isPasswordVisible = false;

  /** The input's type, one of `text`, `number`, `email`, etc. */
  @Prop() type: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url' = 'text';

  /** The input's size, one of `small`, `medium`, or `large`. */
  @Prop() size = 'medium';

  /** The input's name attribute. */
  @Prop() name = '';

  /** The input's value attribute. */
  @Prop({ mutable: true }) value = '';

  /** The input's placeholder text. */
  @Prop() placeholder: string;

  /** Set to true to disable the input. */
  @Prop() disabled = false;

  /** Set to true for a readonly input. */
  @Prop() readonly = false;

  /** The input's minlength attribute. */
  @Prop() minlength: number;

  /** The input's maxlength attribute. */
  @Prop() maxlength: number;

  /** The input's min attribute. */
  @Prop() min: number;

  /** The input's max attribute. */
  @Prop() max: number;

  /** The input's step attribute. */
  @Prop() step: number;

  /** The input's autocaptialize attribute. */
  @Prop() autocapitalize: string;

  /** The input's autocorrect attribute. */
  @Prop() autocorrect: string;

  /** The input's autocomplete attribute. */
  @Prop() autocomplete: string;

  /** The input's autofocus attribute. */
  @Prop() autofocus: boolean;

  /** The input's pattern attribute. */
  @Prop() pattern: string;

  /** The input's required attribute. */
  @Prop() required: boolean;

  /** Set to true to add a clear button when the input is populated. */
  @Prop() clearable = false;

  /** Set to true to add a password toggle button for password inputs. */
  @Prop() togglePassword = false;

  /** The input's inputmode attribute. */
  @Prop() inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';

  /** The input's tabindex attribute. */
  @Prop() nativeTabindex: number;

  /** Sets focus on the input. */
  @Method()
  async setFocus() {
    this.input.focus();
  }

  /** Removes focus from the input. */
  @Method()
  async removeFocus() {
    this.input.blur();
  }

  handleClearClick() {
    this.input.value = '';
    this.input.dispatchEvent(new Event('input', { bubbles: true }));
    this.input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  handlePasswordToggle() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  render() {
    return (
      <div
        class={{
          'sl-input': true,

          // Sizes
          'sl-input--small': this.size === 'small',
          'sl-input--medium': this.size === 'medium',
          'sl-input--large': this.size === 'large',

          // States
          'sl-input--disabled': this.disabled,
          'sl-input--focused': this.hasFocus,
          'sl-input--empty': this.value.length === 0
        }}
        onClick={() => this.input.focus()}
      >
        <span class="sl-input__before">
          <slot name="before" />
        </span>

        <span class="sl-input__prefix">
          <slot name="prefix" />
        </span>

        <input
          ref={el => (this.input = el)}
          class="sl-input__control"
          type={this.type === 'password' && this.isPasswordVisible ? 'text' : this.type}
          name={this.name}
          placeholder={this.placeholder}
          disabled={this.disabled}
          readonly={this.readonly}
          minLength={this.minlength}
          maxLength={this.maxlength}
          min={this.min}
          max={this.max}
          step={this.step}
          value={this.value}
          autoCapitalize={this.autocapitalize}
          autoComplete={this.autocomplete}
          autoCorrect={this.autocorrect}
          autoFocus={this.autofocus}
          pattern={this.pattern}
          required={this.required}
          inputMode={this.inputmode}
          tabIndex={this.nativeTabindex}
          onFocus={() => (this.hasFocus = true)}
          onBlur={() => (this.hasFocus = false)}
          onInput={() => (this.value = this.input.value)}
        />

        {this.clearable && (
          <button
            class="sl-input__clear"
            onMouseDown={event => event.preventDefault()}
            onClick={this.handleClearClick}
            tabindex="-1"
            innerHTML={inputClearIcon}
          />
        )}

        {this.togglePassword && (
          <button
            class="sl-input__password-toggle"
            onMouseDown={event => event.preventDefault()}
            onClick={this.handlePasswordToggle}
            tabindex="-1"
            innerHTML={this.isPasswordVisible ? inputEyeSlashIcon : inputEyeOpenIcon}
          />
        )}

        <span class="sl-input__suffix">
          <slot name="suffix" />
        </span>

        <span class="sl-input__after">
          <slot name="after" />
        </span>
      </div>
    );
  }
}
