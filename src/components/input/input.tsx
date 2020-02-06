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
                  <g fill="currentColor">
                    <path d="M10.0196227,3.82829939 L8.32676039,5.52116167 C8.21981741,5.50720147 8.1107497,5.5 8,5.5 C6.61928813,5.5 5.5,6.61928813 5.5,8 C5.5,8.1107497 5.50720147,8.21981741 5.52116167,8.32676039 L3.019233,10.8286891 C1.58660175,9.79311821 0.641462054,8.60181429 0.641462054,8.06023821 C0.641462054,7.00042725 4.45026003,3.52511161 8.07003348,3.52511161 C8.72154307,3.52511161 9.37917613,3.63760768 10.0196227,3.82829939 Z M11.9951094,4.6709818 C14.0028061,5.78204489 15.4986049,7.39439781 15.4986049,8.06023821 C15.4986049,9.12273472 11.8792276,12.6679688 8.07003348,12.6679688 C6.92918563,12.6679688 5.80536422,12.3497227 4.79070376,11.8753874 L6.5967572,10.069334 C6.99683011,10.3411572 7.47986519,10.5 8,10.5 C9.38071187,10.5 10.5,9.38071187 10.5,8 C10.5,7.47986519 10.3411572,6.99683011 10.069334,6.5967572 L11.9951094,4.6709818 Z"></path>
                    <path d="M6.63636467,8.62577096 L8.62577096,6.63636467 C9.14173938,6.87353164 9.5,7.3949277 9.5,8 C9.5,8.82842712 8.82842712,9.5 8,9.5 C7.3949277,9.5 6.87353164,9.14173938 6.63636467,8.62577096 Z"></path>
                    <rect
                      transform="translate(8.029785, 7.929199) rotate(-225.000000) translate(-8.029785, -7.929199) "
                      x="-0.970214844"
                      y="7.42919922"
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
      </div>
    );
  }
}
