import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import componentStyles from '../../styles/component.styles.js';
import ShoelaceElement from '../../internal/shoelace-element.js';
import styles from './skeleton.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Skeletons are used to provide a visual representation of where content will eventually be drawn.
 * @documentation https://shoelace.style/components/skeleton
 * @status stable
 * @since 2.0
 *
 * @csspart base - The component's base wrapper.
 * @csspart indicator - The skeleton's indicator which is responsible for its color and animation.
 *
 * @cssproperty --border-radius - The skeleton's border radius.
 * @cssproperty --color - The color of the skeleton.
 * @cssproperty --sheen-color - The sheen color when the skeleton is in its loading state.
 */
export default class SlSkeleton extends ShoelaceElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  /** Determines which effect the skeleton will use. */
  @property() effect: 'pulse' | 'sheen' | 'none' = 'none';

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          skeleton: true,
          'skeleton--pulse': this.effect === 'pulse',
          'skeleton--sheen': this.effect === 'sheen'
        })}
      >
        <div part="indicator" class="skeleton__indicator"></div>
      </div>
    `;
  }
}
