import { LitElement, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { emit } from '../../internal/event';
import styles from 'sass:./resize-observer.scss';

/**
 * @since 2.0
 * @status stable
 *
 * @event {{ entries: ResizeObserverEntry[] }} sl-resize - Emitted when the element is resized.
 */
@customElement('sl-resize-observer')
export default class SlResizeObserver extends LitElement {
  static styles = unsafeCSS(styles);

  private resizeObserver: ResizeObserver;
  private observedElements: HTMLElement[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      emit(this, 'sl-resize', { detail: { entries } });
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.disconnect();
  }

  handleSlotChange() {
    const slot = this.shadowRoot!.querySelector('slot')!;
    const elements = slot.assignedElements({ flatten: true }) as HTMLElement[];

    // Unwatch previous elements
    this.observedElements.map(el => this.resizeObserver.unobserve(el));
    this.observedElements = [];

    // Watch new elements
    elements.map(el => {
      this.resizeObserver.observe(el);
      this.observedElements.push(el);
    });
  }

  render() {
    return html` <slot @slotchange=${this.handleSlotChange}></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-resize-observer': SlResizeObserver;
  }
}
