import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import ShoelaceElement from '../../internal/shoelace-element';
import { LocalizeController } from '../../utilities/localize';
import styles from './option.styles';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Short summary of the component's intended use.
 *
 * @since 2.0
 * @status experimental
 *
 * @dependency sl-icon
 *
 * @event sl-event-name - Emitted as an example.
 *
 * @slot - The default slot.
 * @slot example - An example slot.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --example - An example CSS custom property.
 */
@customElement('sl-option')
export default class SlOption extends ShoelaceElement {
  static styles: CSSResultGroup = styles;

  private readonly localize = new LocalizeController(this);

  /** The option's value. When selected, the containing form control will receive this value. */
  @property() value = '';

  /** Draws the option in a disabled state, preventing selection. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'option');
    this.setAttribute('aria-selected', 'false');
  }

  render() {
    return html`
      <div class="option">
        <slot name="prefix" class="option__prefix"></slot>
        <slot class="option__label"></slot>
        <slot name="suffix" class="option__suffix"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-option': SlOption;
  }
}
