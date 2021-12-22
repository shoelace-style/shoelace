import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import { clamp } from '../../internal/math';
import { emit } from '../../internal/event';
import { watch } from '../../internal/watch';
import styles from './split-panel.styles';

/**
 * @since 2.0
 * @status experimental
 *
 * @event sl-reposition - Emitted when the divider is repositioned.
 * @event {{ entries: ResizeObserverEntry[] }} sl-resize - Emitted when the container is resized.
 *
 * @slot start - The start panel.
 * @slot end - The end panel.
 *
 * @cssproperty [--divider-width=4px] - The width of the visible divider.
 * @cssproperty [--divider-hit-area=12px] - The invisible area around the divider where dragging can occur.
 */
@customElement('sl-split-panel')
export default class SlSplitPanel extends LitElement {
  static styles = styles;

  private resizeObserver: ResizeObserver;
  private size: number;

  @query('.divider') divider: HTMLElement;

  /**
   * The current position of the divider from the fixed panel's edge. Defaults to 50% of the container's intial size.
   */
  @property({ type: Number, reflect: true }) position: number;

  /** Draws the split panel in a vertical orientation with the start and end panels stacked. */
  @property({ type: Boolean, reflect: true }) vertical = false;

  /** Disables resizing on the split panel. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * When the host element is resized, the fixed panel will maintain its size and the other panel will grow or shrink to
   * fit the remaining space.
   */
  @property() fixed: 'start' | 'end' = 'start';

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
  }

  handleDrag(event: MouseEvent | TouchEvent) {
    const isMouseEvent = event instanceof MouseEvent;
    const originalX = isMouseEvent ? event.pageX : event.changedTouches[0].pageX;
    const originalY = isMouseEvent ? event.pageY : event.changedTouches[0].pageY;
    const original = this.vertical ? originalY : originalX;
    const originalPosition = Number(this.position);

    const move = (event: MouseEvent | TouchEvent) => {
      const isMouseEvent = event instanceof MouseEvent;
      const currentX = isMouseEvent ? event.pageX : event.changedTouches[0].pageX;
      const currentY = isMouseEvent ? event.pageY : event.changedTouches[0].pageY;
      const current = this.vertical ? currentY : currentX;
      let delta = this.fixed === 'end' ? original - current : current - original;
      let newPosition = originalPosition + delta;

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
    };

    const stop = () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('touchmove', move);
      document.removeEventListener('mouseup', stop);
      document.removeEventListener('touchend', stop);
    };

    if (!this.disabled) {
      document.addEventListener('mousemove', move);
      document.addEventListener('touchmove', move);
      document.addEventListener('mouseup', stop);
      document.addEventListener('touchend', stop);
    }

    // Prevent text selection
    event.preventDefault();
  }

  handleKeyDown(event: KeyboardEvent) {
    if (this.disabled) {
      return;
    }

    if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      const incr = event.shiftKey ? 10 : 1;
      let newPercentage = this.getPositionPercentage();

      event.preventDefault();

      if ((event.key === 'ArrowLeft' && !this.vertical) || (event.key === 'ArrowUp' && this.vertical)) {
        newPercentage -= incr;
      }

      if ((event.key === 'ArrowRight' && !this.vertical) || (event.key === 'ArrowDown' && this.vertical)) {
        newPercentage += incr;
      }

      if (event.key === 'Home') {
        newPercentage = 0;
      }

      if (event.key === 'End') {
        newPercentage = 100;
      }

      newPercentage = clamp(newPercentage, 0, 100);

      this.setPositionPercentage(newPercentage);
    }
  }

  @watch('position')
  handlePositionChange() {
    emit(this, 'sl-reposition');
  }

  handleResize(entries: ResizeObserverEntry[]) {
    const { width, height } = entries[0].contentRect;
    this.size = this.vertical ? height : width;

    emit(this, 'sl-resize', { detail: { entries } });
  }

  /** Gets the divider's position as a percentage of the container's size. */
  getPositionPercentage() {
    if (this.size === 0) {
      return 0;
    }

    return (this.position / this.size) * 100;
  }

  /** Sets the divider position as a percentage of the container's size. */
  setPositionPercentage(value: number) {
    this.position = clamp(this.size * (value / 100), 0, this.size);
  }

  render() {
    let start: string;
    let end: string;

    // TODO - min / max
    // TODO - custom divider styles + handle

    if (this.fixed === 'end') {
      start = `1 1 0%`;
      end = `0 0 calc((${this.position}px - var(--divider-width) / 2)`;
    } else {
      start = `0 0 calc(${this.position}px - var(--divider-width) / 2)`;
      end = `1 1 0%`;
    }

    return html`
      <div
        class="start"
        style=${styleMap({
          flex: start
        })}
      >
        <slot name="start"></slot>
      </div>

      <div
        class="divider"
        tabindex=${ifDefined(this.disabled ? undefined : '0')}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleDrag}
        @touchstart=${this.handleDrag}
      ></div>

      <div
        class="end"
        style=${styleMap({
          flex: end
        })}
      >
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
