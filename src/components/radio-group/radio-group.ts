import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
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

  /** Shows the fieldset and legend that surrounds the radio group. */
  @property({ type: Boolean, attribute: 'fieldset' }) fieldset = false;

  /** Indicates that a selection is required. */
  @property({ type: Boolean, reflect: true }) required = false;

  constructor() {
    super();
    this.addEventListener('sl-change', this.syncRadioButtons);
  }

  disconnectedCallback() {
    this.removeEventListener('sl-change', this.syncRadioButtons);
  }

  syncRadioButtons(event: CustomEvent) {
    const currentRadio = ev.target;
    const radios = this.getAllRadios().filter(el => !el.disabled && el !== currentRadio);
    radios.forEach(el => {
      el.checked = false;
    });
  }

  handleFocusIn() {
    // When tabbing into the fieldset, make sure it lands on the checked radio
    requestAnimationFrame(() => {
      const checkedRadio = [...this.defaultSlot.assignedElements({ flatten: true })].find(
        el => el.tagName.toLowerCase() === 'sl-radio' && (el as SlRadio).checked
      ) as SlRadio;

      if (checkedRadio) {
        checkedRadio.focus();
      }
    });
  }

  getAllRadios(): SlRadio[] {
    return [...this.querySelectorAll('sl-radio')];
  }

  handleKeyDown(event: KeyboardEvent) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      const radios = this.getAllRadios().filter(radio => !radio.disabled);
      const currentIndex = radios.findIndex(el => el.checked);

      const incr = ['ArrowUp', 'ArrowLeft'].includes(event.key) ? -1 : 1;
      let index = currentIndex + incr;
      if (index < 0) index = radios.length - 1;
      if (index > radios.length - 1) index = 0;

      this.getAllRadios().map(radio => (radio.checked = false));
      radios[index].focus();
      radios[index].checked = true;

      event.preventDefault();
    }
  }

  reportValidity() {
    const radios = [...(this.defaultSlot.assignedElements({ flatten: true }) as SlRadio[])];
    let isChecked = true;

    if (this.required && radios.length > 0) {
      isChecked = radios.some(el => el.checked);

      if (!isChecked) {
        // This is hacky...
        radios[0].required = true;

        setTimeout(() => {
          radios[0].reportValidity();
        }, 0);
      }
    }

    return isChecked;
  }

  render() {
    return html`
      <fieldset
        part="base"
        class=${classMap({
          'radio-group': true,
          'radio-group--has-fieldset': this.fieldset
        })}
        role="radiogroup"
        @focusin=${this.handleFocusIn}
        @keydown=${this.handleKeyDown}
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
