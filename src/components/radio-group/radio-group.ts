import { html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import '~/components/button-group/button-group';
import type SlRadio from '~/components/radio/radio';
import styles from './radio-group.styles';

const RADIO_CHILDREN = ['sl-radio', 'sl-radio-button'];

/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-button-group
 *
 * @slot - The default slot where radio controls are placed.
 * @slot label - The radio group label. Required for proper accessibility. Alternatively, you can use the label prop.
 *
 * @csspart base - The component's internal wrapper.
 * @csspart label - The radio group's label.
 * @csspart button-group - The button group that wraps radio buttons.
 * @csspart button-group__base - The button group's `base` part.
 */
@customElement('sl-radio-group')
export default class SlRadioGroup extends LitElement {
  static styles = styles;

  @query('slot:not([name])') defaultSlot: HTMLSlotElement;

  @state() hasButtonGroup = false;

  /** The radio group label. Required for proper accessibility. Alternatively, you can use the label slot. */
  @property() label = '';

  /** Shows the fieldset and legend that surrounds the radio group. */
  @property({ type: Boolean, attribute: 'fieldset' }) fieldset = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'radiogroup');
  }

  getAllRadios() {
    return [...this.querySelectorAll(RADIO_CHILDREN.join(','))].filter(el =>
      RADIO_CHILDREN.includes(el.tagName.toLowerCase())
    ) as SlRadio[];
  }

  handleRadioClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const checkedRadio = target.closest(RADIO_CHILDREN.map(selector => `${selector}:not([disabled])`).join(','));

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

      event.preventDefault();
    }
  }

  handleSlotChange() {
    const radios = this.getAllRadios();
    const checkedRadio = radios.find(radio => radio.checked);

    this.hasButtonGroup = !!radios.find(radio => radio.tagName.toLowerCase() === 'sl-radio-button');

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
    const defaultSlot = html`
      <slot @click=${this.handleRadioClick} @keydown=${this.handleKeyDown} @slotchange=${this.handleSlotChange}></slot>
    `;

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
        ${this.hasButtonGroup
          ? html`<sl-button-group part="button-group">${defaultSlot}</sl-button-group>`
          : defaultSlot}
      </fieldset>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-radio-group': SlRadioGroup;
  }
}
