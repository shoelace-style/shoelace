import { classMap, html, Shoemaker } from '@shoelace-style/shoemaker';
import styles from 'sass:./card.scss';
import { hasSlot } from '../../internal/slot';

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
export default class SlCard extends Shoemaker {
  static tag = 'sl-card';
  static props = ['hasFooter', 'hasImage', 'hasHeader'];
  static styles = styles;

  private hasFooter = false;
  private hasImage = false;
  private hasHeader = false;

  onConnect() {
    this.handleSlotChange();
  }

  handleSlotChange() {
    this.hasFooter = hasSlot(this, 'footer');
    this.hasImage = hasSlot(this, 'image');
    this.hasHeader = hasSlot(this, 'header');
  }

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          card: true,
          'card--has-footer': this.hasFooter,
          'card--has-image': this.hasImage,
          'card--has-header': this.hasHeader
        })}
      >
        <div part="image" class="card__image">
          <slot name="image" onslotchange=${this.handleSlotChange.bind(this)} />
        </div>

        <div part="header" class="card__header">
          <slot name="header" onslotchange=${this.handleSlotChange.bind(this)} />
        </div>

        <div part="body" class="card__body">
          <slot />
        </div>

        <div part="footer" class="card__footer">
          <slot name="footer" onslotchange=${this.handleSlotChange.bind(this)} />
        </div>
      </div>
    `;
  }
}
