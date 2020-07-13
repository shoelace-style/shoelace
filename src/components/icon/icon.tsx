import { Component, Event, EventEmitter, Prop, State, Watch, getAssetPath, h } from '@stencil/core';

import { requestIcon } from './request';

const parser = new DOMParser();

/**
 * @since 1.0
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
  @State() svg: string;

  /** The name of the icon to draw. */
  @Prop() name: string;

  /** An external URL of an SVG file. */
  @Prop() src: string;

  /** An alternative description to use for accessibility. If omitted, the name or src will be used to generate it. */
  @Prop() label: string;

  /** Emitted when the icon has loaded. */
  @Event() slLoad: EventEmitter;

  /** Emitted when the icon failed to load. */
  @Event() slError: EventEmitter;

  @Watch('name')
  @Watch('src')
  handleChange() {
    this.setIcon();
  }

  componentDidLoad() {
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
    const url = this.name ? getAssetPath(`./icons/${this.name}.svg`) : this.src;
    requestIcon(url)
      .then(source => {
        const doc = parser.parseFromString(source, 'text/html');
        const svg = doc.body.querySelector('svg');

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

  render() {
    return <div part="base" class="icon" role="img" aria-label={this.getLabel()} innerHTML={this.svg} />;
  }
}
