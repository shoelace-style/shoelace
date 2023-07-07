import type { ReactiveController, ReactiveElement } from 'lit';

/**
 * A controller that repeatedly calls the specified callback with the provided interval time.
 * The timer is automatically paused while the user is interacting with the component.
 */
export class AutoplayController implements ReactiveController {
  private host: ReactiveElement;
  private timerId = 0;
  private tickCallback: () => void;
  private activeInteractions = 0;

  paused = false;
  stopped = true;

  constructor(host: ReactiveElement, tickCallback: () => void) {
    host.addController(this);

    this.host = host;
    this.tickCallback = tickCallback;
  }

  hostConnected(): void {
    this.host.addEventListener('mouseenter', this.pause);
    this.host.addEventListener('mouseleave', this.resume);
    this.host.addEventListener('focusin', this.pause);
    this.host.addEventListener('focusout', this.resume);
    this.host.addEventListener('touchstart', this.pause, { passive: true });
    this.host.addEventListener('touchend', this.resume);
  }

  hostDisconnected(): void {
    this.stop();

    this.host.removeEventListener('mouseenter', this.pause);
    this.host.removeEventListener('mouseleave', this.resume);
    this.host.removeEventListener('focusin', this.pause);
    this.host.removeEventListener('focusout', this.resume);
    this.host.removeEventListener('touchstart', this.pause);
    this.host.removeEventListener('touchend', this.resume);
  }

  start(interval: number) {
    this.stop();

    this.stopped = false;
    this.timerId = window.setInterval(() => {
      if (!this.paused) {
        this.tickCallback();
      }
    }, interval);
  }

  stop() {
    clearInterval(this.timerId);
    this.stopped = true;
    this.host.requestUpdate();
  }

  pause = () => {
    if (!this.activeInteractions++) {
      this.paused = true;
      this.host.requestUpdate();
    }
  };

  resume = () => {
    if (!--this.activeInteractions) {
      this.paused = false;
      this.host.requestUpdate();
    }
  };
}
