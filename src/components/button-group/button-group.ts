import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import ShoelaceElement from '../../internal/shoelace-element';
import styles from './button-group.styles';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Button groups can be used to group related buttons into sections.
 *
 * @since 2.0
 * @status stable
 *
 * @slot - One or more `<sl-button>` elements to display in the button group.
 *
 * @csspart base - The component's internal wrapper.
 */
@customElement('sl-button-group')
export default class SlButtonGroup extends ShoelaceElement {
  static styles: CSSResultGroup = styles;

  @query('slot') defaultSlot: HTMLSlotElement;

  @state() disableRole = false;

  /** A label to use for the button group's `aria-label` attribute. */
  @property() label = '';

  handleFocus(event: CustomEvent) {
    const button = findButton(event.target as HTMLElement);
    button?.classList.add('sl-button-group__button--focus');
  }

  handleBlur(event: CustomEvent) {
    const button = findButton(event.target as HTMLElement);
    button?.classList.remove('sl-button-group__button--focus');
  }

  handleMouseOver(event: CustomEvent) {
    const button = findButton(event.target as HTMLElement);
    button?.classList.add('sl-button-group__button--hover');
  }

  handleMouseOut(event: CustomEvent) {
    const button = findButton(event.target as HTMLElement);
    button?.classList.remove('sl-button-group__button--hover');
  }

  handleSlotChange() {
    const slottedElements = [...this.defaultSlot.assignedElements({ flatten: true })] as HTMLElement[];

    slottedElements.forEach(el => {
      const index = slottedElements.indexOf(el);
      const button = findButton(el);

      if (button !== null) {
        button.classList.add('sl-button-group__button');
        button.classList.toggle('sl-button-group__button--first', index === 0);
        button.classList.toggle('sl-button-group__button--inner', index > 0 && index < slottedElements.length - 1);
        button.classList.toggle('sl-button-group__button--last', index === slottedElements.length - 1);
        button.classList.toggle('sl-button-group__button--radio', button.tagName.toLowerCase() === 'sl-radio-button');
      }
    });
  }

  render() {
    // eslint-disable-next-line lit-a11y/mouse-events-have-key-events -- focusout & focusin support bubbling whereas focus & blur do not which is necessary here
    return html`
      <div
        part="base"
        class="button-group"
        role="${this.disableRole ? 'presentation' : 'group'}"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        <slot @slotchange=${this.handleSlotChange} role="none"></slot>
      </div>
    `;
  }
}

function findButton(el: HTMLElement) {
  const children = ['sl-button', 'sl-radio-button'];
  return children.includes(el.tagName.toLowerCase()) ? el : el.querySelector(children.join(','));
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-button-group': SlButtonGroup;
  }
}
