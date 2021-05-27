import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit-html/directives/class-map';
import styles from 'sass:./skeleton.scss';

/**
 * @since 2.0
 * @status stable
 *
 * @part base - The component's base wrapper.
 * @part indicator - The skeleton's indicator which is responsible for its color and animation.
 *
 * @customProperty --border-radius - The skeleton's border radius.
 * @customProperty --color - The color of the skeleton.
 * @customProperty --sheen-color - The sheen color when the skeleton is in its loading state.
 */
@customElement('sl-skeleton')
export default class SlSkeleton extends LitElement {
  static styles = unsafeCSS(styles);

  /** Determines which effect the skeleton will use. */
  @property() effect: 'pulse' | 'sheen' | 'none' = 'sheen';

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          skeleton: true,
          'skeleton--pulse': this.effect === 'pulse',
          'skeleton--sheen': this.effect === 'sheen'
        })}
        aria-busy="true"
        aria-live="polite"
      >
        <div part="indicator" class="skeleton__indicator"></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-skeleton': SlSkeleton;
  }
}
