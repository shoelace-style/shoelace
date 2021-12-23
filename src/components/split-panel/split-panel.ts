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
 * @csspart divider - The divider that separates the primary and secondary panels.
 *
 * @slot start - The start panel.
 * @slot end - The end panel.
 * @slot handle - An optional handle to render at the center of the divider.
 *
 * @cssproperty [--divider-width=4px] - The width of the visible divider.
 * @cssproperty [--divider-hit-area=12px] - The invisible region around the divider where dragging can occur.
 * @cssproperty [--min=0] - The minimum allowed size of the primary panel.
 * @cssproperty [--max=100%] - The maximum allowed size of the primary panel.
 */
@customElement('sl-split-panel')
export default class SlSplitPanel extends LitElement {
  static styles = styles;

  private localize = new LocalizeController(this);
  private positionPercentage: number;
  private resizeObserver: ResizeObserver;
  private size: number;

  @query('.divider') divider: HTMLElement;

  /**
   * The current position of the divider from the primary panel's edge. Defaults to 50% of the container's intial size.
   */
  @property({ type: Number, reflect: true }) position: number;

  /** Draws the split panel in a vertical orientation with the start and end panels stacked. */
  @property({ type: Boolean, reflect: true }) vertical = false;

  /** Disables resizing on the split panel. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * When the host element is resized, the primary panel will maintain its size and the other panel will grow or shrink
   * to fit the remaining space. If no primary panel is designated, both panels will resize proportionally when the host
   * element is resized.
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
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.unobserve(this);
  }

  firstUpdated() {
    const { width, height } = this.getBoundingClientRect();
    this.size = this.vertical ? height : width;

    if (!this.position) {
      this.position = this.size / 2;
    }

    this.positionPercentage = this.getPositionAsPercentage();
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
      let newPosition = this.vertical ? y : x;

      // Flip for end panels
      if (this.primary === 'end') {
        newPosition = this.size - newPosition;
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

          if (newPosition >= snapPoint - this.snapThreshold && newPosition <= snapPoint + this.snapThreshold) {
            newPosition = snapPoint;
          }
        });
      }

      this.position = clamp(newPosition, 0, this.size);
      this.positionPercentage = this.getPositionAsPercentage();
    });
  }

  handleKeyDown(event: KeyboardEvent) {
    if (this.disabled) {
      return;
    }

    if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      let newPercentage = this.getPositionAsPercentage();
      let incr = (event.shiftKey ? 10 : 1) * (this.primary === 'end' ? -1 : 1);

      event.preventDefault();

      if ((event.key === 'ArrowLeft' && !this.vertical) || (event.key === 'ArrowUp' && this.vertical)) {
        newPercentage -= incr;
      }

      if ((event.key === 'ArrowRight' && !this.vertical) || (event.key === 'ArrowDown' && this.vertical)) {
        newPercentage += incr;
      }

      if (event.key === 'Home') {
        newPercentage = this.primary === 'end' ? 100 : 0;
      }

      if (event.key === 'End') {
        newPercentage = this.primary === 'end' ? 0 : 100;
      }

      newPercentage = clamp(newPercentage, 0, 100);

      this.setPositionAsPercentage(newPercentage);
    }
  }

  @watch('position')
  handlePositionChange() {
    emit(this, 'sl-reposition');
  }

  handleResize(entries: ResizeObserverEntry[]) {
    const { width, height } = entries[0].contentRect;
    this.size = this.vertical ? height : width;

    // Resize proportionally when a primary panel isn't set
    if (!this.primary && this.positionPercentage) {
      this.setPositionAsPercentage(this.positionPercentage);
    }
  }

  /** Gets the divider's position as a percentage of the container's size (0-100). */
  getPositionAsPercentage() {
    if (this.size === 0) {
      return 0;
    }

    return (this.position / this.size) * 100;
  }

  /** Sets the divider position as a percentage of the container's size (0-100). */
  setPositionAsPercentage(value: number) {
    this.position = clamp(this.size * (value / 100), 0, this.size);
  }

  render() {
    const gridTemplate = this.vertical ? 'gridTemplateRows' : 'gridTemplateColumns';
    const primary = `
      clamp(
        0%,
        clamp(
          var(--min),
          calc(${this.position}px - var(--divider-width) / 2),
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
      <div class="start">
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

      <div class="end">
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
