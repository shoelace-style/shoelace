import { LitElement, customElement, html, internalProperty, property, unsafeCSS } from 'lit-element';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg';
import { event, EventEmitter } from '../../internal/event';
import styles from 'sass:./icon.scss';
import { getIconLibrary, watchIcon, unwatchIcon } from './library';
import { requestIcon } from './request';

const parser = new DOMParser();

/**
 * @since 2.0
 * @status stable
 *
 * @part base - The component's base wrapper.
 */
@customElement('sl-icon')
export class SlIcon extends LitElement {
  static styles = unsafeCSS(styles);

  @internalProperty() private svg = '';

  /** The name of the icon to draw. */
  @property() name: string;

  /** An external URL of an SVG file. */
  @property() src: string;

  /** An alternative description to use for accessibility. If omitted, the name or src will be used to generate it. */
  @property() label: string;

  /** The name of a registered custom icon library. */
  @property() library = 'default';

  /** Emitted when the icon has loaded. */
  @event('sl-load') slLoad: EventEmitter<void>;

  /** Emitted when the icon failed to load. Event details may include: `{ status: number }` */
  @event('sl-error') slError: EventEmitter<{ status: number }>;

  connectedCallback() {
    super.connectedCallback();
    watchIcon(this);
  }

  firstUpdated() {
    this.setIcon();
  }

  update(changedProps: Map<string, any>) {
    if (['name', 'src', 'library'].find(prop => changedProps.has(prop))) {
      this.setIcon();
    }

    super.update(changedProps);
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

  /** @internal Fetches the icon and redraws it. Used to handle library registrations. */
  redraw() {
    this.setIcon();
  }

  async setIcon() {
    const library = getIconLibrary(this.library);
    let url = this.src;

    if (this.name && library) {
      url = library.resolver(this.name);
    }

    if (url) {
      try {
        const file = await requestIcon(url)!;
        if (file.ok) {
          const doc = parser.parseFromString(file.svg, 'text/html');
          const svgEl = doc.body.querySelector('svg');

          if (svgEl) {
            if (library && library.mutator) {
              library.mutator(svgEl);
            }

            this.svg = svgEl.outerHTML;
            this.slLoad.emit();
          } else {
            this.svg = '';
            this.slError.emit({ detail: { status: file.status } });
          }
        } else {
          this.svg = '';
          this.slError.emit({ detail: { status: file.status } });
        }
      } catch {
        this.slError.emit({ detail: { status: -1 } });
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
