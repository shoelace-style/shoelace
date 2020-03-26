import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'sh-spinner',
  styleUrl: 'spinner.scss',
  shadow: true
})
export class Spinner {
  /** The spinner's size. */
  @Prop() diameter = 24;

  @Prop() stroke = 2;

  render() {
    return (
      <span
        class="sh-spinner"
        style={{
          borderWidth: `${this.stroke}px`,
          width: `${this.diameter}px`,
          height: `${this.diameter}px`
        }}
      />
    );
  }
}
