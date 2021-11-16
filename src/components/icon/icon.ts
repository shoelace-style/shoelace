import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { emit } from '../../internal/event';
import { watch } from '../../internal/watch';
import { getIconLibrary, watchIcon, unwatchIcon } from './library';
import { requestIcon } from './request';
import styles from './icon.styles';

const parser = new DOMParser();

/**
 * @since 2.0
 * @status stable
 *
 * @event sl-load - Emitted when the icon has loaded.
 * @event {{ status: number }} sl-error - Emitted when the icon fails to load due to an error.
 *
 * @csspart base - The component's base wrapper.
 */
@customElement('sl-icon')
export default class SlIcon extends LitElement {
  static styles = styles;

  @state() private svg = '';

  /** The name of the icon to draw. */
  @property() name: string;

  /** An external URL of an SVG file. */
  @property() src: string;

  /** An alternate description to use for accessibility. If omitted, the icon will be ignored by assistive devices. */
  @property() label: string;

  /** The name of a registered custom icon library. */
  @property() library = 'default';

  connectedCallback() {
    super.connectedCallback();
    watchIcon(this);
  }

  firstUpdated() {
    this.setIcon();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    unwatchIcon(this);
  }

  private getUrl(): string {
    const library = getIconLibrary(this.library);
    if (this.name && library) {
      return library.resolver(this.name);
    } else {
      return this.src;
    }
  }

  /** @internal Fetches the icon and redraws it. Used to handle library registrations. */
  redraw() {
    this.setIcon();
  }

  @watch('name')
  @watch('src')
  @watch('library')
  async setIcon() {
    const library = getIconLibrary(this.library);
    const url = this.getUrl();
    if (url) {
      try {
        const file = await requestIcon(url)!;
        if (url !== this.getUrl()) {
          // If the url has changed while fetching the icon, ignore this request
          return;
        } else if (file.ok) {
          const doc = parser.parseFromString(file.svg, 'text/html');
          const svgEl = doc.body.querySelector('svg');

          if (svgEl) {
            if (library && library.mutator) {
              library.mutator(svgEl);
            }

            this.svg = svgEl.outerHTML;
            emit(this, 'sl-load');
          } else {
            this.svg = '';
            emit(this, 'sl-error', { detail: { status: file.status } });
          }
        } else {
          this.svg = '';
          emit(this, 'sl-error', { detail: { status: file.status } });
        }
      } catch {
        emit(this, 'sl-error', { detail: { status: -1 } });
      }
    } else if (this.svg) {
      // If we can't resolve a URL and an icon was previously set, remove it
      this.svg = '';
    }
  }

  handleChange() {
    this.setIcon();
  }

  render() {
    const hasLabel = typeof this.label === 'string' && this.label.length > 0;

    return html` <div
      part="base"
      class="icon"
      role=${ifDefined(hasLabel ? 'img' : undefined)}
      aria-label=${ifDefined(hasLabel ? this.label : undefined)}
      aria-hidden=${ifDefined(hasLabel ? undefined : 'true')}
    >
      ${unsafeSVG(this.svg)}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-icon': SlIcon;
  }
}
