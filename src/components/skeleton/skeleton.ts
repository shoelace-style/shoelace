import { LitElement, customElement, html, property, unsafeCSS } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import styles from 'sass:./skeleton.scss';

/**
 * @since 2.0
 * @status stable
 *
 * @part base - The component's base wrapper.
 * @part indicator - The skeleton's indicator which is responsible for its color and animation.
 */
@customElement('sl-skeleton')
export class SlSkeleton extends LitElement {
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
