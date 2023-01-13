import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import { HasSlotController } from '../../internal/slot';
import { html } from 'lit/static-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { watch } from '../../internal/watch';
import ShoelaceElement from '../../internal/shoelace-element';
import styles from './radio-button.styles';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Radios buttons allow the user to select a single option from a group using a button-like control.
 * @documentation https://shoelace.style/components/radio-button
 * @status stable
 * @since 2.0
 *
 * @slot - The radio button's label.
 * @slot prefix - A presentational prefix icon or similar element.
 * @slot suffix - A presentational suffix icon or similar element.
 *
 * @event sl-blur - Emitted when the button loses focus.
 * @event sl-focus - Emitted when the button gains focus.
 *
 * @csspart base - The component's base wrapper.
 * @csspart button - The internal `<button>` element.
 * @csspart button--checked - The internal button element when the radio button is checked.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart label - The container that wraps the radio button's label.
 * @csspart suffix - The container that wraps the suffix.
 */
@customElement('sl-radio-button')
export default class SlRadioButton extends ShoelaceElement {
  static styles: CSSResultGroup = styles;

  private readonly hasSlotController = new HasSlotController(this, '[default]', 'prefix', 'suffix');

  @query('.button') input: HTMLInputElement;
  @query('.hidden-input') hiddenInput: HTMLInputElement;

  @state() protected hasFocus = false;

  /**
   * @internal The radio button's checked state. This is exposed as an "internal" attribute so we can reflect it, making
   * it easier to style in button groups.
   */
  @property({ type: Boolean, reflect: true }) checked = false;

  /** The radio's value. When selected, the radio group will receive this value. */
  @property() value: string;

  /** Disables the radio button. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** The radio button's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** Draws a pill-style radio button with rounded edges. */
  @property({ type: Boolean, reflect: true }) pill = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'presentation');
  }

  private handleBlur() {
    this.hasFocus = false;
    this.emit('sl-blur');
  }

  private handleClick(e: MouseEvent) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    this.checked = true;
  }

  private handleFocus() {
    this.hasFocus = true;
    this.emit('sl-focus');
  }

  @watch('disabled', { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
  }

  /** Sets focus on the radio button. */
  focus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the radio button. */
  blur() {
    this.input.blur();
  }

  render() {
    return html`
      <div part="base" role="presentation">
        <button
          part="${`button${this.checked ? ' button--checked' : ''}`}"
          role="radio"
          aria-checked="${this.checked}"
          class=${classMap({
            button: true,
            'button--default': true,
            'button--small': this.size === 'small',
            'button--medium': this.size === 'medium',
            'button--large': this.size === 'large',
            'button--checked': this.checked,
            'button--disabled': this.disabled,
            'button--focused': this.hasFocus,
            'button--outline': true,
            'button--pill': this.pill,
            'button--has-label': this.hasSlotController.test('[default]'),
            'button--has-prefix': this.hasSlotController.test('prefix'),
            'button--has-suffix': this.hasSlotController.test('suffix')
          })}
          aria-disabled=${this.disabled}
          type="button"
          value=${ifDefined(this.value)}
          tabindex="${this.checked ? '0' : '-1'}"
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @click=${this.handleClick}
        >
          <slot name="prefix" part="prefix" class="button__prefix"></slot>
          <slot part="label" class="button__label"></slot>
          <slot name="suffix" part="suffix" class="button__suffix"></slot>
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-radio-button': SlRadioButton;
  }
}
