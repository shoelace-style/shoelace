import { classMap, html, Shoemaker } from '@shoelace-style/shoemaker';
import styles from 'sass:./tab.scss';

let id = 0;

/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon-button
 *
 * @slot - The tab's label.
 *
 * @part base - The component's base wrapper.
 * @part close-button - The close button, which is the icon button's base wrapper.
 *
 * @emit sl-close - Emitted when the tab is closable and the close button is activated.
 */
export default class SlTab extends Shoemaker {
  static tag = 'sl-tab';
  static props = ['panel', 'active', 'closable', 'disabled'];
  static reflect = ['panel', 'active', 'closable', 'disabled'];
  static styles = styles;

  private componentId = `tab-${++id}`;
  private tab: HTMLElement;

  /** The name of the tab panel the tab will control. The panel must be located in the same tab group. */
  panel = '';

  /** Draws the tab in an active state. */
  active = false;

  /** Makes the tab closable and shows a close icon. */
  closable = false;

  /** Draws the tab in a disabled state. */
  disabled = false;

  /** Sets focus to the tab. */
  setFocus(options?: FocusOptions) {
    this.tab.focus(options);
  }

  /** Removes focus from the tab. */
  removeFocus() {
    this.tab.blur();
  }

  handleCloseClick() {
    this.emit('sl-close');
  }

  render() {
    // If the user didn't provide an ID, we'll set one so we can link tabs and tab panels with aria labels
    this.id = this.id || this.componentId;

    return html`
      <div
        part="base"
        ref=${(el: HTMLElement) => (this.tab = el)}
        class=${classMap({
          tab: true,
          'tab--active': this.active,
          'tab--closable': this.closable,
          'tab--disabled': this.disabled
        })}
        role="tab"
        aria-disabled=${this.disabled ? 'true' : 'false'}
        aria-selected=${this.active ? 'true' : 'false'}
        tabindex=${this.disabled || !this.active ? '-1' : '0'}
      >
        <slot />
        ${this.closable
          ? html`
              <sl-icon-button
                name="x"
                exportparts="base:close-button"
                class="tab__close-button"
                onclick=${this.handleCloseClick.bind(this)}
                tabindex="-1"
                aria-hidden="true"
              />
            `
          : ''}
      </div>
    `;
  }
}
