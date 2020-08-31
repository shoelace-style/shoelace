import { Component, Prop, Watch, h } from '@stencil/core';

/**
 * @since 2.0
 * @status stable
 *
 * @part base - The component's base wrapper.
 */

@Component({
  tag: 'sl-responsive-embed',
  styleUrl: 'responsive-embed.scss',
  shadow: true
})
export class ResponsiveEmbed {
  base: HTMLElement;

  /**
   * The aspect ratio of the embedded media in the format of `width:height`, e.g. `16:9`, `4:3`, or `1:1`. Ratios not in
   * this format will be ignored.
   */
  @Prop() aspectRatio = '16:9';

  @Watch('aspectRatio')
  handleAspectRatioChange() {
    this.setAspectRatio();
  }

  connectedCallback() {
    this.handleSlotChange = this.handleSlotChange.bind(this);
  }

  handleSlotChange() {
    this.setAspectRatio();
  }

  setAspectRatio() {
    const split = this.aspectRatio.split(':');
    const x = parseInt(split[0]);
    const y = parseInt(split[1]);

    this.base.style.paddingBottom = x && y ? `${(y / x) * 100}%` : null;
  }

  render() {
    return (
      <div ref={el => (this.base = el)} part="base" class="responsive-embed">
        <slot onSlotchange={this.handleSlotChange} />
      </div>
    );
  }
}
