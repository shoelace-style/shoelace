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
              viewBox="0 0 16 16"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g stroke="currentColor">
                  <path d="M5.81754658,5.81754658 L10.2677601,10.2677601" stroke-linecap="round"></path>
                  <path
                    d="M5.81754658,5.81754658 L10.2677601,10.2677601"
                    stroke-linecap="round"
                    transform="translate(8.000000, 8.000000) scale(-1, 1) translate(-8.000000, -8.000000) "
                  ></path>
                  <circle cx="8" cy="8" r="6.85714286"></circle>
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
                viewBox="0 0 16 16"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g>
                    <path
                      d="M0.641462054,8.06023821 C3.1806607,5.03682047 5.65685118,3.52511161 8.07003348,3.52511161 C8.81173074,3.52511161 9.5593801,3.66791589 10.3129815,3.95352447 C11.0609496,4.23699805 11.8147812,4.66114889 12.5744761,5.22597701 C13.2179721,5.70441196 14.1926817,6.64916569 15.4986049,8.06023821 C13.0856867,11.1320586 10.6094962,12.6679688 8.07003348,12.6679688 C5.53057076,12.6679688 3.05438028,11.1320586 0.641462054,8.06023821 Z"
                      stroke="#979797"
                      stroke-linejoin="round"
                    ></path>
                    <circle fill="currentColor" cx="8" cy="8" r="2.28571429"></circle>
                    <path
                      d="M1.14285714,13.2342857 L14.8571429,2.94857143"
                      stroke="currentColor"
                      stroke-linecap="round"
                      transform="translate(8.000000, 8.091429) scale(-1, 1) translate(-8.000000, -8.091429) "
                    ></path>
                  </g>
                </g>
              </svg>
            ) : (
              <svg
                viewBox="0 0 16 16"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g>
                    <path
                      d="M0.641462054,8.06023821 C3.1806607,5.03682047 5.65685118,3.52511161 8.07003348,3.52511161 C10.4832158,3.52511161 12.9594063,5.03682047 15.4986049,8.06023821 C13.0856867,11.1320586 10.6094962,12.6679688 8.07003348,12.6679688 C5.53057076,12.6679688 3.05438028,11.1320586 0.641462054,8.06023821 Z"
                      stroke="#979797"
                      stroke-linejoin="round"
                    ></path>
                    <circle fill="currentColor" cx="8" cy="8" r="2.28571429"></circle>
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
