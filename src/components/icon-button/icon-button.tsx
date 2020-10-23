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

  /** The name of the icon to draw. */
  @Prop({ reflect: true }) name: string;

  /** The name of a registered custom icon library. */
  @Prop({ reflect: true }) library: string;

  /** An external URL of an SVG file. */
  @Prop({ reflect: true }) src: string;

  /**
   * A description that gets read by screen readers and other assistive devices. For optimal accessibility, you should
   * always include a label that describes what the icon button does.
   */
  @Prop({ reflect: true }) label: string;

  /** Set to true to disable the button. */
  @Prop({ reflect: true }) disabled = false;

  componentDidLoad() {
    focusVisible.observe(this.button);
  }

  disconnectedCallback() {
    focusVisible.unobserve(this.button);
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
        aria-label={this.label}
      >
        <sl-icon library={this.library} name={this.name} src={this.src} aria-hidden="true" />
      </button>
    );
  }
}
