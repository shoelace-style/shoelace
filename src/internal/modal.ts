import { getDeepestActiveElement } from './active-elements.js';
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
    if (!this.isActive()) return;
    this.checkFocus();
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab' || this.isExternalActivated) return;
    if (!this.isActive()) return;

    if (event.shiftKey) {
      this.tabDirection = 'backward';
    } else {
      this.tabDirection = 'forward';
    }

    event.preventDefault();

    const tabbableElements = getTabbableElements(this.element);

    // Because sometimes focus can actually be taken over from outside sources,
    // we don't want to rely on `this.currentFocus`. Instead we check the actual `activeElement` and
    // recurse through shadowRoots.
    const currentActiveElement = getDeepestActiveElement();
    let currentFocusIndex = tabbableElements.findIndex(el => el === currentActiveElement);

    if (currentFocusIndex === -1) {
      this.currentFocus = tabbableElements[0];
      this.currentFocus?.focus({ preventScroll: true });
      return;
    }

    const addition = this.tabDirection === 'forward' ? 1 : -1;

    if (currentFocusIndex + addition >= tabbableElements.length) {
      currentFocusIndex = 0;
    } else if (currentFocusIndex + addition < 0) {
      currentFocusIndex = tabbableElements.length - 1;
    } else {
      currentFocusIndex += addition;
    }

    this.currentFocus = tabbableElements[currentFocusIndex];
    this.currentFocus?.focus({ preventScroll: true });

    setTimeout(() => this.checkFocus());
  };

  private handleKeyUp = () => {
    this.tabDirection = 'forward';
  };
}
