import { LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { html } from 'lit/static-html.js';
import { emit } from '../../internal/event';
import { HasSlotController } from '../../internal/slot';
import { watch } from '../../internal/watch';
import styles from './radio-button.styles';
import type { CSSResultGroup } from 'lit';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The radio's label.
 *
 * @event sl-blur - Emitted when the button loses focus.
 * @event sl-focus - Emitted when the button gains focus.
 *
 * @slot - The button's label.
 * @slot prefix - Used to prepend an icon or similar element to the button.
 * @slot suffix - Used to append an icon or similar element to the button.
 *
 * @csspart base - The component's internal wrapper.
 * @csspart button - The internal button element.
 * @csspart prefix - The prefix slot's container.
 * @csspart label - The button's label.
 * @csspart suffix - The suffix slot's container.
 */
@customElement('sl-radio-button')
export default class SlRadioButton extends LitElement {
  static styles: CSSResultGroup = styles;

  @query('.button') input: HTMLInputElement;
  @query('.hidden-input') hiddenInput: HTMLInputElement;

  private readonly hasSlotController = new HasSlotController(this, '[default]', 'prefix', 'suffix');

  @state() protected hasFocus = false;
  @state() checked = false;

  /** The radio's name attribute. */
  @property({ reflect: true }) name: string;

  /** The radio's value attribute. */
  @property() value: string;

  /** Disables the radio. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** The button's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** Draws a pill-style button with rounded edges. */
  @property({ type: Boolean, reflect: true }) pill = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'presentation');
  }

  @watch('disabled', { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
  }

  handleBlur() {
    this.hasFocus = false;
    emit(this, 'sl-blur');
  }

  handleClick(e: MouseEvent) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    this.checked = true;
  }

  handleFocus() {
    this.hasFocus = true;
    emit(this, 'sl-focus');
  }

  render() {
    return html`
      <div part="base" role="presentation">
        <button
          part="button"
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
          name=${ifDefined(this.name)}
          value=${ifDefined(this.value)}
          tabindex="${this.checked ? '0' : '-1'}"
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @click=${this.handleClick}
        >
          <span part="prefix" class="button__prefix">
            <slot name="prefix"></slot>
          </span>
          <span part="label" class="button__label">
            <slot></slot>
          </span>
          <span part="suffix" class="button__suffix">
            <slot name="suffix"></slot>
          </span>
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
