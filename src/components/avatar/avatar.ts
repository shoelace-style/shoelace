import { classMap, html, Shoemaker } from '@shoelace-style/shoemaker';
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
export default class SlAvatar extends Shoemaker {
  static tag = 'sl-avatar';
  static props = ['hasError', 'image', 'alt', 'initials', 'shape'];
  static reflect = ['shape'];
  static styles = styles;

  private hasError = false;

  /** The image source to use for the avatar. */
  image = '';

  /** Alternative text for the image. */
  alt = '';

  /** Initials to use as a fallback when no image is available (1-2 characters max recommended). */
  initials = '';

  /** The shape of the avatar. */
  shape: 'circle' | 'square' | 'rounded' = 'circle';

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
        role="image"
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
              <img part="image" class="avatar__image" src="${this.image}" onerror="${() => (this.hasError = true)}" />
            `
          : ''}
      </div>
    `;
  }
}
