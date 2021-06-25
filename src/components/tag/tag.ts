import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit-html/directives/class-map';
import { emit } from '../../internal/event';
import styles from 'sass:./tag.scss';

/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon-button
 *
 * @slot - The tag's content.
 *
 * @event sl-clear - Emitted when the clear button is activated.
 *
 * @csspart base - The component's base wrapper.
 * @csspart content - The tag content.
 * @csspart clear-button - The clear button.
 */
@customElement('sl-tag')
export default class SlTag extends LitElement {
  static styles = unsafeCSS(styles);

  /** The tag's type. */
  @property({ reflect: true }) type: 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'text' = 'primary';

  /** The tag's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** Draws a pill-style tag with rounded edges. */
  @property({ type: Boolean, reflect: true }) pill = false;

  /** Makes the tag clearable. */
  @property({ type: Boolean }) clearable = false;

  handleClearClick() {
    emit(this, 'sl-clear');
  }

  render() {
    return html`
      <span
        part="base"
        class=${classMap({
          tag: true,

          // Types
          'tag--primary': this.type === 'primary',
          'tag--success': this.type === 'success',
          'tag--info': this.type === 'info',
          'tag--warning': this.type === 'warning',
          'tag--danger': this.type === 'danger',
          'tag--text': this.type === 'text',

          // Sizes
          'tag--small': this.size === 'small',
          'tag--medium': this.size === 'medium',
          'tag--large': this.size === 'large',

          // Modifers
          'tag--pill': this.pill,
          'tag--clearable': this.clearable
        })}
      >
        <span part="content" class="tag__content">
          <slot></slot>
        </span>

        ${this.clearable
          ? html`
              <sl-icon-button
                exportparts="base:clear-button"
                name="x"
                library="system"
                class="tag__clear"
                @click=${this.handleClearClick}
              ></sl-icon-button>
            `
          : ''}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-tag': SlTag;
  }
}
