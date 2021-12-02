import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { formatBytes } from '../../internal/number';

/**
 * @since 2.0
 * @status stable
 */
@customElement('sl-format-bytes')
export default class SlFormatBytes extends LitElement {
  /** The number to format in bytes. */
  @property({ type: Number }) value = 0;

  /** The unit to display. */
  @property() unit: 'bytes' | 'bits' = 'bytes';

  /** The locale to use when formatting the number. */
  @property() lang: string;

  render() {
    return formatBytes(this.value, {
      unit: this.unit,
      lang: this.lang
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-format-bytes': SlFormatBytes;
  }
}
