import { LitElement, html, unsafeCSS } from 'lit-element';
import { event, EventEmitter, tag } from '../../internal/decorators';
import styles from 'sass:./resize-observer.scss';

/**
 * @since 2.0
 * @status experimental
 */
@tag('sl-resize-observer')
export default class SlResizeObserver extends LitElement {
  static styles = unsafeCSS(styles);

  private resizeObserver: ResizeObserver;
  private observedElements: HTMLElement[] = [];

  /** Emitted when the element is resized. */
  @event('sl-resize') slResize: EventEmitter<{ entries: ResizeObserverEntry[] }>;

  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver(entries => this.slResize.emit({ detail: { entries } }));
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