import { LitElement, html, property, unsafeCSS } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { event, EventEmitter, tag } from '../../internal/decorators';
import styles from 'sass:./tag.scss';

/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon-button
 *
 * @slot - The tag's content.
 *
 * @part base - The component's base wrapper.
 * @part content - The tag content.
 * @part clear-button - The clear button.
 */
@tag('sl-tag')
export class SlTag extends LitElement {
  static styles = unsafeCSS(styles);

  /** The tag's type. */
  @property({ reflect: true }) type: 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'text' = 'primary';

  /** The tag's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** Draws a pill-style tag with rounded edges. */
  @property({ type: Boolean, reflect: true }) pill = false;

  /** Makes the tag clearable. */
  @property({ type: Boolean }) clearable = false;

  /** Emitted when the clear button is activated. */
  @event('sl-clear') slClear: EventEmitter<void>;

  handleClearClick() {
    this.slClear.emit();
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
                class="tag__clear"
                @click=${this.handleClearClick}
              ></sl-icon-button>
            `
          : ''}
      </span>
    `;
  }
}
