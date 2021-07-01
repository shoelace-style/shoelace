import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { styleMap } from 'lit-html/directives/style-map';
import { clamp } from '../../internal/math';
import { emit } from '../../internal/event';
import { watch } from '../../internal/watch';
import styles from 'sass:./image-comparer.scss';

/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon
 *
 * @slot before - The before image, an `<img>` or `<svg>` element.
 * @slot after - The after image, an `<img>` or `<svg>` element.
 * @slot handle-icon - The icon used inside the handle.
 *
 * @event sl-change - Emitted when the position changes.
 *
 * @csspart base - The component's base wrapper.
 * @csspart before - The container that holds the "before" image.
 * @csspart after - The container that holds the "after" image.
 * @csspart divider - The divider that separates the images.
 * @csspart handle - The handle that the user drags to expose the after image.
 *
 * @cssproperty --divider-width - The width of the dividing line.
 * @cssproperty --handle-size - The size of the compare handle.
 */
@customElement('sl-image-comparer')
export default class SlImageComparer extends LitElement {
  static styles = unsafeCSS(styles);

  @query('.image-comparer') base: HTMLElement;
  @query('.image-comparer__handle') handle: HTMLElement;

  /** The position of the divider as a percentage. */
  @property({ type: Number, reflect: true }) position = 50;

  handleDrag(event: any) {
    const { width } = this.base.getBoundingClientRect();

    function drag(event: any, container: HTMLElement, onMove: (x: number, y: number) => void) {
      const move = (event: any) => {
        const dims = container.getBoundingClientRect();
        const defaultView = container.ownerDocument.defaultView!;
        const offsetX = dims.left + defaultView.pageXOffset;
        const offsetY = dims.top + defaultView.pageYOffset;
        const x = (event.changedTouches ? event.changedTouches[0].pageX : event.pageX) - offsetX;
        const y = (event.changedTouches ? event.changedTouches[0].pageY : event.pageY) - offsetY;

        onMove(x, y);
      };

      // Move on init
      move(event);

      const stop = () => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('touchmove', move);
        document.removeEventListener('mouseup', stop);
        document.removeEventListener('touchend', stop);
      };

      document.addEventListener('mousemove', move);
      document.addEventListener('touchmove', move);
      document.addEventListener('mouseup', stop);
      document.addEventListener('touchend', stop);
    }

    this.handle.focus();
    event.preventDefault();

    drag(event, this.base, x => {
      this.position = Number(clamp((x / width) * 100, 0, 100).toFixed(2));
    });
  }

  handleKeyDown(event: KeyboardEvent) {
    if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      const incr = event.shiftKey ? 10 : 1;
      let newPosition = this.position;

      event.preventDefault();

      if (event.key === 'ArrowLeft') newPosition = newPosition - incr;
      if (event.key === 'ArrowRight') newPosition = newPosition + incr;
      if (event.key === 'Home') newPosition = 0;
      if (event.key === 'End') newPosition = 100;
      newPosition = clamp(newPosition, 0, 100);

      this.position = newPosition;
    }
  }

  @watch('position', { waitUntilFirstUpdate: true })
  handlePositionChange() {
    emit(this, 'sl-change');
  }

  render() {
    return html`
      <div part="base" class="image-comparer" @keydown=${this.handleKeyDown}>
        <div class="image-comparer__image">
          <div part="before" class="image-comparer__before">
            <slot name="before"></slot>
          </div>

          <div
            part="after"
            class="image-comparer__after"
            style=${styleMap({ clipPath: `inset(0 ${100 - this.position}% 0 0)` })}
          >
            <slot name="after"></slot>
          </div>
        </div>

        <div
          part="divider"
          class="image-comparer__divider"
          style=${styleMap({ left: this.position + '%' })}
          @mousedown=${this.handleDrag}
          @touchstart=${this.handleDrag}
        >
          <div
            part="handle"
            class="image-comparer__handle"
            role="scrollbar"
            aria-valuenow=${this.position}
            aria-valuemin="0"
            aria-valuemax="100"
            tabindex="0"
          >
            <slot name="handle-icon">
              <sl-icon class="image-comparer__handle-icon" name="grip-vertical" library="system"></sl-icon>
            </slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-image-comparer': SlImageComparer;
  }
}
