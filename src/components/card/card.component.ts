import { classMap } from 'lit/directives/class-map.js';
import { HasSlotController } from '../../internal/slot.js';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import componentStyles from '../../styles/component.styles.js';
import ShoelaceElement from '../../internal/shoelace-element.js';
import styles from './card.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Cards can be used to group related subjects in a container.
 * @documentation https://shoelace.style/components/card
 * @status stable
 * @since 2.0
 * @pattern stable
 * @figma ready
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
export default class SlCard extends ShoelaceElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  private readonly hasSlotController = new HasSlotController(this, 'footer', 'header', 'image');

  /** Option to remove the card's default box shadow. */
  @property({ type: Boolean, reflect: true }) noShadow = false;

  /** Option to apply a flex/space-between layout for header elements. Useful for displaying a header with a title on the left and action buttons on the right. */
  @property({ type: Boolean, reflect: true }) actionHeader = false;

  /** Option to apply a flex/flex-end layout to footer elements. Useful for displaying a card footer with one or more buttons. */
  @property({ type: Boolean, reflect: true }) buttonFooter = false;

  /** Option to reduce spacing and remove the borders between the header, body, and footer. */
  @property({ type: Boolean, reflect: true }) compact = false;

  /** Option to show the card in a loading state. */
  @property({ type: Boolean, reflect: true }) loading = false;

  /** Option to style the card for an empty state. */
  @property({ type: Boolean, reflect: true }) emptyState = false;

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          card: true,
          'card--has-footer': this.hasSlotController.test('footer'),
          'card--has-image': this.hasSlotController.test('image'),
          'card--has-header': this.hasSlotController.test('header'),
          'card--no-shadow': this.noShadow,
          'card--action-header': this.actionHeader,
          'card--button-footer': this.buttonFooter,
          'card--compact': this.compact,
          'card--loading': this.loading,
          'card--empty-state': this.emptyState
        })}
      >
        <slot name="image" part="image" class="card__image"></slot>
        <slot name="header" part="header" class="card__header"></slot>
        <slot part="body" class="card__body"></slot>
        <slot name="footer" part="footer" class="card__footer"></slot>

        ${this.loading
          ? html`<div class="spinner-overlay">
        <sl-spinner style="position: absolute" size="x-large">
      </div>`
          : ''}
      </div>
    `;
  }
}
