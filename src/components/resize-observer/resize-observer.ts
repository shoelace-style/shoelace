import { html, Shoemaker } from '@shoelace-style/shoemaker';
import styles from 'sass:./resize-observer.scss';

/**
 * @since 2.0
 * @status experimental
 *
 * @emit sl-resize - Emitted when the element is resized. Event details will contain:
 * `{ entries: ResizeObserverEntry[] }`
 */
export default class SlResizeObserver extends Shoemaker {
  static tag = 'sl-resize-observer';
  static styles = styles;

  private resizeObserver: ResizeObserver;
  private observedElements: HTMLElement[] = [];

  onReady() {
    this.resizeObserver = new ResizeObserver(entries => this.emit('sl-resize', { detail: { entries } }));
  }

  onDisconnect() {
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
    return html` <slot onslotchange=${this.handleSlotChange.bind(this)} /> `;
  }
}
