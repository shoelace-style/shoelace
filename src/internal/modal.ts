import { getTabbableBoundary } from './tabbable';

let activeModals: HTMLElement[] = [];

export default class Modal {
  element: HTMLElement;
  tabDirection: 'forward' | 'backward' = 'forward';

  constructor(element: HTMLElement) {
    this.element = element;
    this.handleFocusIn = this.handleFocusIn.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  activate() {
    activeModals.push(this.element);
    document.addEventListener('focusin', this.handleFocusIn);
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  deactivate() {
    activeModals = activeModals.filter(modal => modal !== this.element);
    document.removeEventListener('focusin', this.handleFocusIn);
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
  }

  isActive() {
    // The "active" modal is always the most recent one shown
    return activeModals[activeModals.length - 1] === this.element;
  }

  checkFocus() {
    if (this.isActive()) {
      if (!this.element.matches(':focus-within')) {
        const { start, end } = getTabbableBoundary(this.element);
        const target = this.tabDirection === 'forward' ? start : end;

        if (typeof target?.focus === 'function') {
          target.focus({ preventScroll: true });
        }
      }
    }
  }

  handleFocusIn() {
    this.checkFocus();
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab' && event.shiftKey) {
      this.tabDirection = 'backward';

      // Ensure focus remains trapped after the key is pressed
      requestAnimationFrame(() => this.checkFocus());
    }
  }

  handleKeyUp() {
    this.tabDirection = 'forward';
  }
}
