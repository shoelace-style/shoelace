import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { HasSlotController } from '../../internal/slot';
import styles from './breadcrumb-item.styles';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The breadcrumb item's label.
 * @slot prefix - An optional prefix, usually an icon or icon button.
 * @slot suffix - An optional suffix, usually an icon or icon button.
 * @slot separator - The separator to use for the breadcrumb item. This will only change the separator for this item. If
 * you want to change it for all items in the group, set the separator on `<sl-breadcrumb>` instead.
 *
 * @csspart base - The component's base wrapper.
 * @csspart label - The breadcrumb item's label.
 * @csspart prefix - The container that wraps the prefix slot.
 * @csspart suffix - The container that wraps the suffix slot.
 * @csspart separator - The container that wraps the separator slot.
 */
@customElement('sl-breadcrumb-item')
export default class SlBreadcrumbItem extends LitElement {
  static styles = styles;

  private hasSlotController = new HasSlotController(this, 'prefix', 'suffix');

  /**
   * Optional URL to direct the user to when the breadcrumb item is activated. When set, a link will be rendered
   * internally. When unset, a button will be rendered instead.
   */
  @property() href: string;

  /** Tells the browser where to open the link. Only used when `href` is set. */
  @property() target: '_blank' | '_parent' | '_self' | '_top';

  /** The `rel` attribute to use on the link. Only used when `href` is set. */
  @property() rel: string = 'noreferrer noopener';

  render() {
    const isLink = this.href ? true : false;

    return html`
      <div
        part="base"
        class=${classMap({
          'breadcrumb-item': true,
          'breadcrumb-item--has-prefix': this.hasSlotController.test('prefix'),
          'breadcrumb-item--has-suffix': this.hasSlotController.test('suffix')
        })}
      >
        <span part="prefix" class="breadcrumb-item__prefix">
          <slot name="prefix"></slot>
        </span>

        ${isLink
          ? html`
              <a
                part="label"
                class="breadcrumb-item__label breadcrumb-item__label--link"
                href="${this.href}"
                target="${this.target}"
                rel=${ifDefined(this.target ? this.rel : undefined)}
              >
                <slot></slot>
              </a>
            `
          : html`
              <button part="label" type="button" class="breadcrumb-item__label breadcrumb-item__label--button">
                <slot></slot>
              </button>
            `}

        <span part="suffix" class="breadcrumb-item__suffix">
          <slot name="suffix"></slot>
        </span>

        <span part="separator" class="breadcrumb-item__separator" aria-hidden="true">
          <slot name="separator"></slot>
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-breadcrumb-item': SlBreadcrumbItem;
  }
}
