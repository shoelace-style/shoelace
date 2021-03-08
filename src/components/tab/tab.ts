import { LitElement, html, property, query, unsafeCSS } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { event, EventEmitter, tag } from '../../internal/decorators';
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
 */
@tag('sl-tab')
export class SlTab extends LitElement {
  static styles = unsafeCSS(styles);

  @query('.tab') tab: HTMLElement;

  private componentId = `tab-${++id}`;

  /** The name of the tab panel the tab will control. The panel must be located in the same tab group. */
  @property() panel = '';

  /** Draws the tab in an active state. */
  @property({ type: Boolean, reflect: true }) active = false;

  /** Makes the tab closable and shows a close icon. */
  @property({ type: Boolean }) closable = false;

  /** Draws the tab in a disabled state. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Emitted when the tab is closable and the close button is activated. */
  @event('sl-close') slClose: EventEmitter<void>;

  /** Sets focus to the tab. */
  setFocus(options?: FocusOptions) {
    this.tab.focus(options);
  }

  /** Removes focus from the tab. */
  removeFocus() {
    this.tab.blur();
  }

  handleCloseClick() {
    this.slClose.emit();
  }

  render() {
    // If the user didn't provide an ID, we'll set one so we can link tabs and tab panels with aria labels
    this.id = this.id || this.componentId;

    return html`
      <div
        part="base"
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
        <slot></slot>
        ${this.closable
          ? html`
              <sl-icon-button
                name="x"
                exportparts="base:close-button"
                class="tab__close-button"
                @click=${this.handleCloseClick}
                tabindex="-1"
                aria-hidden="true"
              ></sl-icon-button>
            `
          : ''}
      </div>
    `;
  }
}
