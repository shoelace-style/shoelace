import { classMap } from 'lit/directives/class-map.js';
import { customElement } from 'lit/decorators.js';
import { HasSlotController } from '../../internal/slot';
import { html } from 'lit';
import ShoelaceElement from '../../internal/shoelace-element';
import styles from './card.styles';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Cards can be used to group related subjects in a container.
 * @documentation https://shoelace.style/components/card
 * @status stable
 * @since 2.0
 *
 * @slot - The card's main content.
 * @slot header - An optional header for the card.
 * @slot footer - An optional footer for the card.
 * @slot image - An optional image to render at the start of the card.
 *
 * @csspart base - The component's base wrapper.
 * @csspart image - The container that wraps the card's image.
 * @csspart header - The container that wraps the card's header.
 * @csspart body - The container that wraps the card's main content.
 * @csspart footer - The container that wraps the card's footer.
 *
 * @cssproperty --border-color - The card's border color, including borders that occur inside the card.
 * @cssproperty --border-radius - The border radius for the card's edges.
 * @cssproperty --border-width - The width of the card's borders.
 * @cssproperty --padding - The padding to use for the card's sections.
 */
@customElement('sl-card')
export default class SlCard extends ShoelaceElement {
  static styles: CSSResultGroup = styles;

  private readonly hasSlotController = new HasSlotController(this, 'footer', 'header', 'image');

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          card: true,
          'card--has-footer': this.hasSlotController.test('footer'),
          'card--has-image': this.hasSlotController.test('image'),
          'card--has-header': this.hasSlotController.test('header')
        })}
      >
        <slot name="image" part="image" class="card__image"></slot>
        <slot name="header" part="header" class="card__header"></slot>
        <slot part="body" class="card__body"></slot>
        <slot name="footer" part="footer" class="card__footer"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-card': SlCard;
  }
}
