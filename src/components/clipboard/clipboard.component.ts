import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import ShoelaceElement from '../../internal/shoelace-element.js';
import SlIconButton from '../icon-button/icon-button.component.js';
import SlTooltip from '../tooltip/tooltip.component.js';
import styles from './clipboard.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Enables you to save content into the clipboard providing visual feedback.
 * @documentation https://shoelace.style/components/clipboard
 * @status experimental
 * @since 2.0
 *
 * @dependency sl-icon-button
 * @dependency sl-tooltip
 *
 * @event sl-copying - Event when copying starts.
 * @event sl-copied - Event when copying finished.
 *
 * @slot - The content that gets clicked to copy.
 * @slot copied - The content shown after a successful copy.
 * @slot error - The content shown if an error occurs.
 */
export default class SlClipboard extends ShoelaceElement {
  static styles: CSSResultGroup = styles;
  static dependencies = { 'sl-tooltip': SlTooltip, 'sl-icon-button': SlIconButton };

  /**
   * Indicates the current status the copy action is in.
   */
  @property({ type: String }) copyStatus: 'trigger' | 'copied' | 'error' = 'trigger';

  /** Value to copy. */
  @property({ type: String }) value = '';

  /** Id of the element to copy the text value from. */
  @property({ type: String }) for = '';

  /** Duration in milliseconds to reset to the trigger state. */
  @property({ type: Number, attribute: 'reset-timeout' }) resetTimeout = 2000;

  private handleClick() {
    if (this.copyStatus === 'copied') return;
    this.copy();
  }

  /** Copies the clipboard */
  async copy() {
    if (this.for) {
      const root = this.getRootNode() as ShadowRoot | Document;
      const target = 'getElementById' in root ? root.getElementById(this.for) : false;
      if (target) {
        if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
          this.value = target.value;
        } else if (target instanceof HTMLAnchorElement && target.hasAttribute('href')) {
          this.value = target.href;
        } else {
          this.value = target.textContent || '';
        }
      }
    }
    if (this.value) {
      try {
        this.emit('sl-copying');
        await navigator.clipboard.writeText(this.value);
        this.emit('sl-copied');
        this.copyStatus = 'copied';
      } catch (error) {
        this.copyStatus = 'error';
      }
    } else {
      this.copyStatus = 'error';
    }

    setTimeout(() => (this.copyStatus = 'trigger'), this.resetTimeout);
  }

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          clipboard: true,
          [`clipboard--${this.copyStatus}`]: true
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
        <slot name="error" @click=${this.handleClick}>
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
