import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators';
import { classMap } from 'lit-html/directives/class-map';
import { hasSlot } from '../../internal/slot';
import styles from 'sass:./card.scss';

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
@customElement('sl-card')
export default class SlCard extends LitElement {
  static styles = unsafeCSS(styles);

  @state() private hasFooter = false;
  @state() private hasImage = false;
  @state() private hasHeader = false;

  connectedCallback() {
    super.connectedCallback();
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
          <slot name="image" onslotchange=${this.handleSlotChange}></slot>
        </div>

        <div part="header" class="card__header">
          <slot name="header" onslotchange=${this.handleSlotChange}></slot>
        </div>

        <div part="body" class="card__body">
          <slot></slot>
        </div>

        <div part="footer" class="card__footer">
          <slot name="footer" onslotchange=${this.handleSlotChange}></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-card': SlCard;
  }
}
