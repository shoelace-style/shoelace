import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { classMap } from 'lit-html/directives/class-map';
import styles from 'sass:./avatar.scss';

/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon
 *
 * @slot icon - The default icon to use when no image or initials are present.
 *
 * @part base - The component's base wrapper.
 * @part icon - The container that wraps the avatar icon.
 * @part initials - The container that wraps the avatar initials.
 * @part image - The avatar image.
 */
@customElement('sl-avatar')
export default class SlAvatar extends LitElement {
  static styles = unsafeCSS(styles);

  @state() private hasError = false;

  /** The image source to use for the avatar. */
  @property() image = '';

  /** Alternative text for the image. */
  @property() alt = '';

  /** Initials to use as a fallback when no image is available (1-2 characters max recommended). */
  @property() initials = '';

  /** The shape of the avatar. */
  @property({ reflect: true }) shape: 'circle' | 'square' | 'rounded' = 'circle';

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          avatar: true,
          'avatar--circle': this.shape === 'circle',
          'avatar--rounded': this.shape === 'rounded',
          'avatar--square': this.shape === 'square'
        })}
        aria-label=${this.alt}
      >
        ${this.initials
          ? html` <div part="initials" class="avatar__initials">${this.initials}</div> `
          : html`
              <div part="icon" class="avatar__icon">
                <slot name="icon">
                  <sl-icon name="person-fill"></sl-icon>
                </slot>
              </div>
            `}
        ${this.image && !this.hasError
          ? html`
              <img part="image" class="avatar__image" src="${this.image}" @error="${() => (this.hasError = true)}" />
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-avatar': SlAvatar;
  }
}
