import { getTabbableBoundary } from '../internal/tabbable';

let activeModals: HTMLElement[] = [];

export default class Modal {
  element: HTMLElement;
  tabDirection: 'forward' | 'backward' = 'forward';

  constructor(element: HTMLElement) {
    this.element = element;
    this.handleFocusIn = this.handleFocusIn.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  activate() {
    activeModals.push(this.element);
    document.addEventListener('focusin', this.handleFocusIn);
    document.addEventListener('keydown', this.handleKeyDown);
  }

  deactivate() {
    activeModals = activeModals.filter(modal => modal !== this.element);
    document.removeEventListener('focusin', this.handleFocusIn);
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  isActive() {
    // The "active" modal is always the most recent one shown
    return activeModals[activeModals.length - 1] === this.element;
  }

  handleFocusIn(event: Event) {
    const path = event.composedPath();

    // Trap focus so it doesn't go out of the modal's boundary
    if (this.isActive() && !path.includes(this.element)) {
      const { start, end } = getTabbableBoundary(this.element);
      const target = this.tabDirection === 'forward' ? start : end;

      if (typeof target?.focus === 'function') {
        target.focus({ preventScroll: true });
      }
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    // Quick hack to determine tab direction
    if (event.key === 'Tab' && event.shiftKey) {
      this.tabDirection = 'backward';
      setTimeout(() => (this.tabDirection = 'forward'));
    }
  }
}
