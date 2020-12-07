import { Component, Element, Event, EventEmitter, h } from '@stencil/core';

/**
 * @since 2.0
 * @status experimental
 */

@Component({
  tag: 'sl-resize-observer',
  styleUrl: 'resize-observer.scss',
  shadow: true
})
export class ResizeObserverUtility {
  resizeObserver: ResizeObserver;
  observedElements: HTMLElement[] = [];

  @Element() host: HTMLSlResizeObserverElement;

  /** Emitted when the element is resized. */
  @Event({ eventName: 'sl-resize' }) slResize: EventEmitter<readonly ResizeObserverEntry[]>;

  connectedCallback() {
    this.resizeObserver = new ResizeObserver(entries => this.slResize.emit(entries));
    this.handleSlotChange = this.handleSlotChange.bind(this);
  }

  disconnectedCallback() {
    this.resizeObserver.disconnect();
  }

  handleSlotChange() {
    const slot = this.host.shadowRoot.querySelector('slot');
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
    return <slot onSlotchange={this.handleSlotChange} />;
  }
}
