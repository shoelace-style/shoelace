import { Component, Element, Event, EventEmitter, Method, Prop, State, Watch, h } from '@stencil/core';
import { getLibrary, watchIcon, unwatchIcon } from '../icon-library/icon-library-registry';
import { requestIcon } from './request';

const parser = new DOMParser();

/**
 * @since 2.0
 * @status stable
 *
 * @part base - The component's base wrapper.
 */

@Component({
  tag: 'sl-icon',
  styleUrl: 'icon.scss',
  shadow: true,
  assetsDirs: ['icons']
})
export class Icon {
  @Element() host: HTMLSlIconElement;

  @State() svg: string;

  /** The name of the icon to draw. */
  @Prop() name: string;

  /** An external URL of an SVG file. */
  @Prop() src: string;

  /** An alternative description to use for accessibility. If omitted, the name or src will be used to generate it. */
  @Prop() label: string;

  /** The name of a registered custom icon library. */
  @Prop() library = 'default';

  /** Emitted when the icon has loaded. */
  @Event({ eventName: 'sl-load' }) slLoad: EventEmitter;

  /** Emitted when the icon failed to load. */
  @Event({ eventName: 'sl-error' }) slError: EventEmitter<{ status?: number }>;

  @Watch('name')
  @Watch('src')
  @Watch('library')
  handleChange() {
    this.setIcon();
  }

  connectedCallback() {
    watchIcon(this.host);
  }

  componentDidLoad() {
    this.setIcon();
  }

  disconnectedCallback() {
    unwatchIcon(this.host);
  }

  /** @internal Fetches the icon and redraws it. Used to handle library registrations. */
  @Method()
  async redraw() {
    this.setIcon();
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

  async setIcon() {
    const library = getLibrary(this.library);
    let url = this.src;

    if (this.name && library) {
      url = library.resolver(this.name);
    }

    if (url) {
      try {
        const file = await requestIcon(url);
        if (file.ok) {
          const doc = parser.parseFromString(file.svg, 'text/html');
          const svg = doc.body.querySelector('svg');

          if (svg) {
            if (library && library.mutator) {
              library.mutator(svg);
            }

            this.svg = svg.outerHTML;
            this.slLoad.emit();
          } else {
            this.svg = '';
            this.slError.emit({ status: file.status });
          }
        }
      } catch {
        this.slError.emit();
      }
    } else if (this.svg) {
      // If we can't resolve a URL and an icon was previously set, remove it
      this.svg = null;
    }
  }

  render() {
    return <div part="base" class="icon" role="img" aria-label={this.getLabel()} innerHTML={this.svg} />;
  }
}
