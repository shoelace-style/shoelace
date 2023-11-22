//
// This doesn't technically check visibility, it checks if the element has been rendered and can maybe possibly be tabbed
// to. This is a workaround for shadow roots not having an `offsetParent`.
//
// See https://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom
//
// Previously, we used https://www.npmjs.com/package/composed-offset-position, but recursing up an entire node tree took
// up a lot of CPU cycles and made focus traps unusable in Chrome / Edge.
//
function isTakingUpSpace(elem: HTMLElement): boolean {
  return Boolean(elem.offsetParent || elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
}

/** Determines if the specified element is tabbable using heuristics inspired by https://github.com/focus-trap/tabbable */
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

  // Radios without a checked attribute are not tabbable
  if (tag === 'input' && el.getAttribute('type') === 'radio' && !el.hasAttribute('checked')) {
    return false;
  }

  // Elements that are hidden have no offsetParent and are not tabbable
  if (!isTakingUpSpace(el)) {
    return false;
  }

  // Elements without visibility are not tabbable
  if (window.getComputedStyle(el).visibility === 'hidden') {
    return false;
  }

  // Audio and video elements with the controls attribute are tabbable
  if ((tag === 'audio' || tag === 'video') && el.hasAttribute('controls')) {
    return true;
  }

  // Elements with a tabindex other than -1 are tabbable
  if (el.hasAttribute('tabindex')) {
    return true;
  }

  // Elements with a contenteditable attribute are tabbable
  if (el.hasAttribute('contenteditable') && el.getAttribute('contenteditable') !== 'false') {
    return true;
  }

  // At this point, the following elements are considered tabbable
  return ['button', 'input', 'select', 'textarea', 'a', 'audio', 'video', 'summary'].includes(tag);
}

/**
 * Returns the first and last bounding elements that are tabbable. This is more performant than checking every single
 * element because it short-circuits after finding the first and last ones.
 */
export function getTabbableBoundary(root: HTMLElement | ShadowRoot) {
  const tabbableElements = getTabbableElements(root);

  // Find the first and last tabbable elements
  const start = tabbableElements[0] ?? null;
  const end = tabbableElements[tabbableElements.length - 1] ?? null;

  return { start, end };
}

export function getTabbableElements(root: HTMLElement | ShadowRoot) {
  const tabbableElements: HTMLElement[] = [];

  function walk(el: HTMLElement | ShadowRoot) {
    if (el instanceof Element) {
      // if the element has "inert" we can just no-op it.
      if (el.hasAttribute('inert')) {
        return;
      }

      if (!tabbableElements.includes(el) && isTabbable(el)) {
        tabbableElements.push(el);
      }

      /**
       * This looks funky. Basically a slot's children will always be picked up *if* they're within the `root` element.
       * However, there is an edge case when, if the `root` is wrapped by another shadow DOM, it won't grab the children.
       * This fixes that fun edge case.
       */
      const slotChildrenOutsideRootElement = (slotElement: HTMLSlotElement) =>
        (slotElement.getRootNode({ composed: true }) as ShadowRoot | null)?.host !== root;

      if (el instanceof HTMLSlotElement && slotChildrenOutsideRootElement(el)) {
        el.assignedElements({ flatten: true }).forEach((assignedEl: HTMLElement) => {
          walk(assignedEl);
        });
      }

      if (el.shadowRoot !== null && el.shadowRoot.mode === 'open') {
        walk(el.shadowRoot);
      }
    }

    [...el.children].forEach((e: HTMLElement) => walk(e));
  }

  // Collect all elements including the root
  walk(root);

  // Is this worth having? Most sorts will always add increased overhead. And positive tabindexes shouldn't really be used.
  // So is it worth being right? Or fast?
  return tabbableElements.sort((a, b) => {
    // Make sure we sort by tabindex.
    const aTabindex = Number(a.getAttribute('tabindex')) || 0;
    const bTabindex = Number(b.getAttribute('tabindex')) || 0;
    return bTabindex - aTabindex;
  });
}
