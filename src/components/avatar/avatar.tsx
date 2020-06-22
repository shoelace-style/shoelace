import { Component, Host, Prop, State, h } from '@stencil/core';

/**
 * @since 1.0.0
 * @status ready
 *
 * @slot icon - The default icon to use when no image or initials are present.
 */

@Component({
  tag: 'sl-avatar',
  styleUrl: 'avatar.scss',
  shadow: true
})
export class Avatar {
  constructor() {
    this.handleImageError = this.handleImageError.bind(this);
  }

  @State() hasError = false;

  /** The image source to use for the avatar. */
  @Prop() image = '';

  /** Alternative text for the image. */
  @Prop() alt = '';

  /** Initials to use as a fallback when no image is available (1-2 characters max recommended). */
  @Prop() initials = '';

  /** Initials to use as a fallback when no image is available (1-2 characters max recommended). */
  @Prop({ reflect: true }) shape: 'circle' | 'square' = 'circle';

  handleImageError() {
    this.hasError = true;
  }

  render() {
    return (
      <Host role="image" aria-label={this.alt}>
        {!this.initials && (
          <div id="icon">
            <slot name="icon">
              <sl-icon name="person-fill" />
            </slot>
          </div>
        )}

        {this.initials && <div id="initials">{this.initials}</div>}

        {this.image && !this.hasError && <img id="image" src={this.image} onError={this.handleImageError} />}
      </Host>
    );
  }
}
