import { Component, h } from '@stencil/core';

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
  render() {
    return <span class="spinner" aria-busy="true" aria-live="polite" />;
  }
}
