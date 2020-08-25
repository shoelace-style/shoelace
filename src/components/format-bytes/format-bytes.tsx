import { Component, Prop } from '@stencil/core';
import { formatBytes } from '../../utilities/number';

/**
 * @since 2.0
 * @status stable
 */

@Component({
  tag: 'sl-format-bytes',
  shadow: true
})
export class FormatBytes {
  /** The number to format in bytes. */
  @Prop() value = 0;

  /** The unit to display. */
  @Prop() unit: 'bytes' | 'bits' = 'bytes';

  /** The locale to use when formatting the number. */
  @Prop() locale: string;

  render() {
    return formatBytes(this.value, {
      unit: this.unit,
      locale: this.locale
    });
  }
}
