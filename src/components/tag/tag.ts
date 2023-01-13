import '../icon-button/icon-button';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import { html } from 'lit';
import { LocalizeController } from '../../utilities/localize';
import ShoelaceElement from '../../internal/shoelace-element';
import styles from './tag.styles';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Tags are used as labels to organize things or to indicate a selection.
 * @documentation https://shoelace.style/components/tag
 * @status stable
 * @since 2.0
 *
 * @dependency sl-icon-button
 *
 * @slot - The tag's content.
 *
 * @event sl-remove - Emitted when the remove button is activated.
 *
 * @csspart base - The component's base wrapper.
 * @csspart content - The tag's content.
 * @csspart remove-button - The tag's remove button, an `<sl-icon-button>`.
 * @csspart remove-button__base - The remove button's exported `base` part.
 */
@customElement('sl-tag')
export default class SlTag extends ShoelaceElement {
  static styles: CSSResultGroup = styles;
  private readonly localize = new LocalizeController(this);

  /** The tag's theme variant. */
  @property({ reflect: true }) variant: 'primary' | 'success' | 'neutral' | 'warning' | 'danger' | 'text' = 'neutral';

  /** The tag's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** Draws a pill-style tag with rounded edges. */
  @property({ type: Boolean, reflect: true }) pill = false;

  /** Makes the tag removable and shows a remove button. */
  @property({ type: Boolean }) removable = false;

  private handleRemoveClick() {
    this.emit('sl-remove');
  }

  render() {
    return html`
      <span
        part="base"
        class=${classMap({
          tag: true,

          // Types
          'tag--primary': this.variant === 'primary',
          'tag--success': this.variant === 'success',
          'tag--neutral': this.variant === 'neutral',
          'tag--warning': this.variant === 'warning',
          'tag--danger': this.variant === 'danger',
          'tag--text': this.variant === 'text',

          // Sizes
          'tag--small': this.size === 'small',
          'tag--medium': this.size === 'medium',
          'tag--large': this.size === 'large',

          // Modifiers
          'tag--pill': this.pill,
          'tag--removable': this.removable
        })}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable
          ? html`
              <sl-icon-button
                part="remove-button"
                exportparts="base:remove-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term('remove')}
                class="tag__remove"
                @click=${this.handleRemoveClick}
                tabindex="-1"
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
