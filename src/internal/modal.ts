import { activeElements } from './active-elements.js';
import { getTabbableElements } from './tabbable.js';

let activeModals: HTMLElement[] = [];

export default class Modal {
  element: HTMLElement;
  isExternalActivated: boolean;
  tabDirection: 'forward' | 'backward' = 'forward';
  currentFocus: HTMLElement | null;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  /** Activates focus trapping. */
  activate() {
    activeModals.push(this.element);
    document.addEventListener('focusin', this.handleFocusIn);
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  /** Deactivates focus trapping. */
  deactivate() {
    activeModals = activeModals.filter(modal => modal !== this.element);
    this.currentFocus = null;
    document.removeEventListener('focusin', this.handleFocusIn);
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
  }

  /** Determines if this modal element is currently active or not. */
  isActive() {
    // The "active" modal is always the most recent one shown
    return activeModals[activeModals.length - 1] === this.element;
  }

  /** Activates external modal behavior and temporarily disables focus trapping. */
  activateExternal() {
    this.isExternalActivated = true;
  }

  /** Deactivates external modal behavior and re-enables focus trapping. */
  deactivateExternal() {
    this.isExternalActivated = false;
  }

  private checkFocus() {
    if (this.isActive() && !this.isExternalActivated) {
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

  // Checks if the `startElement` is already focused. This is important if the modal already has an existing focus prior
  // to the first tab key.
  private startElementAlreadyFocused(startElement: HTMLElement) {
    for (const activeElement of activeElements()) {
      if (startElement === activeElement) {
        return true;
      }
    }

    return false;
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab' || this.isExternalActivated) return;

    if (event.shiftKey) {
      this.tabDirection = 'backward';
    } else {
      this.tabDirection = 'forward';
    }

    event.preventDefault();

    const tabbableElements = getTabbableElements(this.element);
    const start = tabbableElements[0];

    // Sometimes we programmatically focus the first element in a modal.
    // Lets make sure the start element isn't already focused.
    let focusIndex = this.startElementAlreadyFocused(start) ? 0 : this.currentFocusIndex;

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
