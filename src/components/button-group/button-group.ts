import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import styles from 'sass:./button-group.scss';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - One or more `<sl-button>` elements to display in the button group.
 *
 * @csspart base - The component's base wrapper.
 */
@customElement('sl-button-group')
export default class SlButtonGroup extends LitElement {
  static styles = unsafeCSS(styles);

  @query('slot') defaultSlot: HTMLSlotElement;

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

    slottedElements.map(el => {
      const index = slottedElements.indexOf(el);
      const button = findButton(el);

      if (button) {
        button.classList.add('sl-button-group__button');
        button.classList.toggle('sl-button-group__button--first', index === 0);
        button.classList.toggle('sl-button-group__button--inner', index > 0 && index < slottedElements.length - 1);
        button.classList.toggle('sl-button-group__button--last', index === slottedElements.length - 1);
      }
    });
  }

  render() {
    return html`
      <div
        part="base"
        class="button-group"
        role="group"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
}

function findButton(el: HTMLElement) {
  return el.tagName.toLowerCase() === 'sl-button' ? el : el.querySelector('sl-button');
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-button-group': SlButtonGroup;
  }
}
