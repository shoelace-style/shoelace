import { Component, Prop, h } from '@stencil/core';

/**
 * @since 1.0
 * @status stable
 */

@Component({
  tag: 'sl-spinner',
  styleUrl: 'spinner.scss',
  shadow: true
})
export class Spinner {
  /** The spinner's size. */
  @Prop() size = 24;

  /** The stroke width of the spinner in pixels. */
  @Prop() strokeWidth = 2;

  render() {
    return (
      <span
        class="spinner"
        aria-busy="true"
        aria-live="polite"
        style={{
          borderWidth: `${this.strokeWidth}px`,
          width: `${this.size}px`,
          height: `${this.size}px`
        }}
      />
    );
  }
}
