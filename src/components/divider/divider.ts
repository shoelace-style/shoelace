import { customElement, property } from 'lit/decorators.js';
import { watch } from '../../internal/watch';
import ShoelaceElement from '../../internal/shoelace-element';
import styles from './divider.styles';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Dividers are used to visually separate or group elements.
 * @documentation https://shoelace.style/components/divider
 * @status stable
 * @since 2.0
 *
 * @cssproperty --color - The color of the divider.
 * @cssproperty --width - The width of the divider.
 * @cssproperty --spacing - The spacing of the divider.
 */
@customElement('sl-divider')
export default class SlDivider extends ShoelaceElement {
  static styles: CSSResultGroup = styles;

  /** Draws the divider in a vertical orientation. */
  @property({ type: Boolean, reflect: true }) vertical = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'separator');
  }

  @watch('vertical')
  handleVerticalChange() {
    this.setAttribute('aria-orientation', this.vertical ? 'vertical' : 'horizontal');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-divider': SlDivider;
  }
}
