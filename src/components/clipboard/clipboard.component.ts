import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import ShoelaceElement from '../../internal/shoelace-element.js';
import SlIconButton from '../icon-button/icon-button.component.js';
import SlTooltip from '../tooltip/tooltip.component.js';
import styles from './clipboard.styles.js';
import type { CSSResultGroup, PropertyValueMap } from 'lit';

/**
 * @summary Enables you to save content into the clipboard providing visual feedback.
 * @documentation https://shoelace.style/components/clipboard
 * @status experimental
 * @since 2.0
 *
 * @dependency sl-icon-button
 * @dependency sl-tooltip
 *
 * @slot - The content that gets clicked to copy.
 * @slot copied - The content shown after a successful copy.
 */
export default class SlClipboard extends ShoelaceElement {
  static styles: CSSResultGroup = styles;
  static dependencies = { 'sl-tooltip': SlTooltip, 'sl-icon-button': SlIconButton };

  /**
   * Indicates whether or not copied info is shown.
   */
  @property({ type: Boolean, reflect: true }) copy = false;

  /**
   * Indicates whether or not copy error is shown.
   */
  @property({ type: Boolean }) copyError = false;

  /**
   * The value to copy.
   */
  @property({ type: String }) value = '';

  /**
   * The id of the element to copy the test value from.
   */
  @property({ type: String }) for = '';

  private handleClick() {
    if (this.copy || this.copyError) return;
    this.__executeCopy();
  }

  private async __executeCopy() {
    if (this.for) {
      const target = document.getElementById(this.for)!;
      if (target) {
        this.value = target.textContent || '';
      }
    }
    if (this.value) {
      try {
        await navigator.clipboard.writeText(this.value);
        this.copy = true;
        setTimeout(() => (this.copy = false), 2000);
      } catch (error) {
        this.copyError = true;
        setTimeout(() => (this.copyError = false), 2000);
      }
    }
  }

  protected update(changedProperties: PropertyValueMap<SlClipboard> | Map<PropertyKey, unknown>): void {
    super.update(changedProperties);
    if (changedProperties.has('copy') && this.copy) {
      this.__executeCopy();
    }
  }

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          clipboard: true,
          'clipboard--copy': this.copy,
          'clipboard--copy-error': this.copyError
        })}
      >
        <slot id="default" @click=${this.handleClick}>
          <sl-tooltip content="Copy">
            <sl-icon-button name="files" label="Copy"></sl-icon-button>
          </sl-tooltip>
        </slot>
        <slot name="copied" @click=${this.handleClick}>
          <sl-tooltip content="Copied">
            <sl-icon-button class="green" name="file-earmark-check" label="Copied"></sl-icon-button>
          </sl-tooltip>
        </slot>
        <slot name="copy-error" @click=${this.handleClick}>
          <sl-tooltip content="Failed to copy">
            <sl-icon-button class="red" name="file-earmark-x" label="Failed to copy"></sl-icon-button>
          </sl-tooltip>
        </slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-clipboard': SlClipboard;
  }
}
