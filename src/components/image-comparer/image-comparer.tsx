import { Component, Event, EventEmitter, Prop, State, Watch, h } from '@stencil/core';
import { clamp } from '../../utilities/math';

/**
 * @since 2.0
 * @status experimental
 *
 * @slot before - The before image, an `<img>` or `<svg>` element.
 * @slot after - The after image, an `<img>` or `<svg>` element.
 *
 * @part base - The component's base wrapper.
 * @part before - The container that holds the "before" image.
 * @part after - The container that holds the "after" image.
 * @part divider - The divider that separates the images.
 * @part handle - The handle that the user drags to expose the after image.
 */

@Component({
  tag: 'sl-image-comparer',
  styleUrl: 'image-comparer.scss',
  shadow: true
})
export class ImageComparer {
  base: HTMLElement;
  divider: HTMLElement;
  handle: HTMLElement;

  @State() dividerPosition: number;

  /** The position of the divider as a percentage. */
  @Prop({ mutable: true }) position = 50;

  @Watch('position')
  handlePositionChange() {
    this.slChange.emit();
  }

  /** Emitted when the slider position changes. */
  @Event() slChange: EventEmitter;

  connectedCallback() {
    this.dividerPosition = this.position;

    this.handleDrag = this.handleDrag.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleDrag(event: any) {
    const { width } = this.base.getBoundingClientRect();

    function drag(event: any, container: HTMLElement, onMove: (x: number, y: number) => void) {
      const move = (event: any) => {
        const dims = container.getBoundingClientRect();
        const offsetX = dims.left + container.ownerDocument.defaultView.pageXOffset;
        const offsetY = dims.top + container.ownerDocument.defaultView.pageYOffset;
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
      this.dividerPosition = this.position;
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
      this.dividerPosition = newPosition;
    }
  }

  render() {
    return (
      <div ref={el => (this.base = el)} part="base" class="image-comparer" onKeyDown={this.handleKeyDown}>
        <div class="image-comparer__image">
          <div part="before" class="image-comparer__before">
            <slot name="before" />
          </div>

          <div
            part="after"
            class="image-comparer__after"
            style={{
              clipPath: `inset(0 ${100 - this.dividerPosition}% 0 0)`
            }}
          >
            <slot name="after" />
          </div>
        </div>

        <div
          ref={el => (this.divider = el)}
          part="divider"
          class="image-comparer__divider"
          style={{
            left: `${this.dividerPosition}%`
          }}
          onMouseDown={this.handleDrag}
          onTouchStart={this.handleDrag}
        >
          <div
            ref={el => (this.handle = el)}
            part="handle"
            class="image-comparer__handle"
            role="scrollbar"
            aria-valuenow={this.dividerPosition}
            aria-valuemin="0"
            aria-valuemax="100"
            tabIndex={0}
          >
            <sl-icon class="image-comparer__handle-icon" name="grip-horizontal" />
          </div>
        </div>
      </div>
    );
  }
}
