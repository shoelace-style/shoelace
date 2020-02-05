import { Component, Method, Prop, State, h } from '@stencil/core';

/** @slot prefix - Used to prepend an icon or similar element to the input. */
/** @slot suffix - Used to append an icon or similar element to the input. */
/** @slot - The input's label. */

@Component({
  tag: 'sl-input',
  styleUrl: 'input.scss',
  scoped: true
})
export class Input {
  input: HTMLInputElement;

  @State() hasFocus = false;
  @State() isPasswordVisible = false;

  /** The input's type, one of `text`, `number`, `email`, etc. */
  @Prop() type = 'text';

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

  /** The input's inputmode attribute. */
  @Prop() inputmode: string;

  /** The input's pattern attribute. */
  @Prop() pattern: string;

  /** The input's required attribute. */
  @Prop() required: boolean;

  /** Set to true to add a clear button when the input is populated. */
  @Prop() clearable = false;

  /** Set to true to add a password toggle button for password inputs. */
  @Prop() togglePassword = false;

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
          minlength={this.minlength}
          maxlength={this.maxlength}
          min={this.min}
          max={this.max}
          step={this.step}
          value={this.value}
          autoCapitalize={this.autocapitalize}
          autoComplete={this.autocomplete}
          autoCorrect={this.autocorrect}
          autoFocus={this.autofocus}
          inputMode={this.inputmode}
          pattern={this.pattern}
          required={this.required}
          onFocus={() => (this.hasFocus = true)}
          onBlur={() => (this.hasFocus = false)}
          onInput={() => (this.value = this.input.value)}
        />

        {this.clearable && (
          <button
            class="sl-input__clear"
            onMouseDown={event => event.preventDefault()}
            onClick={() => (this.value = '')}
            tabindex="-1"
          >
            <svg
              viewBox="0 0 14 14"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g stroke="currentColor">
                  <path d="M5.09035326,5.09035326 L8.98429008,8.98429008" stroke-linecap="round"></path>
                  <path
                    d="M5.09035326,5.09035326 L8.98429008,8.98429008"
                    stroke-linecap="round"
                    transform="translate(7.000000, 7.000000) scale(-1, 1) translate(-7.000000, -7.000000) "
                  ></path>
                  <circle cx="7" cy="7" r="6"></circle>
                </g>
              </g>
            </svg>
          </button>
        )}

        {this.togglePassword && (
          <button
            class="sl-input__password-toggle"
            onMouseDown={event => event.preventDefault()}
            onClick={() => (this.isPasswordVisible = !this.isPasswordVisible)}
            tabindex="-1"
          >
            {this.isPasswordVisible ? (
              <svg
                viewBox="0 0 14 14"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g stroke="currentColor">
                    <path
                      d="M0.561279297,7.05270843 C2.78307812,4.40721792 4.94974478,3.08447266 7.0612793,3.08447266 C7.7102644,3.08447266 8.36445758,3.20942641 9.02385886,3.45933391 C9.67833093,3.70737329 10.3379335,4.07850528 11.0026666,4.57272988 C11.5657256,4.99136046 12.4185965,5.81801998 13.5612793,7.05270843 C11.4499758,9.74055125 9.28330918,11.0844727 7.0612793,11.0844727 C4.83924941,11.0844727 2.67258275,9.74055125 0.561279297,7.05270843 Z"
                      stroke-linejoin="round"
                    ></path>
                    <circle fill="currentColor" cx="7" cy="7" r="2"></circle>
                    <path
                      d="M1,11.58 L13,2.58"
                      stroke-linecap="round"
                      transform="translate(7.000000, 7.080000) scale(-1, 1) translate(-7.000000, -7.080000) "
                    ></path>
                  </g>
                </g>
              </svg>
            ) : (
              <svg
                viewBox="0 0 14 14"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g stroke="currentColor">
                    <path
                      d="M0.561279297,7.05270843 C2.78307812,4.40721792 4.94974478,3.08447266 7.0612793,3.08447266 C9.17281381,3.08447266 11.3394805,4.40721792 13.5612793,7.05270843 C11.4499758,9.74055125 9.28330918,11.0844727 7.0612793,11.0844727 C4.83924941,11.0844727 2.67258275,9.74055125 0.561279297,7.05270843 Z"
                      stroke-linejoin="round"
                    ></path>
                    <circle fill="currentColor" cx="7" cy="7" r="2"></circle>
                  </g>
                </g>
              </svg>
            )}
          </button>
        )}

        <span class="sl-input__suffix">
          <slot name="suffix" />
        </span>
      </div>
    );
  }
}
