import { LitElement, html, property, query, unsafeCSS } from 'lit-element';
import styles from 'sass:./responsive-embed.scss';
import { tag, watch } from '../../internal/decorators';

/**
 * @since 2.0
 * @status stable
 *
 * @part base - The component's base wrapper.
 */
@tag('sl-responsive-embed')
export default class SlResponsiveEmbed extends LitElement {
  static styles = unsafeCSS(styles);

  @query('.responsive-embed') base: HTMLElement;

  /**
   * The aspect ratio of the embedded media in the format of `width:height`, e.g. `16:9`, `4:3`, or `1:1`. Ratios not in
   * this format will be ignored.
   */
  @property({ attribute: 'aspect-ratio' }) aspectRatio = '16:9';

  @watch('aspectRatio')
  updateAspectRatio() {
    const split = this.aspectRatio.split(':');
    const x = parseInt(split[0]);
    const y = parseInt(split[1]);

    this.base.style.paddingBottom = x && y ? `${(y / x) * 100}%` : '';
  }

  render() {
    return html`
      <div part="base" class="responsive-embed">
        <slot @slotchange=${() => this.updateAspectRatio()}></slot>
      </div>
    `;
  }
}
