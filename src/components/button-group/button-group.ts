import { customElement, property, query, state } from 'lit/decorators.js';
import { html } from 'lit';
import ShoelaceElement from '../../internal/shoelace-element';
import styles from './button-group.styles';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Button groups can be used to group related buttons into sections.
 * @documentation https://shoelace.style/components/button-group
 * @status stable
 * @since 2.0
 *
 * @slot - One or more `<sl-button>` elements to display in the button group.
 *
 * @csspart base - The component's base wrapper.
 */
@customElement('sl-button-group')
export default class SlButtonGroup extends ShoelaceElement {
  static styles: CSSResultGroup = styles;

  @query('slot') defaultSlot: HTMLSlotElement;

  @state() disableRole = false;

  /**
   * A label to use for the button group. This won't be displayed on the screen, but it will be announced by assistive
   * devices when interacting with the control and is strongly recommended.
   */
  @property() label = '';

  private handleFocus(event: CustomEvent) {
    const button = findButton(event.target as HTMLElement);
    button?.classList.add('sl-button-group__button--focus');
  }

  private handleBlur(event: CustomEvent) {
    const button = findButton(event.target as HTMLElement);
    button?.classList.remove('sl-button-group__button--focus');
  }

  private handleMouseOver(event: CustomEvent) {
    const button = findButton(event.target as HTMLElement);
    button?.classList.add('sl-button-group__button--hover');
  }

  private handleMouseOut(event: CustomEvent) {
    const button = findButton(event.target as HTMLElement);
    button?.classList.remove('sl-button-group__button--hover');
  }

  private handleSlotChange() {
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
    // eslint-disable-next-line lit-a11y/mouse-events-have-key-events
    return html`
      <slot
        part="base"
        class="button-group"
        role="${this.disableRole ? 'presentation' : 'group'}"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
        @slotchange=${this.handleSlotChange}
      ></slot>
    `;
  }
}

function findButton(el: HTMLElement) {
  const selector = 'sl-button, sl-radio-button';

  // The button could be the target element or a child of it (e.g. a dropdown or tooltip anchor)
  return el.closest(selector) ?? el.querySelector(selector);
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-button-group': SlButtonGroup;
  }
}
