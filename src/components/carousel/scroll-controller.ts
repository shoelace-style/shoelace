import { debounce } from '../../internal/debounce.js';
import { prefersReducedMotion } from '../../internal/animate.js';
import { waitForEvent } from '../../internal/event.js';
import type { ReactiveController, ReactiveElement } from 'lit';

interface ScrollHost extends ReactiveElement {
  scrollContainer: HTMLElement;
}

/**
 * A controller for handling scrolling and mouse dragging.
 */
export class ScrollController<T extends ScrollHost> implements ReactiveController {
  private host: T;
  private pointers = new Set();

  dragging = false;
  scrolling = false;
  mouseDragging = false;

  constructor(host: T) {
    this.host = host;
    host.addController(this);
  }

  async hostConnected() {
    const host = this.host;
    await host.updateComplete;

    const scrollContainer = host.scrollContainer;

    scrollContainer.addEventListener('scroll', this.handleScroll, { passive: true });
    scrollContainer.addEventListener('pointerdown', this.handlePointerDown);
    scrollContainer.addEventListener('pointerup', this.handlePointerUp);
    scrollContainer.addEventListener('pointercancel', this.handlePointerUp);
    scrollContainer.addEventListener('touchstart', this.handleTouchStart, { passive: true });
    scrollContainer.addEventListener('touchend', this.handleTouchEnd);
  }

  hostDisconnected(): void {
    const host = this.host;
    const scrollContainer = host.scrollContainer;

    scrollContainer.removeEventListener('scroll', this.handleScroll);
    scrollContainer.removeEventListener('pointerdown', this.handlePointerDown);
    scrollContainer.removeEventListener('pointerup', this.handlePointerUp);
    scrollContainer.removeEventListener('pointercancel', this.handlePointerUp);
    scrollContainer.removeEventListener('touchstart', this.handleTouchStart);
    scrollContainer.removeEventListener('touchend', this.handleTouchEnd);
  }

  handleScroll = () => {
    if (!this.scrolling) {
      this.scrolling = true;
      this.host.requestUpdate();
    }
    this.handleScrollEnd();
  };

  @debounce(100)
  handleScrollEnd() {
    if (!this.pointers.size) {
      // If no pointer is active in the scroll area then the scroll has ended
      this.scrolling = false;
      this.host.scrollContainer.dispatchEvent(
        new CustomEvent('scrollend', {
          bubbles: false,
          cancelable: false
        })
      );
      this.host.requestUpdate();
    } else {
      // otherwise let's wait a bit more
      this.handleScrollEnd();
    }
  }

  handlePointerDown = (event: PointerEvent) => {
    if (event.pointerType === 'touch') {
      return;
    }

    this.pointers.add(event.pointerId);

    const canDrag = this.mouseDragging && !this.dragging && event.button === 0;
    if (canDrag) {
      event.preventDefault();

      this.host.scrollContainer.addEventListener('pointermove', this.handlePointerMove);
    }
  };

  handlePointerMove = (event: PointerEvent) => {
    const scrollContainer = this.host.scrollContainer;

    const hasMoved = !!event.movementX || !!event.movementY;
    if (!this.dragging && hasMoved) {
      // Start dragging if it hasn't yet
      scrollContainer.setPointerCapture(event.pointerId);
      this.handleDragStart();
    } else if (scrollContainer.hasPointerCapture(event.pointerId)) {
      // Ignore pointers that we are not tracking
      this.handleDrag(event);
    }
  };

  handlePointerUp = (event: PointerEvent) => {
    this.pointers.delete(event.pointerId);
    this.host.scrollContainer.releasePointerCapture(event.pointerId);

    if (this.pointers.size === 0) {
      this.handleDragEnd();
    }
  };

  handleTouchEnd = (event: TouchEvent) => {
    for (const touch of event.changedTouches) {
      this.pointers.delete(touch.identifier);
    }
  };

  handleTouchStart = (event: TouchEvent) => {
    for (const touch of event.touches) {
      this.pointers.add(touch.identifier);
    }
  };

  handleDragStart() {
    const host = this.host;

    this.dragging = true;
    host.scrollContainer.style.setProperty('scroll-snap-type', 'unset');
    host.requestUpdate();
  }

  handleDrag(event: PointerEvent) {
    this.host.scrollContainer.scrollBy({
      left: -event.movementX,
      top: -event.movementY
    });
  }

  async handleDragEnd() {
    const host = this.host;
    const scrollContainer = host.scrollContainer;

    scrollContainer.removeEventListener('pointermove', this.handlePointerMove);
    this.dragging = false;

    const startLeft = scrollContainer.scrollLeft;
    const startTop = scrollContainer.scrollTop;

    scrollContainer.style.removeProperty('scroll-snap-type');
    const finalLeft = scrollContainer.scrollLeft;
    const finalTop = scrollContainer.scrollTop;

    scrollContainer.style.setProperty('scroll-snap-type', 'unset');
    scrollContainer.scrollTo({ left: startLeft, top: startTop, behavior: 'auto' });
    scrollContainer.scrollTo({ left: finalLeft, top: finalTop, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });

    if (this.scrolling) {
      await waitForEvent(scrollContainer, 'scrollend');
    }

    scrollContainer.style.removeProperty('scroll-snap-type');

    host.requestUpdate();
  }
}
