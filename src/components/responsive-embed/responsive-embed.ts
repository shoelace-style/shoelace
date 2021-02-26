import { html, Shoemaker } from '@shoelace-style/shoemaker';
import styles from 'sass:./responsive-embed.scss';

/**
 * @since 2.0
 * @status stable
 *
 * @part base - The component's base wrapper.
 */
export default class SlResponsiveEmbed extends Shoemaker {
  static tag = 'sl-responsive-embed';
  static props = ['aspectRatio'];
  static styles = styles;

  private base: HTMLElement;

  /**
   * The aspect ratio of the embedded media in the format of `width:height`, e.g. `16:9`, `4:3`, or `1:1`. Ratios not in
   * this format will be ignored.
   */
  aspectRatio = '16:9';

  updateAspectRatio() {
    const split = this.aspectRatio.split(':');
    const x = parseInt(split[0]);
    const y = parseInt(split[1]);

    this.base.style.paddingBottom = x && y ? `${(y / x) * 100}%` : '';
  }

  watchAspectRatio() {
    this.updateAspectRatio();
  }

  render() {
    return html`
      <div ref=${(el: HTMLElement) => (this.base = el)} part="base" class="responsive-embed">
        <slot onslotchange=${() => this.updateAspectRatio()} />
      </div>
    `;
  }
}
