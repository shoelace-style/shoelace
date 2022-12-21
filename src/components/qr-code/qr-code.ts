import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import QrCreator from 'qr-creator';
import ShoelaceElement from '../../internal/shoelace-element';
import { watch } from '../../internal/watch';
import styles from './qr-code.styles';
import type { CSSResultGroup } from 'lit';

/**
 * @since 2.0
 * @status stable
 *
 * @csspart base - The component's base wrapper.
 */
@customElement('sl-qr-code')
export default class SlQrCode extends ShoelaceElement {
  static styles: CSSResultGroup = styles;

  @query('canvas') canvas: HTMLElement;

  /** The QR code's value. */
  @property() value = '';

  /** The label for assistive devices to announce. If unspecified, the value will be used instead. */
  @property() label = '';

  /** The size of the QR code, in pixels. */
  @property({ type: Number }) size = 128;

  /** The fill color. This can be any valid CSS color, but not a CSS custom property. */
  @property() fill = 'black';

  /** The background color. This can be any valid CSS color or `transparent`. It cannot be a CSS custom property. */
  @property() background = 'white';

  /** The edge radius of each module. Must be between 0 and 0.5. */
  @property({ type: Number }) radius = 0;

  /** The level of error correction to use. [Learn more](https://www.qrcode.com/en/about/error_correction.html) */
  @property({ attribute: 'error-correction' }) errorCorrection: 'L' | 'M' | 'Q' | 'H' = 'H';

  firstUpdated() {
    this.generate();
  }

  @watch('background')
  @watch('errorCorrection')
  @watch('fill')
  @watch('radius')
  @watch('size')
  @watch('value')
  generate() {
    if (!this.hasUpdated) {
      return;
    }

    QrCreator.render(
      {
        text: this.value,
        radius: this.radius,
        ecLevel: this.errorCorrection,
        fill: this.fill,
        background: null,
        // We draw the canvas larger and scale its container down to avoid blurring on high-density displays
        size: this.size * 2
      },
      this.canvas
    );
  }

  render() {
    return html`
      <canvas
        part="base"
        class="qr-code"
        role="img"
        aria-label=${this.label.length > 0 ? this.label : this.value}
        style=${styleMap({
          width: `${this.size}px`,
          height: `${this.size}px`
        })}
      ></canvas>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-qr-code': SlQrCode;
  }
}
