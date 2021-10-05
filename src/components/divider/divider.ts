import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { watch } from '../../internal/watch';
import styles from './divider.styles';

/**
 * @since 2.0
 * @status stable
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --color - The color of the divider.
 * @cssproperty --spacing - The spacing between the divider and neighboring elements.
 * @cssproperty --width - The width of the divider.
 */
@customElement('sl-divider')
export default class SlDivider extends LitElement {
  static styles = styles;

  /** Draws the divider in a vertical orientation. */
  @property({ type: Boolean, reflect: true }) vertical = false;

  firstUpdated() {
    this.setAttribute('role', 'separator');
  }

  @watch('vertical')
  handleVerticalChange() {
    this.setAttribute('aria-orientation', this.vertical ? 'vertical' : 'horizontal');
  }

  render() {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-divider': SlDivider;
  }
}
