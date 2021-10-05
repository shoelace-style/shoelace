import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import styles from './icon-button.styles';

import '../icon/icon';

/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon
 *
 * @csspart base - The component's base wrapper.
 */
@customElement('sl-icon-button')
export default class SlIconButton extends LitElement {
  static styles = styles;

  @query('button') button: HTMLButtonElement | HTMLLinkElement;

  /** The name of the icon to draw. */
  @property() name: string;

  /** The name of a registered custom icon library. */
  @property() library: string;

  /** An external URL of an SVG file. */
  @property() src: string;

  /** When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`. */
  @property() href: string;

  /** Tells the browser where to open the link. Only used when `href` is set. */
  @property() target: '_blank' | '_parent' | '_self' | '_top';

  /** Tells the browser to download the linked file as this filename. Only used when `href` is set. */
  @property() download: string;

  /**
   * A description that gets read by screen readers and other assistive devices. For optimal accessibility, you should
   * always include a label that describes what the icon button does.
   */
  @property() label = '';

  /** Disables the button. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  render() {
    const isLink = this.href ? true : false;

    const interior = html`
      <sl-icon
        name=${ifDefined(this.name)}
        library=${ifDefined(this.library)}
        src=${ifDefined(this.src)}
        aria-hidden="true"
      ></sl-icon>
    `;

    return isLink
      ? html`
          <a
            part="base"
            class="icon-button"
            href=${ifDefined(this.href)}
            target=${ifDefined(this.target)}
            download=${ifDefined(this.download)}
            rel=${ifDefined(this.target ? 'noreferrer noopener' : undefined)}
            role="button"
            aria-disabled=${this.disabled ? 'true' : 'false'}
            aria-label="${this.label}"
            tabindex=${this.disabled ? '-1' : '0'}
          >
            ${interior}
          </a>
        `
      : html`
          <button
            part="base"
            class=${classMap({
              'icon-button': true,
              'icon-button--disabled': this.disabled
            })}
            ?disabled=${this.disabled}
            type="button"
            aria-label=${this.label}
          >
            ${interior}
          </button>
        `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-icon-button': SlIconButton;
  }
}
