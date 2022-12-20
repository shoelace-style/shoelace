import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import ShoelaceElement from '../../internal/shoelace-element';
import { getTextContent } from '../../internal/slot';
import { watch } from '../../internal/watch';
import { LocalizeController } from '../../utilities/localize';
import '../icon/icon';
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
 * @event sl-label-change - Emitted when the option's label changes. For performance reasons, this event is only emitted
 *  when the default slot's `slotchange` event is triggered. It will not fire when the label is first set.
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

  private cachedTextLabel: string;
  private readonly localize = new LocalizeController(this);

  @query('.option__label') defaultSlot: HTMLSlotElement;

  /** The option's value. When selected, the containing form control will receive this value. */
  @property() value = '';

  /** Draws the option in a current state, meaning the user has keyed into it but hasn't selected it yet. */
  @property({ type: Boolean, reflect: true }) current = false;

  /** Draws the option in a selected state. */
  @property({ type: Boolean, reflect: true }) selected = false;

  /** Draws the option in a disabled state, preventing selection. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'option');
    this.setAttribute('aria-selected', 'false');
  }

  @watch('disabled')
  handleDisabledChange() {
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
  }

  @watch('selected')
  handleSelectedChange() {
    this.setAttribute('aria-selected', this.selected ? 'true' : 'false');
  }

  handleDefaultSlotChange() {
    const textLabel = getTextContent(this.defaultSlot);

    // Ignore the first time the label is set
    if (typeof this.cachedTextLabel === 'undefined') {
      this.cachedTextLabel = textLabel;
      return;
    }

    if (textLabel !== this.cachedTextLabel) {
      this.cachedTextLabel = textLabel;
      this.emit('sl-label-change');
    }
  }

  render() {
    return html`
      <div
        class=${classMap({
          option: true,
          'option--current': this.current,
          'option--selected': this.selected
        })}
      >
        <span part="checked-icon" class="option__check">
          <sl-icon name="check" library="system" aria-hidden="true"></sl-icon>
        </span>
        <slot name="prefix" class="option__prefix"></slot>
        <slot class="option__label" @slotchange=${this.handleDefaultSlotChange}></slot>
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
