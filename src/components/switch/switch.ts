import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import { defaultValue } from '../../internal/default-value';
import { FormControlController } from '../../internal/form';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { watch } from '../../internal/watch';
import ShoelaceElement from '../../internal/shoelace-element';
import styles from './switch.styles';
import type { CSSResultGroup } from 'lit';
import type { ShoelaceFormControl } from '../../internal/shoelace-element';

/**
 * @summary Switches allow the user to toggle an option on or off.
 * @documentation https://shoelace.style/components/switch
 * @status stable
 * @since 2.0
 *
 * @slot - The switch's label.
 *
 * @event sl-blur - Emitted when the control loses focus.
 * @event sl-change - Emitted when the control's checked state changes.
 * @event sl-input - Emitted when the control receives input.
 * @event sl-focus - Emitted when the control gains focus.
 *
 * @csspart base - The component's base wrapper.
 * @csspart control - The control that houses the switch's thumb.
 * @csspart thumb - The switch's thumb.
 * @csspart label - The switch's label.
 *
 * @cssproperty --width - The width of the switch.
 * @cssproperty --height - The height of the switch.
 * @cssproperty --thumb-size - The size of the thumb.
 */
@customElement('sl-switch')
export default class SlSwitch extends ShoelaceElement implements ShoelaceFormControl {
  static styles: CSSResultGroup = styles;

  private readonly formControlController = new FormControlController(this, {
    value: (control: SlSwitch) => (control.checked ? control.value || 'on' : undefined),
    defaultValue: (control: SlSwitch) => control.defaultChecked,
    setValue: (control: SlSwitch, checked: boolean) => (control.checked = checked)
  });

  @query('input[type="checkbox"]') input: HTMLInputElement;

  @state() private hasFocus = false;
  @property() title = ''; // make reactive to pass through

  /** The name of the switch, submitted as a name/value pair with form data. */
  @property() name = '';

  /** The current value of the switch, submitted as a name/value pair with form data. */
  @property() value: string;

  /** The switch's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** Disables the switch. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Draws the switch in a checked state. */
  @property({ type: Boolean, reflect: true }) checked = false;

  /** The default value of the form control. Primarily used for resetting the form control. */
  @defaultValue('checked') defaultChecked = false;

  /**
   * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
   * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
   * the same document or shadow root for this to work.
   */
  @property({ reflect: true }) form = '';

  /** Makes the switch a required field. */
  @property({ type: Boolean, reflect: true }) required = false;

  firstUpdated() {
    this.formControlController.updateValidity();
  }

  private handleBlur() {
    this.hasFocus = false;
    this.emit('sl-blur');
  }

  private handleInput() {
    this.emit('sl-input');
  }

  private handleClick() {
    this.checked = !this.checked;
    this.emit('sl-change');
  }

  private handleFocus() {
    this.hasFocus = true;
    this.emit('sl-focus');
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.checked = false;
      this.emit('sl-change');
      this.emit('sl-input');
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.checked = true;
      this.emit('sl-change');
      this.emit('sl-input');
    }
  }

  @watch('checked', { waitUntilFirstUpdate: true })
  handleCheckedChange() {
    this.input.checked = this.checked; // force a sync update
    this.formControlController.updateValidity();
  }

  @watch('disabled', { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    // Disabled form controls are always valid
    this.formControlController.setValidity(true);
  }

  /** Simulates a click on the switch. */
  click() {
    this.input.click();
  }

  /** Sets focus on the switch. */
  focus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the switch. */
  blur() {
    this.input.blur();
  }

  /** Checks for validity but does not show the browser's validation message. */
  checkValidity() {
    return this.input.checkValidity();
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    return this.input.reportValidity();
  }

  /** Sets a custom validation message. Pass an empty string to restore validity. */
  setCustomValidity(message: string) {
    this.input.setCustomValidity(message);
    this.formControlController.updateValidity();
  }

  render() {
    return html`
      <label
        part="base"
        class=${classMap({
          switch: true,
          'switch--checked': this.checked,
          'switch--disabled': this.disabled,
          'switch--focused': this.hasFocus,
          'switch--small': this.size === 'small',
          'switch--medium': this.size === 'medium',
          'switch--large': this.size === 'large'
        })}
      >
        <input
          class="switch__input"
          type="checkbox"
          title=${this.title /* An empty title prevents browser validation tooltips from appearing on hover */}
          name=${this.name}
          value=${ifDefined(this.value)}
          .checked=${live(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          role="switch"
          aria-checked=${this.checked ? 'true' : 'false'}
          @click=${this.handleClick}
          @input=${this.handleInput}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @keydown=${this.handleKeyDown}
        />

        <span part="control" class="switch__control">
          <span part="thumb" class="switch__thumb"></span>
        </span>

        <slot part="label" class="switch__label"></slot>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-switch': SlSwitch;
  }
}
