import { Component, Element, Event, EventEmitter, Method, Prop, State, Watch, h } from '@stencil/core';

let id = 0;

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The radio's label.
 *
 * @part base - The component's base wrapper.
 * @part control - The radio control.
 * @part checked-icon - The container the wraps the checked icon.
 * @part label - The radio label.
 */

@Component({
  tag: 'sl-radio',
  styleUrl: 'radio.scss',
  shadow: true
})
export class Radio {
  inputId = `radio-${++id}`;
  labelId = `radio-label-${id}`;
  input: HTMLInputElement;

  @Element() host: HTMLSlRadioElement;

  @State() hasFocus = false;

  /** The radio's name attribute. */
  @Prop() name: string;

  /** The radio's value attribute. */
  @Prop() value: string;

  /** Set to true to disable the radio. */
  @Prop() disabled = false;

  /** Set to true to draw the radio in a checked state. */
  @Prop({ mutable: true, reflect: true }) checked = false;

  /**
   * This will be true when the control is in an invalid state. Validity in range inputs is determined by the message
   * provided by the `setCustomValidity` method.
   */
  @Prop({ mutable: true, reflect: true }) invalid = false;

  @Watch('checked')
  handleCheckedChange() {
    if (this.checked) {
      this.getSiblingRadios().map(radio => (radio.checked = false));
    }
    this.input.checked = this.checked;
    this.slChange.emit();
  }

  /** Emitted when the control loses focus. */
  @Event({ eventName: 'sl-blur' }) slBlur: EventEmitter;

  /** Emitted when the control's checked state changes. */
  @Event({ eventName: 'sl-change' }) slChange: EventEmitter;

  /** Emitted when the control gains focus. */
  @Event({ eventName: 'sl-focus' }) slFocus: EventEmitter;

  connectedCallback() {
    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  /** Sets focus on the radio. */
  @Method()
  async setFocus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the radio. */
  @Method()
  async removeFocus() {
    this.input.blur();
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  @Method()
  async reportValidity() {
    return this.input.reportValidity();
  }

  /** Sets a custom validation message. If `message` is not empty, the field will be considered invalid. */
  @Method()
  async setCustomValidity(message: string) {
    this.input.setCustomValidity(message);
    this.invalid = !this.input.checkValidity();
  }

  getAllRadios() {
    const form = this.host.closest('sl-form, form') || document.body;

    if (!this.name) return [];

    return [...form.querySelectorAll('sl-radio')].filter(
      (radio: HTMLSlRadioElement) => radio.name === this.name
    ) as HTMLSlRadioElement[];
  }

  getSiblingRadios() {
    return this.getAllRadios().filter(radio => radio !== this.host) as HTMLSlRadioElement[];
  }

  handleClick() {
    this.checked = this.input.checked;
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
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      const radios = this.getAllRadios().filter(radio => !radio.disabled);
      const incr = ['ArrowUp', 'ArrowLeft'].includes(event.key) ? -1 : 1;
      let index = radios.indexOf(this.host) + incr;
      if (index < 0) index = radios.length - 1;
      if (index > radios.length - 1) index = 0;

      this.getAllRadios().map(radio => (radio.checked = false));
      radios[index].setFocus();
      radios[index].checked = true;

      event.preventDefault();
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
        part="base"
        class={{
          radio: true,
          'radio--checked': this.checked,
          'radio--disabled': this.disabled,
          'radio--focused': this.hasFocus
        }}
        htmlFor={this.inputId}
        onKeyDown={this.handleKeyDown}
        onMouseDown={this.handleMouseDown}
      >
        <span part="control" class="radio__control">
          <span part="checked-icon" class="radio__icon">
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
            role="radio"
            aria-checked={this.checked ? 'true' : 'false'}
            aria-labelledby={this.labelId}
            onClick={this.handleClick}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
          />
        </span>

        <span part="label" id={this.labelId} class="radio__label">
          <slot />
        </span>
      </label>
    );
  }
}
