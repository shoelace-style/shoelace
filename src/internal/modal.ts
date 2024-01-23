import { activeElements, getDeepestActiveElement } from './active-elements.js';
import { getTabbableElements } from './tabbable.js';

let activeModals: HTMLElement[] = [];

export default class Modal {
  element: HTMLElement;
  isExternalActivated: boolean;
  tabDirection: 'forward' | 'backward' = 'forward';
  currentFocus: HTMLElement | null;
  previousFocus: HTMLElement | null;
  elementsWithTabbableControls: string[];

  constructor(element: HTMLElement) {
    this.element = element;

    this.elementsWithTabbableControls = ['iframe'];
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
          target.focus({ preventScroll: false });
        }
      }
    }
  }

  private handleFocusIn = () => {
    if (!this.isActive()) return;
    this.checkFocus();
  };

  private possiblyHasTabbableChildren(element: HTMLElement) {
    return (
      this.elementsWithTabbableControls.includes(element.tagName.toLowerCase()) || element.hasAttribute('controls')
      // Should we add a data-attribute for people to set just in case they have an element where we don't know if it has possibly tabbable elements?
    );
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab' || this.isExternalActivated) return;
    if (!this.isActive()) return;

    // Because sometimes focus can actually be taken over from outside sources,
    // we don't want to rely on `this.currentFocus`. Instead we check the actual `activeElement` and
    // recurse through shadowRoots.
    const currentActiveElement = getDeepestActiveElement();
    this.previousFocus = currentActiveElement as HTMLElement | null;

    if (this.previousFocus && this.possiblyHasTabbableChildren(this.previousFocus)) {
      return;
    }

    if (event.shiftKey) {
      this.tabDirection = 'backward';
    } else {
      this.tabDirection = 'forward';
    }

    const tabbableElements = getTabbableElements(this.element);

    let currentFocusIndex = tabbableElements.findIndex(el => el === currentActiveElement);

    this.previousFocus = this.currentFocus;

    const addition = this.tabDirection === 'forward' ? 1 : -1;

    // eslint-disable-next-line
    while (true) {
      if (currentFocusIndex + addition >= tabbableElements.length) {
        currentFocusIndex = 0;
      } else if (currentFocusIndex + addition < 0) {
        currentFocusIndex = tabbableElements.length - 1;
      } else {
        currentFocusIndex += addition;
      }

      this.previousFocus = this.currentFocus;
      const nextFocus = /** @type {HTMLElement} */ tabbableElements[currentFocusIndex];

      // This is a special case. We need to make sure we're not calling .focus() if we're already focused on an element
      // that possibly has "controls"
      if (this.tabDirection === 'backward') {
        if (this.previousFocus && this.possiblyHasTabbableChildren(this.previousFocus)) {
          return;
        }
      }

      if (nextFocus && this.possiblyHasTabbableChildren(nextFocus)) {
        return;
      }

      event.preventDefault();
      this.currentFocus = nextFocus;
      this.currentFocus?.focus({ preventScroll: false });

      // Check to make sure focus actually changed. It may not always be the next focus, we just don't want it to be the previousFocus.
      const allActiveElements = [...activeElements()];
      if (allActiveElements.includes(this.currentFocus) || !allActiveElements.includes(this.previousFocus!)) {
        break;
      }
    }

    setTimeout(() => this.checkFocus());
  };

  private handleKeyUp = () => {
    this.tabDirection = 'forward';
  };
}
