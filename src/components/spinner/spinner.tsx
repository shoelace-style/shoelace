import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 's-spinner',
  styleUrl: 'spinner.scss',
  scoped: true
})
export class Spinner {
  /** The spinner's size. */
  @Prop() size = '1em';

  render() {
    return (
      <span
        class="s-spinner"
        style={{
          width: this.size,
          height: this.size
        }}
      />
    );
  }
}
