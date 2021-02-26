import { Shoemaker } from '@shoelace-style/shoemaker';
import { formatBytes } from '../../internal/number';

/**
 * @since 2.0
 * @status stable
 */
export default class SlFormatBytes extends Shoemaker {
  static tag = 'sl-format-bytes';
  static props = ['value', 'unit', 'locale'];

  /** The number to format in bytes. */
  value = 0;

  /** The unit to display. */
  unit: 'bytes' | 'bits' = 'bytes';

  /** The locale to use when formatting the number. */
  locale: string;

  render() {
    return formatBytes(this.value, {
      unit: this.unit,
      locale: this.locale
    });
  }
}
