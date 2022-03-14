import { html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import type SlRadio from '~/components/radio/radio';
import { emit } from '~/internal/event';
import styles from './radio-group.styles';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The default slot where radio controls are placed.
 * @slot label - The radio group label. Required for proper accessibility. Alternatively, you can use the label prop.
 *
 * @csspart base - The component's internal wrapper.
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

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'radiogroup');
  }

  getAllRadios() {
    return this.defaultSlot
      .assignedElements({ flatten: true })
      .filter(el => el.tagName.toLowerCase() === 'sl-radio') as SlRadio[];
  }

  handleRadioClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const checkedRadio = target.closest('sl-radio');

    if (checkedRadio) {
      const radios = this.getAllRadios();
      radios.forEach(radio => {
        radio.checked = radio === checkedRadio;
        radio.input.tabIndex = radio === checkedRadio ? 0 : -1;
      });
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      const radios = this.getAllRadios().filter(radio => !radio.disabled);
      const checkedRadio = radios.find(radio => radio.checked) ?? radios[0];
      const incr = ['ArrowUp', 'ArrowLeft'].includes(event.key) ? -1 : 1;
      let index = radios.indexOf(checkedRadio) + incr;
      if (index < 0) {
        index = radios.length - 1;
      }
      if (index > radios.length - 1) {
        index = 0;
      }

      this.getAllRadios().forEach(radio => {
        radio.checked = false;
        radio.input.tabIndex = -1;
      });

      radios[index].focus();
      radios[index].checked = true;
      radios[index].input.tabIndex = 0;

      emit(radios[index], 'sl-change');

      event.preventDefault();
    }
  }

  handleSlotChange() {
    const radios = this.getAllRadios();
    const checkedRadio = radios.find(radio => radio.checked);

    radios.forEach(radio => {
      radio.setAttribute('role', 'radio');
      radio.input.tabIndex = -1;
    });

    if (checkedRadio) {
      checkedRadio.input.tabIndex = 0;
    } else if (radios.length > 0) {
      radios[0].input.tabIndex = 0;
    }
  }

  render() {
    return html`
      <fieldset
        part="base"
        class=${classMap({
          'radio-group': true,
          'radio-group--has-fieldset': this.fieldset
        })}
      >
        <legend part="label" class="radio-group__label">
          <slot name="label">${this.label}</slot>
        </legend>
        <slot
          @click=${this.handleRadioClick}
          @keydown=${this.handleKeyDown}
          @slotchange=${this.handleSlotChange}
        ></slot>
      </fieldset>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-radio-group': SlRadioGroup;
  }
}
