import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import styles from './responsive-media.styles';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The element to receive the aspect ratio. Should be a replaced element, such as `<img>`, `<iframe>`, or `<video>`.
 */
@customElement('sl-responsive-media')
export default class SlResponsiveMedia extends LitElement {
  static styles = styles;

  /**
   * The aspect ratio of the embedded media in the format of `width:height`, e.g. `16:9`, `4:3`, or `1:1`. Ratios not in
   * this format will be ignored.
   */
  @property({ attribute: 'aspect-ratio' }) aspectRatio = '16:9';

  /** Determines how content will be resized to fit its container. */
  @property() fit: 'cover' | 'contain' = 'cover';

  render() {
    const split = this.aspectRatio.split(':');
    const x = parseFloat(split[0]);
    const y = parseFloat(split[1]);
    const paddingBottom = x && y ? `${(y / x) * 100}%` : '0';

    return html`
      <div
        class=${classMap({
          'responsive-media': true,
          'responsive-media--cover': this.fit === 'cover',
          'responsive-media--contain': this.fit === 'contain'
        })}
        style="padding-bottom: ${paddingBottom}"
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-responsive-media': SlResponsiveMedia;
  }
}
