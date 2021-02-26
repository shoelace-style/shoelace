import { html, Shoemaker } from '@shoelace-style/shoemaker';
import styles from 'sass:./button-group.scss';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - One or more `<sl-button>` elements to display in the button group.
 *
 * @part base - The component's base wrapper.
 */

export default class SlButtonGroup extends Shoemaker {
  static tag = 'sl-button-group';
  static props = ['label'];
  static styles = styles;

  private buttonGroup: HTMLElement;

  /** A label to use for the button group's `aria-label` attribute. */
  label = '';

  onReady() {
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    this.buttonGroup.addEventListener('sl-focus', this.handleFocus);
    this.buttonGroup.addEventListener('sl-blur', this.handleBlur);
  }

  onDisconnect() {
    this.buttonGroup.removeEventListener('sl-focus', this.handleFocus);
    this.buttonGroup.removeEventListener('sl-blur', this.handleBlur);
  }

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
        ref=${(el: HTMLElement) => (this.buttonGroup = el)}
        part="base"
        class="button-group"
        aria-label=${this.label}
      >
        <slot />
      </div>
    `;
  }
}
