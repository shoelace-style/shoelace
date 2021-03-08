import { LitElement, html, property, unsafeCSS } from 'lit-element';
import { tag } from '../../internal/decorators';
import styles from 'sass:./tab-panel.scss';

let id = 0;

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The tab panel's content.
 *
 * @part base - The component's base wrapper.
 */
@tag('sl-tab-panel')
export class SlTabPanel extends LitElement {
  static styles = unsafeCSS(styles);

  private componentId = `tab-panel-${++id}`;

  /** The tab panel's name. */
  @property() name = '';

  /** When true, the tab panel will be shown. */
  @property({ type: Boolean, reflect: true }) active = false;

  firstUpdated() {
    this.id = this.id || this.componentId;
  }

  render() {
    this.style.display = this.active ? 'block' : 'none';

    return html`
      <div
        part="base"
        class="tab-panel"
        role="tabpanel"
        aria-selected=${this.active ? 'true' : 'false'}
        aria-hidden=${this.active ? 'false' : 'true'}
      >
        <slot></slot>
      </div>
    `;
  }
}
