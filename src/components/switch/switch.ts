import { LitElement, html, internalProperty, property, query, unsafeCSS } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { event, EventEmitter, tag } from '../../internal/decorators';
import styles from 'sass:./switch.scss';

let id = 0;

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The switch's label.
 *
 * @part base - The component's base wrapper.
 * @part control - The switch control.
 * @part thumb - The switch position indicator.
 * @part label - The switch label.
 */
@tag('sl-switch')
export class SlSwitch extends LitElement {
  static styles = unsafeCSS(styles);

  @query('input[type="checkbox"]') input: HTMLInputElement;

  private switchId = `switch-${++id}`;
  private labelId = `switch-label-${id}`;

  @internalProperty() private hasFocus = false;

  /** The switch's name attribute. */
  @property() name: string;

  /** The switch's value attribute. */
  @property() value: string;

  /** Disables the switch. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Makes the switch a required field. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Draws the switch in a checked state. */
  @property({ type: Boolean, reflect: true }) checked = false;

  /** This will be true when the control is in an invalid state. Validity is determined by the `required` prop. */
  @property({ type: Boolean, reflect: true }) invalid = false;

  /** Emitted when the control loses focus. */
  @event('sl-blur') slBlur: EventEmitter<void>;

  /** Emitted when the control's checked state changes. */
  @event('sl-change') slChange: EventEmitter<void>;

  /** Emitted when the control gains focus. */
  @event('sl-focus') slFocus: EventEmitter<void>;

  /** Sets focus on the switch. */
  setFocus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the switch. */
  removeFocus() {
    this.input.blur();
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    return this.input.reportValidity();
  }

  /** Sets a custom validation message. If `message` is not empty, the field will be considered invalid. */
  setCustomValidity(message: string) {
    this.input.setCustomValidity(message);
    this.invalid = !this.input.checkValidity();
  }

  handleClick() {
    this.checked = !this.checked;
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

  checkedChanged() {
    if (this.input) {
      this.input.checked = this.checked;
      this.slChange.emit();
    }
  }

  render() {
    return html`
      <label
        part="base"
        for=${this.switchId}
        class=${classMap({
          switch: true,
          'switch--checked': this.checked,
          'switch--disabled': this.disabled,
          'switch--focused': this.hasFocus
        })}
        @mousedown=${this.handleMouseDown}
      >
        <span part="control" class="switch__control">
          <span part="thumb" class="switch__thumb"></span>

          <input
            id=${this.switchId}
            type="checkbox"
            name=${this.name}
            .value=${this.value}
            ?checked=${this.checked}
            ?disabled=${this.disabled}
            ?required=${this.required}
            role="switch"
            aria-checked=${this.checked ? 'true' : 'false'}
            aria-labelledby=${this.labelId}
            @click=${this.handleClick}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
            @keydown=${this.handleKeyDown}
          />
        </span>

        <span part="label" id=${this.labelId} class="switch__label">
          <slot></slot>
        </span>
      </label>
    `;
  }
}
