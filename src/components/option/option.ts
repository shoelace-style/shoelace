import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import ShoelaceElement from '../../internal/shoelace-element';
import { getTextContent } from '../../internal/slot';
import { watch } from '../../internal/watch';
import { LocalizeController } from '../../utilities/localize';
import '../icon/icon';
import styles from './option.styles';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Options define the selectable items within various form controls such as [select](/components/select).
 *
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon
 *
 * @event sl-label-change - Emitted when the option's label changes. For performance reasons, this event is only emitted
 *  when the default slot's `slotchange` event is triggered. It will not fire when the label is first set. Useful for
 *  parent controls that want to observe label changes without attaching an expensive mutation observer.
 *
 * @slot - The option's label.
 * @slot prefix - Used to prepend an icon or similar element to the menu item.
 * @slot suffix - Used to append an icon or similar element to the menu item.
 *
 * @csspart checked-icon - The checked icon, an `<sl-icon>` element.
 * @csspart base - The component's base wrapper.
 * @csspart label - The option's label.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart suffix - The container that wraps the suffix.
 */
@customElement('sl-option')
export default class SlOption extends ShoelaceElement {
  static styles: CSSResultGroup = styles;

  private cachedTextLabel: string;
  // @ts-expect-error -- Controller is currently unused
  private readonly localize = new LocalizeController(this);

  @state() current = false; // the user has keyed into the option, but hasn't selected it yet (shows a highlight)
  @state() selected = false; // the option is selected and has aria-selected="true"

  @query('.option__label') defaultSlot: HTMLSlotElement;

  /** The option's value. When selected, the containing form control will receive this value. */
  @property() value = '';

  /** Draws the option in a disabled state, preventing selection. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'option');
    this.setAttribute('aria-selected', 'false');
  }

  /** Returns a plain text label based on the option's content. */
  getTextLabel() {
    return this.textContent ?? '';
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
        part="base"
        class=${classMap({
          option: true,
          'option--current': this.current,
          'option--disabled': this.disabled,
          'option--selected': this.selected
        })}
      >
        <sl-icon part="checked-icon" class="option__check" name="check" library="system" aria-hidden="true"></sl-icon>
        <slot part="prefix" name="prefix" class="option__prefix"></slot>
        <slot part="label" class="option__label" @slotchange=${this.handleDefaultSlotChange}></slot>
        <slot part="suffix" name="suffix" class="option__suffix"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-option': SlOption;
  }
}
