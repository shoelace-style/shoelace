import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 's-spinner',
  styleUrl: 'spinner.scss',
  scoped: true
})
export class spinner {
  /** The spinner's size. */
  @Prop() size = '1em';

  render() {
    return (
      <span
        class={{
          's-spinner': true,
          's-spinner--small': this.size === 'small',
          's-spinner--medium': this.size === 'medium',
          's-spinner--large': this.size === 'large'
        }}
        style={{
          width: this.size,
          height: this.size
        }}
      />
    );
  }
}
