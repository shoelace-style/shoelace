import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { formatBytes } from '../../internal/number';
import { localize } from '../../internal/i18n';

/**
 * @since 2.0
 * @status stable
 */
@customElement('sl-format-bytes')
export default class SlFormatBytes extends LitElement {
  private t = localize(this);

  /** The number to format in bytes. */
  @property({ type: Number }) value = 0;

  /** The unit to display. */
  @property() unit: 'bytes' | 'bits' = 'bytes';

  /** The locale to use when formatting the number. */
  @property() override lang = '';

  render() {
    return formatBytes(this.value, {
      unit: this.unit,
      formatNumber: value => this.t.formatNumber(value)
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-format-bytes': SlFormatBytes;
  }
}
