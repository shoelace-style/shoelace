import { html, Shoemaker } from '@shoelace-style/shoemaker';
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
export default class SlTabPanel extends Shoemaker {
  static tag = 'sl-tab-panel';
  static props = ['name', 'active'];
  static reflect = ['name', 'active'];
  static styles = styles;

  private componentId = `tab-panel-${++id}`;

  /** The tab panel's name. */
  name = '';

  /** When true, the tab panel will be shown. */
  active = false;

  onReady() {
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
        <slot />
      </div>
    `;
  }
}
