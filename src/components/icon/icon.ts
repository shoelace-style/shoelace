import { customElement, property, state } from 'lit/decorators.js';
import { getIconLibrary, unwatchIcon, watchIcon } from './library';
import { html } from 'lit';
import { requestIcon } from './request';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { watch } from '../../internal/watch';
import ShoelaceElement from '../../internal/shoelace-element';
import styles from './icon.styles';
import type { CSSResultGroup } from 'lit';

let parser: DOMParser;

/**
 * @summary Icons are symbols that can be used to represent various options within an application.
 * @documentation https://shoelace.style/components/icon
 * @status stable
 * @since 2.0
 *
 * @event sl-load - Emitted when the icon has loaded.
 * @event sl-error - Emitted when the icon fails to load due to an error.
 */
@customElement('sl-icon')
export default class SlIcon extends ShoelaceElement {
  static styles: CSSResultGroup = styles;

  @state() private svg = '';

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

    // Create an instance of the DOM parser. We do it here instead of top-level to support SSR while maintaining a
    // single parser instance for optimal performance.
    if (!parser) {
      parser = new DOMParser();
    }

    if (url) {
      try {
        const file = await requestIcon(url);
        if (url !== this.getUrl()) {
          // If the url has changed while fetching the icon, ignore this request
          return;
        } else if (file.ok) {
          const doc = parser.parseFromString(file.svg, 'text/html');
          const svgEl = doc.body.querySelector('svg');

          if (svgEl !== null) {
            library?.mutator?.(svgEl);
            this.svg = svgEl.outerHTML;
            this.emit('sl-load');
          } else {
            this.svg = '';
            this.emit('sl-error');
          }
        } else {
          this.svg = '';
          this.emit('sl-error');
        }
      } catch {
        this.emit('sl-error');
      }
    } else if (this.svg.length > 0) {
      // If we can't resolve a URL and an icon was previously set, remove it
      this.svg = '';
    }
  }

  render() {
    return html` ${unsafeSVG(this.svg)} `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-icon': SlIcon;
  }
}
