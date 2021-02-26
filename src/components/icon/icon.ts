import { html, Hole, Shoemaker } from '@shoelace-style/shoemaker';
import styles from 'sass:./icon.scss';
import { getIconLibrary, watchIcon, unwatchIcon } from './library';
import { requestIcon } from './request';

const parser = new DOMParser();

/**
 * @since 2.0
 * @status stable
 *
 * @part base - The component's base wrapper.
 *
 * @emit sl-load - Emitted when the icon has loaded.
 * @emit sl-error - Emitted when the icon failed to load. Event details may include: `{ status: number }`
 */
export default class SlIcon extends Shoemaker {
  static tag = 'sl-icon';
  static props = ['svg', 'name', 'src', 'label', 'library'];
  static styles = styles;

  private svg: Hole | string;

  /** The name of the icon to draw. */
  name: string;

  /** An external URL of an SVG file. */
  src: string;

  /** An alternative description to use for accessibility. If omitted, the name or src will be used to generate it. */
  label: string;

  /** The name of a registered custom icon library. */
  library = 'default';

  onConnect() {
    watchIcon(this);
  }

  onReady() {
    this.setIcon();
  }

  onDisconnect() {
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

            this.svg = html([svgEl.outerHTML] as any);
            this.emit('sl-load');
          } else {
            this.svg = '';
            this.emit('sl-error', { detail: { status: file.status } });
          }
        } else {
          this.svg = '';
          this.emit('sl-error', { detail: { status: file.status } });
        }
      } catch {
        this.emit('sl-error');
      }
    } else if (this.svg) {
      // If we can't resolve a URL and an icon was previously set, remove it
      this.svg = '';
    }
  }

  watchName() {
    this.setIcon();
  }

  watchSrc() {
    this.setIcon();
  }

  watchLibrary() {
    this.setIcon();
  }

  handleChange() {
    this.setIcon();
  }

  render() {
    return html` <div part="base" class="icon" role="img" aria-label=${this.getLabel()}>${this.svg}</div>`;
  }
}
