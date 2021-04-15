// Determines if the specified element is tabbable using heuristics inspired by https://github.com/focus-trap/tabbable
function isTabbable(el: HTMLElement) {
  const tag = el.tagName.toLowerCase();

  // Elements with a -1 tab index are not tabbable
  if (el.getAttribute('tabindex') === '-1') {
    return false;
  }

  // Elements with a disabled attribute are not tabbable
  if (el.hasAttribute('disabled')) {
    return false;
  }

  // Elements with aria-disabled are not tabbable
  if (el.hasAttribute('aria-disabled') && el.getAttribute('aria-disabled') !== 'false') {
    return false;
  }

  // Elements with a tabindex other than -1 are tabbable
  if (el.hasAttribute('tabindex')) {
    return true;
  }

  // Elements with a contenteditable attribute are tabbable
  if (el.hasAttribute('contenteditable') && el.getAttribute('contenteditable') !== 'false') {
    return true;
  }

  // Audio and video elements with the controls attribute are tabbable
  if ((tag === 'audio' || tag === 'video') && el.hasAttribute('controls')) {
    return true;
  }

  // Radios without a checked attribute are not tabbable
  if (tag === 'input' && el.getAttribute('type') === 'radio' && !el.hasAttribute('checked')) {
    return false;
  }

  // Elements that are hidden have no offsetParent and are not tabbable
  if (!el.offsetParent) {
    return false;
  }

  // Elements without visibility are not tabbable (calculated last due to performance)
  if (window.getComputedStyle(el).visibility === 'hidden') {
    return false;
  }

  // At this point, the following elements are considered tabbable
  return ['button', 'input', 'select', 'textarea', 'a', 'audio', 'video', 'summary'].includes(tag);
}

// Locates all tabbable elements within an element. If the target element is tabbable, it will be included in the
// resulting array. This function will also look in open shadow roots.
export function getTabbableElements(root: HTMLElement | ShadowRoot) {
  const tabbableElements: HTMLElement[] = [];

  if (root instanceof HTMLElement) {
    // Is the root element tabbable?
    if (isTabbable(root)) {
      tabbableElements.push(root);
    }

    // Look for tabbable elements in the shadow root
    if (root.shadowRoot && root.shadowRoot.mode === 'open') {
      getTabbableElements(root.shadowRoot).map(el => tabbableElements.push(el));
    }

    // Look at slotted elements
    if (root instanceof HTMLSlotElement) {
      root.assignedElements().map((slottedEl: HTMLElement) => {
        getTabbableElements(slottedEl).map(el => tabbableElements.push(el));
      });
    }
  }

  // Look for tabbable elements in children
  [...root.querySelectorAll('*')].map((el: HTMLElement) => {
    getTabbableElements(el).map(el => tabbableElements.push(el));
  });

  return tabbableElements;
}

export function getNearestTabbableElement(el: HTMLElement): HTMLElement | null {
  const tabbableElements = getTabbableElements(el);
  return tabbableElements.length ? tabbableElements[0] : null;
}
