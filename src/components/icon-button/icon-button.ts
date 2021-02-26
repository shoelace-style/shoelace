import { classMap, html, Shoemaker } from '@shoelace-style/shoemaker';
import styles from 'sass:./icon-button.scss';
import { focusVisible } from '../../internal/focus-visible';

/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon
 *
 * @part base - The component's base wrapper.
 */
export default class SlIconButton extends Shoemaker {
  static tag = 'sl-icon-button';
  static props = ['name', 'library', 'src', 'label', 'disabled'];
  static reflect = ['disabled'];
  static styles = styles;

  private button: HTMLButtonElement;

  /** The name of the icon to draw. */
  name: string;

  /** The name of a registered custom icon library. */
  library: string;

  /** An external URL of an SVG file. */
  src: string;

  /**
   * A description that gets read by screen readers and other assistive devices. For optimal accessibility, you should
   * always include a label that describes what the icon button does.
   */
  label: string;

  /** Disables the button. */
  disabled = false;

  onReady() {
    focusVisible.observe(this.button);
  }

  disconnectedCallback() {
    focusVisible.unobserve(this.button);
  }

  render() {
    return html`
      <button
        ref=${(el: HTMLButtonElement) => (this.button = el)}
        part="base"
        class=${classMap({
          'icon-button': true,
          'icon-button--disabled': this.disabled
        })}
        type="button"
        aria-label=${this.label}
      >
        <sl-icon library=${this.library} name=${this.name} src=${this.src} aria-hidden="true" />
      </button>
    `;
  }
}
