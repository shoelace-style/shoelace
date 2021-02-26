import { classMap, html, Shoemaker } from '@shoelace-style/shoemaker';
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
 *
 * @emit sl-clear - Emitted when the clear button is activated.
 */
export default class SlTag extends Shoemaker {
  static tag = 'sl-tag';
  static props = ['type', 'size', 'pill', 'clearable'];
  static reflect = ['type', 'size', 'pill', 'clearable'];
  static styles = styles;

  /** The tag's type. */
  type: 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'text' = 'primary';

  /** The tag's size. */
  size: 'small' | 'medium' | 'large' = 'medium';

  /** Draws a pill-style tag with rounded edges. */
  pill = false;

  /** Makes the tag clearable. */
  clearable = false;

  handleClearClick() {
    this.emit('sl-clear');
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
          <slot />
        </span>

        ${this.clearable
          ? html`
              <sl-icon-button
                exportparts="base:clear-button"
                name="x"
                class="tag__clear"
                onclick=${this.handleClearClick.bind(this)}
              />
            `
          : ''}
      </span>
    `;
  }
}
