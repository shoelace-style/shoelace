import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg';
import { emit } from '../../internal/event';
import { watch } from '../../internal/watch';
import { getIconLibrary, watchIcon, unwatchIcon } from './library';
import { requestIcon } from './request';
import styles from 'sass:./icon.scss';

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
  static styles = unsafeCSS(styles);

  @state() private svg = '';

  /** The name of the icon to draw. */
  @property() name: string;

  /** An external URL of an SVG file. */
  @property() src: string;

  /** An alternative description to use for accessibility. If omitted, the name or src will be used to generate it. */
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

  getLabel() {
    let label = '';

    if (this.label) {
      label = this.label;
    } else if (this.name) {
      label = this.name.replace(/-/g, ' ');
    } else if (this.src) {
      label = this.src.replace(/.*\//, '').replace(/-/g, ' ').replace(/\.svg/i, '');
    }

    return label;
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
    return html` <div part="base" class="icon" role="img" aria-label=${this.getLabel()}>${unsafeSVG(this.svg)}</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-icon': SlIcon;
  }
}
