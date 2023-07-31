import { getTabbableElements } from './tabbable.js';

let activeModals: HTMLElement[] = [];

export default class Modal {
  element: HTMLElement;
  tabDirection: 'forward' | 'backward' = 'forward';
  currentFocus: HTMLElement | null;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  activate() {
    activeModals.push(this.element);
    document.addEventListener('focusin', this.handleFocusIn);
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  deactivate() {
    activeModals = activeModals.filter(modal => modal !== this.element);
    this.currentFocus = null;
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
      const tabbableElements = getTabbableElements(this.element);
      if (!this.element.matches(':focus-within')) {
        const start = tabbableElements[0];
        const end = tabbableElements[tabbableElements.length - 1];
        const target = this.tabDirection === 'forward' ? start : end;

        if (typeof target?.focus === 'function') {
          this.currentFocus = target;
          target.focus({ preventScroll: true });
        }
      }
    }
  }

  private handleFocusIn = () => {
    this.checkFocus();
  };

  get currentFocusIndex() {
    return getTabbableElements(this.element).findIndex(el => el === this.currentFocus);
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;

    if (event.shiftKey) {
      this.tabDirection = 'backward';
    } else {
      this.tabDirection = 'forward';
    }

    event.preventDefault();

    const tabbableElements = getTabbableElements(this.element);
    const start = tabbableElements[0];
    let focusIndex = this.currentFocusIndex;

    if (focusIndex === -1) {
      this.currentFocus = start;
      this.currentFocus.focus({ preventScroll: true });
      return;
    }

    const addition = this.tabDirection === 'forward' ? 1 : -1;

    if (focusIndex + addition >= tabbableElements.length) {
      focusIndex = 0;
    } else if (this.currentFocusIndex + addition < 0) {
      focusIndex = tabbableElements.length - 1;
    } else {
      focusIndex += addition;
    }

    this.currentFocus = tabbableElements[focusIndex];
    this.currentFocus?.focus({ preventScroll: true });

    setTimeout(() => this.checkFocus());
  };

  private handleKeyUp = () => {
    this.tabDirection = 'forward';
  };
}
