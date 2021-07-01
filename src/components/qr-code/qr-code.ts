import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { styleMap } from 'lit-html/directives/style-map';
import { watch } from '../../internal/watch';
import QrCreator from 'qr-creator';
import styles from 'sass:./qr-code.scss';

/**
 * @since 2.0
 * @status experimental
 *
 * @csspart base - The component's base wrapper.
 */
@customElement('sl-qr-code')
export default class SlQrCode extends LitElement {
  static styles = unsafeCSS(styles);

  @query('canvas') canvas: HTMLElement;

  /** The QR code's value. */
  @property() value = '';

  /** The label used when screen readers announce the code. If unspecified, the value will be used. */
  @property() label = '';

  /** The size of the code's overall square in pixels. */
  @property({ type: Number }) size = 128;

  /** The fill color. This can be any valid CSS color, but not a CSS custom property. */
  @property() fill = '#000';

  /** The background color. This can be any valid CSS color or `transparent`, but not a CSS custom property. */
  @property() background = '#fff';

  /** The edge radius of each module. Must be between 0 and 0.5. */
  @property({ type: Number }) radius = 0;

  /** The level of error correction to use. */
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
        background: this.background === 'transparent' ? null : this.background,
        // We draw the canvas larger and scale its container down to avoid blurring on high-density displays
        size: this.size * 2
      },
      this.canvas
    );
  }

  render() {
    return html`
      <div
        class="qr-code"
        part="base"
        style=${styleMap({
          width: `${this.size}px`,
          height: `${this.size}px`
        })}
      >
        <canvas role="img" aria-label=${this.label || this.value}></canvas>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-qr-code': SlQrCode;
  }
}
