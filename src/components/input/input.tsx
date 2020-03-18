import { Component, Element, Method, Prop, State, h } from '@stencil/core';

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
  @Prop() nativeInputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';

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
          inputMode={this.nativeInputmode}
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
          >
            <svg
              viewBox="0 0 16 16"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g fill="currentColor">
                  <path d="M7.29386978,8.02282715 L5.17254944,10.1441475 C4.97728729,10.3394096 4.97728729,10.6559921 5.17254944,10.8512543 C5.36781158,11.0465164 5.68439407,11.0465164 5.87965622,10.8512543 L8.00097656,8.72993393 L10.1222969,10.8512543 C10.3175591,11.0465164 10.6341415,11.0465164 10.8294037,10.8512543 C11.0246658,10.6559921 11.0246658,10.3394096 10.8294037,10.1441475 L8.70808334,8.02282715 L10.8294037,5.9015068 C11.0246658,5.70624466 11.0246658,5.38966217 10.8294037,5.19440002 C10.6341415,4.99913788 10.3175591,4.99913788 10.1222969,5.19440002 L8.00097656,7.31572037 L5.87965622,5.19440002 C5.68439407,4.99913788 5.36781158,4.99913788 5.17254944,5.19440002 C4.97728729,5.38966217 4.97728729,5.70624466 5.17254944,5.9015068 L7.29386978,8.02282715 Z M8,14.8571429 C4.21290457,14.8571429 1.14285714,11.7870954 1.14285714,8 C1.14285714,4.21290457 4.21290457,1.14285714 8,1.14285714 C11.7870954,1.14285714 14.8571429,4.21290457 14.8571429,8 C14.8571429,11.7870954 11.7870954,14.8571429 8,14.8571429 Z"></path>
                </g>
              </g>
            </svg>
          </button>
        )}

        {this.togglePassword && (
          <button
            class="sl-input__password-toggle"
            onMouseDown={event => event.preventDefault()}
            onClick={this.handlePasswordToggle}
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
                  <g fill="currentColor">
                    <path d="M7.34370757,6.65081435 L9.34918565,8.65629243 C9.10574722,9.1558136 8.59306813,9.5 8,9.5 C7.17157288,9.5 6.5,8.82842712 6.5,8 C6.5,7.40693187 6.8441864,6.89425278 7.34370757,6.65081435 Z M8.93060759,6.82350081 C9.02175034,6.89569214 9.10430786,6.97824966 9.17649919,7.06939241 L8.93060759,6.82350081 Z"></path>
                    <path d="M4.9571931,4.26429988 L6.61276976,5.91987654 C5.94184716,6.36820429 5.5,7.13250268 5.5,8 C5.5,9.38071187 6.61928813,10.5 8,10.5 C8.86749732,10.5 9.63179571,10.0581528 10.0801235,9.38723024 L12.1508136,11.4579204 C10.9444637,12.1535637 9.52101957,12.6679688 8.07003348,12.6679688 C4.2608394,12.6679688 0.641462054,9.12004917 0.641462054,8.06023821 C0.641462054,7.3091732 2.55433524,5.3449816 4.9571931,4.26429988 Z M5.97908567,3.87197889 C6.66389132,3.65490666 7.37049222,3.52511161 8.07003348,3.52511161 C11.6898069,3.52511161 15.4986049,6.9977417 15.4986049,8.06023821 C15.4986049,8.61664111 14.506043,9.85389887 13.0134394,10.9063327 L10.473362,8.3662552 C10.4909114,8.24671135 10.5,8.12441705 10.5,8 C10.5,6.61928813 9.38071187,5.5 8,5.5 C7.87558295,5.5 7.75328865,5.50908857 7.6337448,5.52663802 L5.97908567,3.87197889 Z"></path>
                    <rect
                      transform="translate(7.967514, 7.967514) scale(-1, 1) rotate(-225.000000) translate(-7.967514, -7.967514) "
                      x="-1.03248558"
                      y="7.46751442"
                      width="18"
                      height="1"
                      rx="0.5"
                    ></rect>
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
                  <g fill="currentColor">
                    <path d="M0.641462054,8.06023821 C0.641462054,7.00042725 4.45026003,3.52511161 8.07003348,3.52511161 C11.6898069,3.52511161 15.4986049,6.9977417 15.4986049,8.06023821 C15.4986049,9.12273472 11.8792276,12.6679687 8.07003348,12.6679687 C4.2608394,12.6679687 0.641462054,9.12004917 0.641462054,8.06023821 Z M8,10.5 C9.38071187,10.5 10.5,9.38071187 10.5,8 C10.5,6.61928813 9.38071187,5.5 8,5.5 C6.61928813,5.5 5.5,6.61928813 5.5,8 C5.5,9.38071187 6.61928813,10.5 8,10.5 Z"></path>
                    <circle cx="8" cy="8" r="1.5"></circle>
                  </g>
                </g>
              </svg>
            )}
          </button>
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
