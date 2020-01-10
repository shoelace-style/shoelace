import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'sl-spinner',
  styleUrl: 'spinner.scss',
  scoped: true
})
export class Spinner {
  /** The spinner's size. */
  @Prop() size = '1em';

  render() {
    return (
      <span
        class="sl-spinner"
        style={{
          width: this.size,
          height: this.size
        }}
      />
    );
  }
}
