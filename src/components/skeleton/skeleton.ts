import { classMap, html, Shoemaker } from '@shoelace-style/shoemaker';
import styles from 'sass:./skeleton.scss';

/**
 * @since 2.0
 * @status stable
 *
 * @part base - The component's base wrapper.
 * @part indicator - The skeleton's indicator which is responsible for its color and animation.
 */
export default class SlSkeleton extends Shoemaker {
  static tag = 'sl-skeleton';
  static props = ['effect'];
  static styles = styles;

  /** Determines which effect the skeleton will use. */
  effect: 'pulse' | 'sheen' | 'none' = 'sheen';

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
        <div part="indicator" class="skeleton__indicator" />
      </div>
    `;
  }
}
