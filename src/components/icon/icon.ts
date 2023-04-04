import { customElement, property, state } from 'lit/decorators.js';
import { getIconLibrary, unwatchIcon, watchIcon } from './library';
import { requestInclude } from '../include/request';
import { watch } from '../../internal/watch';
import ShoelaceElement from '../../internal/shoelace-element';
import styles from './icon.styles';
import type { CSSResultGroup } from 'lit';

let parser: DOMParser;
const iconCache = new Map<string, Promise<SVGSVGElement | null>>();

/**
 * @summary Icons are symbols that can be used to represent various options within an application.
 * @documentation https://shoelace.style/components/icon
 * @status stable
 * @since 2.0
 *
 * @event sl-load - Emitted when the icon has loaded.
 * @event sl-error - Emitted when the icon fails to load due to an error.
 *
 * @csspart svg - The internal SVG element.
 */
@customElement('sl-icon')
export default class SlIcon extends ShoelaceElement {
  static styles: CSSResultGroup = styles;

  @state() private svg: SVGElement | null = null;

  /** The name of the icon to draw. Available names depend on the icon library being used. */
  @property({ reflect: true }) name?: string;

  /**
   * An external URL of an SVG file. Be sure you trust the content you are including, as it will be executed as code and
   * can result in XSS attacks.
   */
  @property() src?: string;

  /**
   * An alternate description to use for assistive devices. If omitted, the icon will be considered presentational and
   * ignored by assistive devices.
   */
  @property() label = '';

  /** The name of a registered custom icon library. */
  @property({ reflect: true }) library = 'default';

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

  private getUrl() {
    const library = getIconLibrary(this.library);
    if (this.name && library) {
      return library.resolver(this.name);
    }
    return this.src;
  }

  @watch('label')
  handleLabelChange() {
    const hasLabel = typeof this.label === 'string' && this.label.length > 0;

    if (hasLabel) {
      this.setAttribute('role', 'img');
      this.setAttribute('aria-label', this.label);
      this.removeAttribute('aria-hidden');
    } else {
      this.removeAttribute('role');
      this.removeAttribute('aria-label');
      this.setAttribute('aria-hidden', 'true');
    }
  }

  @watch(['name', 'src', 'library'])
  async setIcon() {
    const library = getIconLibrary(this.library);
    const url = this.getUrl();

    if (!url) {
      this.svg = null;
      return;
    }

    let iconResolver = iconCache.get(url);
    if (!iconResolver) {
      iconResolver = SlIcon._resolveIcon(url);
      iconCache.set(url, iconResolver);
    }

    try {
      const svg = await iconResolver;
      if (url !== this.getUrl()) {
        // If the url has changed while fetching the icon, ignore this request
        return;
      }

      if (!svg) {
        this.svg = null;
        this.emit('sl-error');
        return;
      }

      this.svg = svg.cloneNode(true) as SVGElement;
      library?.mutator?.(this.svg);
      this.emit('sl-load');
    } catch {
      this.svg = null;
      iconCache.delete(url);
      this.emit('sl-error');
    }
  }

  render() {
    return this.svg;
  }

  private static async _resolveIcon(url: string): Promise<SVGSVGElement | null> {
    const fileData = await requestInclude(url);
    if (!fileData.ok) return null;

    const div = document.createElement('div');
    div.innerHTML = fileData.html;

    const svg = div.firstElementChild;
    if (svg?.tagName?.toLowerCase() !== 'svg') return null;

    if (!parser) parser = new DOMParser();
    const doc = parser.parseFromString(svg.outerHTML, 'text/html');

    const svgEl = doc.body.querySelector('svg');
    if (!svgEl) return null;

    svgEl.part.add('svg');
    return document.adoptNode(svgEl);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-icon': SlIcon;
  }
}
