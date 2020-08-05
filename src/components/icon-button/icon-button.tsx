import { Component, Prop, h } from '@stencil/core';
import { focusVisible } from '../../utilities/focus-visible';

/**
 * @since 2.0
 * @status stable
 *
 * @part base - The component's base wrapper.
 */

@Component({
  tag: 'sl-icon-button',
  styleUrl: 'icon-button.scss',
  shadow: true
})
export class IconButton {
  button: HTMLButtonElement;

  /** The name of the icon to draw. See the icon component for a full list of icons. */
  @Prop() name: string;

  /** An external URL of an SVG file. */
  @Prop() src: string;

  /** An alternative description to use for accessibility. If omitted, the name or src will be used to generate it. */
  @Prop() label: string;

  /** Set to true to disable the button. */
  @Prop() disabled = false;

  componentDidLoad() {
    focusVisible.observe(this.button);
  }

  componentDidUnload() {
    if (this.button) {
      focusVisible.unobserve(this.button);
    }
  }

  render() {
    return (
      <button
        ref={el => (this.button = el)}
        part="base"
        class={{
          'icon-button': true,
          'icon-button--disabled': this.disabled
        }}
        type="button"
      >
        <sl-icon name={this.name} src={this.src} label={this.label} />
      </button>
    );
  }
}
