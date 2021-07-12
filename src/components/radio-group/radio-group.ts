import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit-html/directives/class-map';
import type SlRadio from '../radio/radio';
import styles from './radio-group.styles';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The default slot where radio controls are placed.
 * @slot label - The radio group label. Required for proper accessibility. Alternatively, you can use the label prop.
 *
 * @csspart base - The component's base wrapper.
 * @csspart label - The radio group label.
 */
@customElement('sl-radio-group')
export default class SlRadioGroup extends LitElement {
  static styles = styles;

  @query('slot:not([name])') defaultSlot: HTMLSlotElement;

  /** The radio group label. Required for proper accessibility. Alternatively, you can use the label slot. */
  @property() label = '';

  /** Hides the fieldset and legend that surrounds the radio group. The label will still be read by screen readers. */
  @property({ type: Boolean, attribute: 'no-fieldset' }) noFieldset = false;

  handleFocusIn() {
    // When focusing into the fieldset, make sure it lands on the checked radio
    const checkedRadio = [...this.defaultSlot.assignedElements({ flatten: true })].find(
      el => el.tagName.toLowerCase() === 'sl-radio' && (el as SlRadio).checked
    ) as SlRadio;

    if (checkedRadio) {
      checkedRadio.focus();
    }
  }

  render() {
    return html`
      <fieldset
        part="base"
        class=${classMap({
          'radio-group': true,
          'radio-group--no-fieldset': this.noFieldset
        })}
        role="radiogroup"
        @focusin=${this.handleFocusIn}
      >
        <legend part="label" class="radio-group__label">
          <slot name="label">${this.label}</slot>
        </legend>
        <slot></slot>
      </fieldset>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-radio-group': SlRadioGroup;
  }
}
