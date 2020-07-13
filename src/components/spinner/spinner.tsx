import { Component, h } from '@stencil/core';

/**
 * @since 1.0
 * @status stable
 *
 * @part base - The base element of the spinner.
 */

@Component({
  tag: 'sl-spinner',
  styleUrl: 'spinner.scss',
  shadow: true
})
export class Spinner {
  render() {
    return <span part="base" class="spinner" aria-busy="true" aria-live="polite" />;
  }
}
