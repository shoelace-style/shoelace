import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import styles from './breadcrumb.styles';
import type SlBreadcrumbItem from '../breadcrumb-item/breadcrumb-item';

import '../icon/icon';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - One or more breadcrumb items to display.
 * @slot separator - The separator to use between breadcrumb items.
 *
 * @dependency sl-icon
 *
 * @csspart base - The component's base wrapper.
 */
@customElement('sl-breadcrumb')
export default class SlBreadcrumb extends LitElement {
  static styles = styles;

  @query('slot') defaultSlot: HTMLSlotElement;
  @query('slot[name="separator"]') separatorSlot: HTMLSlotElement;

  /**
   * The label to use for the breadcrumb control. This will not be shown, but it will be announced by screen readers and
   * other assistive devices.
   */
  @property() label = 'Breadcrumb';

  // Generates a clone of the separator element to use for each breadcrumb item
  private getSeparator() {
    const separator = this.separatorSlot.assignedElements({ flatten: true })[0] as HTMLElement;

    // Clone it, remove ids, and slot it
    const clone = separator.cloneNode(true) as HTMLElement;
    [clone, ...clone.querySelectorAll('[id]')].map(el => el.removeAttribute('id'));
    clone.slot = 'separator';

    return clone;
  }

  handleSlotChange() {
    const items = [...this.defaultSlot.assignedElements({ flatten: true })].filter(
      item => item.tagName.toLowerCase() === 'sl-breadcrumb-item'
    ) as SlBreadcrumbItem[];

    items.map((item, index) => {
      // Append separators to each item if they don't already have one
      const separator = item.querySelector('[slot="separator"]') as HTMLElement;
      if (!separator) {
        item.append(this.getSeparator());
      }

      // The last breadcrumb item is the "current page"
      if (index === items.length - 1) {
        item.setAttribute('aria-current', 'page');
      } else {
        item.removeAttribute('aria-current');
      }
    });
  }

  render() {
    return html`
      <nav part="base" class="breadcrumb" aria-label=${this.label}>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </nav>

      <slot name="separator" hidden aria-hidden="true">
        <sl-icon name="chevron-right" library="system"></sl-icon>
      </slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-breadcrumb': SlBreadcrumb;
  }
}
