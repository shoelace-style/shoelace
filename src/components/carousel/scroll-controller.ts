import { debounce } from 'src/internal/debounce';
import { prefersReducedMotion } from 'src/internal/animate';
import { waitForEvent } from 'src/internal/event';
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

    this.handleScroll = this.handleScroll.bind(this);
    this.handlePointerDown = this.handlePointerDown.bind(this);
    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.handlePointerUp = this.handlePointerUp.bind(this);
    this.handlePointerUp = this.handlePointerUp.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
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

  handleScroll() {
    if (!this.scrolling) {
      this.scrolling = true;
      this.host.requestUpdate();
    }
    this.handleScrollEnd();
  }

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

  handlePointerDown(event: PointerEvent) {
    if (event.pointerType === 'touch') {
      return;
    }

    this.pointers.add(event.pointerId);

    if (this.mouseDragging && this.pointers.size === 1) {
      event.preventDefault();

      const scrollContainer = this.host.scrollContainer;
      const target = event.target as HTMLElement;

      target.setPointerCapture(event.pointerId);
      scrollContainer.addEventListener('pointermove', this.handlePointerMove);
    }
  }

  handlePointerMove(event: PointerEvent) {
    const target = event.target as HTMLElement;

    // Ignore pointers that we are not tracking
    if (target.hasPointerCapture(event.pointerId)) {
      if (!this.dragging) {
        // Start dragging if it hasn't yet
        this.handleDragStart();
      }

      this.handleDrag(event);
    }
  }

  handlePointerUp(event: PointerEvent) {
    const target = event.target as HTMLElement;

    this.pointers.delete(event.pointerId);
    target.releasePointerCapture(event.pointerId);

    if (this.pointers.size === 0) {
      this.handleDragEnd();
    }
  }

  handleTouchEnd(event: TouchEvent) {
    for (const touch of event.changedTouches) {
      this.pointers.delete(touch.identifier);
    }
  }

  handleTouchStart(event: TouchEvent) {
    for (const touch of event.touches) {
      this.pointers.add(touch.identifier);
    }
  }

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
