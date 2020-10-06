import { Component, Element, Event, EventEmitter, Method, Prop, State, Watch, getAssetPath, h } from '@stencil/core';
import { getLibrary, watchIcon, unwatchIcon } from './icon-library';
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

  /** The name of a custom registered icon library. */
  @Prop() library: string;

  /** Emitted when the icon has loaded. */
  @Event() slLoad: EventEmitter;

  /** Emitted when the icon failed to load. */
  @Event() slError: EventEmitter;

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

  setIcon() {
    const library = getLibrary(this.library);
    let url = this.src;

    if (this.library && this.name) {
      if (library) {
        url = library.getPath(this.name);
      } else {
        // The library hasn't been registered yet
        return;
      }
    } else if (this.name) {
      url = getAssetPath(`./icons/${this.name}.svg`);
    }

    if (url) {
      requestIcon(url)
        .then(source => {
          const doc = parser.parseFromString(source, 'text/html');
          const svg = doc.body.querySelector('svg');

          if (library && typeof library.mutate === 'function') {
            library.mutate(svg);
          }

          if (svg) {
            this.svg = svg.outerHTML;
            this.slLoad.emit();
          } else {
            this.svg = '';
            this.slError.emit();
          }
        })
        .catch(error => this.slError.emit(error));
    }
  }

  render() {
    return <div part="base" class="icon" role="img" aria-label={this.getLabel()} innerHTML={this.svg} />;
  }
}
