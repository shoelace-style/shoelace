import { Component, h } from '@stencil/core';

/**
 * @since 2.0
 * @status stable
 *
 * @part base - The component's base wrapper.
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
