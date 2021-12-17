import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './tab-panel.styles';

let id = 0;

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The tab panel's content.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --padding - The tab panel's padding.
 */
@customElement('sl-tab-panel')
export default class SlTabPanel extends LitElement {
  static styles = styles;

  private componentId = `sl-tab-panel-${++id}`;

  /** The tab panel's name. */
  @property({ reflect: true }) name = '';

  /** When true, the tab panel will be shown. */
  @property({ type: Boolean, reflect: true }) active = false;

  connectedCallback() {
    super.connectedCallback();
    this.id = this.id || this.componentId;
  }

  render() {
    this.style.display = this.active ? 'block' : 'none';

    return html`
      <div part="base" class="tab-panel" role="tabpanel" aria-hidden=${this.active ? 'false' : 'true'}>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-tab-panel': SlTabPanel;
  }
}
