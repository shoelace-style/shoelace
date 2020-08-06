import { Component, Element, State, h } from '@stencil/core';
import { hasSlot } from '../../utilities/slot';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The card's body.
 * @slot header - The card's header.
 * @slot footer - The card's footer.
 * @slot image - The card's image.
 *
 * @part base - The component's base wrapper.
 * @part image - The card's image, if present.
 * @part header - The card's header, if present.
 * @part body - The card's body.
 * @part footer - The card's footer, if present.
 */

@Component({
  tag: 'sl-card',
  styleUrl: 'card.scss',
  shadow: true
})
export class Card {
  @Element() host: HTMLSlCardElement;

  @State() hasFooter = false;
  @State() hasImage = false;
  @State() hasHeader = false;

  componentWillLoad() {
    this.updateSlots();
    this.host.shadowRoot.addEventListener('slotchange', this.updateSlots);
  }

  disconnectedCallback() {
    this.host.shadowRoot.removeEventListener('slotchange', this.updateSlots);
  }

  updateSlots() {
    this.hasFooter = hasSlot(this.host, 'footer');
    this.hasImage = hasSlot(this.host, 'image');
    this.hasHeader = hasSlot(this.host, 'header');
  }

  render() {
    return (
      <div
        part="base"
        class={{
          card: true,
          'card--has-footer': this.hasFooter,
          'card--has-image': this.hasImage,
          'card--has-header': this.hasHeader
        }}
      >
        <div part="image" class="card__image">
          <slot name="image" />
        </div>

        <div part="header" class="card__header">
          <slot name="header" />
        </div>

        <div part="body" class="card__body">
          <slot />
        </div>

        <div part="footer" class="card__footer">
          <slot name="footer" />
        </div>
      </div>
    );
  }
}
