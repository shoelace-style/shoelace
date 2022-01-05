import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { clamp } from '../../internal/math';
import { emit } from '../../internal/event';
import { watch } from '../../internal/watch';
import { LocalizeController } from '../../utilities/localize';
import styles from './split-panel.styles';

/**
 * @since 2.0
 * @status experimental
 *
 * @event sl-reposition - Emitted when the divider's position changes.
 *
 * @csspart start - The start panel.
 * @csspart end - The end panel.
 * @csspart panel - Targets both the start and end panels.
 * @csspart divider - The divider that separates the start and end panels.
 *
 * @slot start - The start panel.
 * @slot end - The end panel.
 * @slot handle - An optional handle to render at the center of the divider.
 *
 * @cssproperty [--divider-width=4px] - The width of the visible divider.
 * @cssproperty [--divider-hit-area=12px] - The invisible region around the divider where dragging can occur. This is
 *  usually wider than the divider to facilitate easier dragging.
 * @cssproperty [--min=0] - The minimum allowed size of the primary panel.
 * @cssproperty [--max=100%] - The maximum allowed size of the primary panel.
 */
@customElement('sl-split-panel')
export default class SlSplitPanel extends LitElement {
  static styles = styles;

  private cachedPositionInPixels: number;
  private localize = new LocalizeController(this);
  private resizeObserver: ResizeObserver;
  private size: number;

  @query('.divider') divider: HTMLElement;

  /**
   * The current position of the divider from the primary panel's edge as a percentage 0-100. Defaults to 50% of the
   * container's initial size.
   */
  @property({ type: Number, reflect: true }) position = 50;

  /**
   * The current position of the divider from the primary panel's edge in pixels.
   */
  @property({ attribute: 'position-in-pixels', type: Number }) positionInPixels: number;

  /** Draws the split panel in a vertical orientation with the start and end panels stacked. */
  @property({ type: Boolean, reflect: true }) vertical = false;

  /** Disables resizing. Note that the position may still change as a result of resizing the host element. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * If no primary panel is designated, both panels will resize proportionally when the host element is resized. If a
   * primary panel is designated, it will maintain its size and the other panel will grow or shrink as needed when the
   * host element is resized.
   */
  @property() primary: 'start' | 'end';

  /**
   * One or more space-separated values at which the divider should snap. Values can be in pixels or percentages, e.g.
   * `"100px 50%"`.
   */
  @property() snap: string;

  /** How close the divider must be to a snap point until snapping occurs. */
  @property({ type: Number, attribute: 'snap-threshold' }) snapThreshold = 12;

  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver(entries => this.handleResize(entries));
    this.updateComplete.then(() => this.resizeObserver.observe(this));

    this.detectSize();
    this.cachedPositionInPixels = this.percentageToPixels(this.position);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.unobserve(this);
  }

  private detectSize() {
    const { width, height } = this.getBoundingClientRect();
    this.size = this.vertical ? height : width;
  }

  private percentageToPixels(value: number) {
    return this.size * (value / 100);
  }

  private pixelsToPercentage(value: number) {
    return (value / this.size) * 100;
  }

  handleDrag(event: Event) {
    if (this.disabled) {
      return;
    }

    // Prevent text selection when dragging
    event.preventDefault();

    function drag(container: HTMLElement, onMove: (x: number, y: number) => void) {
      const move = (event: any) => {
        const dims = container.getBoundingClientRect();
        const defaultView = container.ownerDocument.defaultView!;
        const offsetX = dims.left + defaultView.pageXOffset;
        const offsetY = dims.top + defaultView.pageYOffset;
        const x = (event.changedTouches ? event.changedTouches[0].pageX : event.pageX) - offsetX;
        const y = (event.changedTouches ? event.changedTouches[0].pageY : event.pageY) - offsetY;

        onMove(x, y);
      };

      const stop = () => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('touchmove', move);
        document.removeEventListener('mouseup', stop);
        document.removeEventListener('touchend', stop);
      };

      document.addEventListener('mousemove', move, { passive: true });
      document.addEventListener('touchmove', move, { passive: true });
      document.addEventListener('mouseup', stop);
      document.addEventListener('touchend', stop);
    }

    drag(this, (x, y) => {
      let newPositionInPixels = this.vertical ? y : x;

      // Flip for end panels
      if (this.primary === 'end') {
        newPositionInPixels = this.size - newPositionInPixels;
      }

      // Check snap points
      if (this.snap) {
        const snaps = this.snap.split(' ');

        snaps.map(value => {
          let snapPoint: number;

          if (value.endsWith('%')) {
            snapPoint = this.size * (parseFloat(value) / 100);
          } else {
            snapPoint = parseFloat(value);
          }

          if (
            newPositionInPixels >= snapPoint - this.snapThreshold &&
            newPositionInPixels <= snapPoint + this.snapThreshold
          ) {
            newPositionInPixels = snapPoint;
          }
        });
      }

      this.position = clamp(this.pixelsToPercentage(newPositionInPixels), 0, 100);
    });
  }

  handleKeyDown(event: KeyboardEvent) {
    if (this.disabled) {
      return;
    }

    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
      let newPosition = this.position;
      let incr = (event.shiftKey ? 10 : 1) * (this.primary === 'end' ? -1 : 1);

      event.preventDefault();

      if ((event.key === 'ArrowLeft' && !this.vertical) || (event.key === 'ArrowUp' && this.vertical)) {
        newPosition -= incr;
      }

      if ((event.key === 'ArrowRight' && !this.vertical) || (event.key === 'ArrowDown' && this.vertical)) {
        newPosition += incr;
      }

      if (event.key === 'Home') {
        newPosition = this.primary === 'end' ? 100 : 0;
      }

      if (event.key === 'End') {
        newPosition = this.primary === 'end' ? 0 : 100;
      }

      this.position = clamp(newPosition, 0, 100);
    }
  }

  @watch('position')
  handlePositionChange() {
    this.cachedPositionInPixels = this.percentageToPixels(this.position);
    this.positionInPixels = this.percentageToPixels(this.position);
    emit(this, 'sl-reposition');
  }

  @watch('positionInPixels')
  handlePositionInPixelsChange() {
    this.position = this.pixelsToPercentage(this.positionInPixels);
  }

  handleResize(entries: ResizeObserverEntry[]) {
    const { width, height } = entries[0].contentRect;
    this.size = this.vertical ? height : width;

    // Resize when a primary panel is set
    if (this.primary && this.cachedPositionInPixels) {
      this.position = this.pixelsToPercentage(this.cachedPositionInPixels);
    }
  }

  render() {
    const gridTemplate = this.vertical ? 'gridTemplateRows' : 'gridTemplateColumns';
    const primary = `
      clamp(
        0%,
        clamp(
          var(--min),
          ${this.position}% - var(--divider-width) / 2,
          var(--max)
        ),
        calc(100% - var(--divider-width))
      )
    `;
    const secondary = 'auto';

    if (this.primary === 'end') {
      this.style[gridTemplate] = `${secondary} var(--divider-width) ${primary}`;
    } else {
      this.style[gridTemplate] = `${primary} var(--divider-width) ${secondary}`;
    }

    return html`
      <div part="panel start" class="start">
        <slot name="start"></slot>
      </div>

      <div
        part="divider"
        class="divider"
        tabindex=${ifDefined(this.disabled ? undefined : '0')}
        role="separator"
        aria-label=${this.localize.term('resize')}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleDrag}
        @touchstart=${this.handleDrag}
      >
        <slot name="handle"></slot>
      </div>

      <div part="panel end" class="end">
        <slot name="end"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-split-panel': SlSplitPanel;
  }
}
