import { html, styleMap, Shoemaker } from '@shoelace-style/shoemaker';
import styles from 'sass:./image-comparer.scss';
import { clamp } from '../../internal/math';

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
 * @part base - The component's base wrapper.
 * @part before - The container that holds the "before" image.
 * @part after - The container that holds the "after" image.
 * @part divider - The divider that separates the images.
 * @part handle - The handle that the user drags to expose the after image.
 *
 * @emit sl-change - Emitted when the slider position changes.
 */
export default class SlImageComparer extends Shoemaker {
  static tag = 'sl-image-comparer';
  static props = ['position'];
  static styles = styles;

  private base: HTMLElement;
  private handle: HTMLElement;

  /** The position of the divider as a percentage. */
  position = 50;

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
      this.position = clamp((x / width) * 100, 0, 100);
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

  watchPosition() {
    this.emit('sl-change');
  }

  render() {
    return html`
      <div
        ref=${(el: HTMLElement) => (this.base = el)}
        part="base"
        class="image-comparer"
        onkeydown=${this.handleKeyDown.bind(this)}
      >
        <div class="image-comparer__image">
          <div part="before" class="image-comparer__before">
            <slot name="before" />
          </div>

          <div
            part="after"
            class="image-comparer__after"
            style="${styleMap({ clipPath: `inset(0 ${100 - this.position}% 0 0)` })}"
          >
            <slot name="after" />
          </div>
        </div>

        <div
          part="divider"
          class="image-comparer__divider"
          style="${styleMap({ left: this.position + '%' })}"
          onmousedown=${this.handleDrag.bind(this)}
          ontouchstart=${this.handleDrag.bind(this)}
        >
          <div
            ref=${(el: HTMLElement) => (this.handle = el)}
            part="handle"
            class="image-comparer__handle"
            role="scrollbar"
            aria-valuenow="${this.position}"
            aria-valuemin="0"
            aria-valuemax="100"
            tabindex="0"
          >
            <slot name="handle-icon">
              <sl-icon class="image-comparer__handle-icon" name="grip-vertical" />
            </slot>
          </div>
        </div>
      </div>
    `;
  }
}
