import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit-html/directives/class-map';
import styles from 'sass:./radio-group.scss';

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
  static styles = unsafeCSS(styles);

  /** The radio group label. Required for proper accessibility. Alternatively, you can use the label slot. */
  @property() label = '';

  /** Hides the fieldset and legend that surrounds the radio group. The label will still be read by screen readers. */
  @property({ type: Boolean, attribute: 'no-fieldset' }) noFieldset = false;

  render() {
    return html`
      <fieldset
        part="base"
        class=${classMap({
          'radio-group': true,
          'radio-group--no-fieldset': this.noFieldset
        })}
        role="radiogroup"
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
