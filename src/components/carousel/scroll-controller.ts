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
    scrollContainer.addEventListener('scrollend', this.handleScrollEnd, true);
    scrollContainer.addEventListener('pointerdown', this.handlePointerDown);
    scrollContainer.addEventListener('pointerup', this.handlePointerUp);
    scrollContainer.addEventListener('pointercancel', this.handlePointerUp);
  }

  hostDisconnected(): void {
    const host = this.host;
    const scrollContainer = host.scrollContainer;

    scrollContainer.removeEventListener('scroll', this.handleScroll);
    scrollContainer.removeEventListener('scrollend', this.handleScrollEnd, true);
    scrollContainer.removeEventListener('pointerdown', this.handlePointerDown);
    scrollContainer.removeEventListener('pointerup', this.handlePointerUp);
    scrollContainer.removeEventListener('pointercancel', this.handlePointerUp);
  }

  handleScroll = () => {
    if (!this.scrolling) {
      this.scrolling = true;
      this.host.requestUpdate();
    }
  };

  handleScrollEnd = () => {
    if (this.scrolling && !this.dragging) {
      this.scrolling = false;
      this.host.requestUpdate();
    }
  };

  handlePointerDown = (event: PointerEvent) => {
    // Do not handle drag for touch interactions as scroll is natively supported
    if (event.pointerType === 'touch') {
      return;
    }

    const canDrag = this.mouseDragging && event.button === 0;
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
    this.host.scrollContainer.releasePointerCapture(event.pointerId);

    this.handleDragEnd();
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

  handleDragEnd() {
    const host = this.host;
    const scrollContainer = host.scrollContainer;

    scrollContainer.removeEventListener('pointermove', this.handlePointerMove);

    const startLeft = scrollContainer.scrollLeft;
    const startTop = scrollContainer.scrollTop;

    scrollContainer.style.removeProperty('scroll-snap-type');
    const finalLeft = scrollContainer.scrollLeft;
    const finalTop = scrollContainer.scrollTop;

    scrollContainer.style.setProperty('scroll-snap-type', 'unset');
    scrollContainer.scrollTo({ left: startLeft, top: startTop, behavior: 'auto' });
    scrollContainer.scrollTo({ left: finalLeft, top: finalTop, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });

    // Wait for scroll to be applied
    requestAnimationFrame(async () => {
      if (startLeft !== finalLeft || startTop !== finalTop) {
        await waitForEvent(scrollContainer, 'scrollend');
      }

      scrollContainer.style.removeProperty('scroll-snap-type');

      this.dragging = false;
      host.requestUpdate();
    });
  }
}
