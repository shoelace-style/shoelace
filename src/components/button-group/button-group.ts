import { LitElement, html, property, unsafeCSS } from 'lit-element';
import { tag } from '../../internal/decorators';
import styles from 'sass:./button-group.scss';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - One or more `<sl-button>` elements to display in the button group.
 *
 * @part base - The component's base wrapper.
 */
@tag('sl-button-group')
export default class SlButtonGroup extends LitElement {
  static styles = unsafeCSS(styles);

  /** A label to use for the button group's `aria-label` attribute. */
  @property() label: string;

  handleFocus(event: CustomEvent) {
    const button = event.target as HTMLElement;
    button.classList.add('sl-focus');
  }

  handleBlur(event: CustomEvent) {
    const button = event.target as HTMLElement;
    button.classList.remove('sl-focus');
  }

  render() {
    return html`
      <div
        part="base"
        class="button-group"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
      >
        <slot></slot>
      </div>
    `;
  }
}

    declare global {
        interface HTMLElementTagNameMap {
        'sl-button-group': SlButtonGroup;
        }
    }