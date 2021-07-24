import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { createTreeWalker } from '../../internal/walker';

/**
 * @since 2.X
 * @status beta
 *
 * @slot - The locale's component content.
 *
 */
@customElement('sl-locale')
export class SlLocale extends LitElement {
  @query('slot')
  defaultSlot!: HTMLSlotElement;

  @property({ type: String, reflect: true })
  lang: string = 'en-US';

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('lang')) {
      // this.getSlottedElements().forEach((el: Element) => {
      //   el.dispatchEvent(
      //     new CustomEvent('sl-language', {
      //       detail: { lang: this.lang },
      //       bubbles: false,
      //       composed: false
      //     })
      //   );
      // });
      for (let el of this.getSlottedElements()) {
        this.updateLocale(el, this.lang);
      }
    }
  }

  private updateLocale(el: Element, value: string) {
    // set the locale attribute
    // for elements that they want
    // inherit language from parent
    if (!el.hasAttribute('lang')) (el as any).setLocale(value);
  }

  private getSlottedElements() {
    // looking for nested components
    // filtering the tag name which
    // must contain the string "SL-" (shoelace component)
    return createTreeWalker(this, NodeFilter.SHOW_ELEMENT, (node: Element) =>
      node.tagName.startsWith('SL-') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
    );
  }

  handleSlotChanged() {
    for (let el of this.getSlottedElements()) {
      this.updateLocale(el, this.lang);
    }
  }

  render() {
    return html`<slot @slotchange=${this.handleSlotChanged}></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-locale': SlLocale;
  }
}
