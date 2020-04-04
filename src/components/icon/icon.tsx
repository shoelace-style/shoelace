import { Component, Prop, State, Watch, getAssetPath, h } from '@stencil/core';

import { requestIcon } from './request';

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

  /** An external URL of the SVG file to fetch. */
  @Prop() src: string;

  @Watch('name')
  @Watch('src')
  handleChange() {
    this.setIcon();
  }

  componentDidLoad() {
    this.setIcon();
  }

  setIcon() {
    const url = this.name ? getAssetPath(`./icons/${this.name}.svg`) : this.src;
    requestIcon(url).then(svg => (this.svg = svg));
  }

  render() {
    return <div class="sl-icon" innerHTML={this.svg || ''} />;
  }
}
