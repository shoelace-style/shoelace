import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { emit } from '../../internal/event';
import { watch } from '../../internal/watch';
import styles from './resize-observer.styles';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - One or more elements to watch for resizing.
 *
 * @event {{ entries: ResizeObserverEntry[] }} sl-resize - Emitted when the element is resized.
 */
@customElement('sl-resize-observer')
export default class SlResizeObserver extends LitElement {
  static styles = styles;

  private resizeObserver: ResizeObserver;
  private observedElements: HTMLElement[] = [];

  /** Disables the observer. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      emit(this, 'sl-resize', { detail: { entries } });
    });

    if (!this.disabled) {
      this.startObserver();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopObserver();
  }

  handleSlotChange() {
    if (!this.disabled) {
      this.startObserver();
    }
  }

  startObserver() {
    const slot = this.shadowRoot!.querySelector('slot')!;

    if (slot) {
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
  }

  stopObserver() {
    this.resizeObserver.disconnect();
  }

  @watch('disabled', { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    if (this.disabled) {
      this.stopObserver();
    } else {
      this.startObserver();
    }
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
