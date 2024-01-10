// Cached compute style calls. This is specifically for browsers that dont support `checkVisibility()`.
// computedStyle calls are "live" so they only need to be retrieved once for an element.
const computedStyleMap = new WeakMap<Element, CSSStyleDeclaration>();

function getCachedComputedStyle(el: HTMLElement): CSSStyleDeclaration {
  let computedStyle: undefined | CSSStyleDeclaration = computedStyleMap.get(el);

  if (!computedStyle) {
    computedStyle = window.getComputedStyle(el, null);
    computedStyleMap.set(el, computedStyle);
  }

  return computedStyle;
}

function isVisible(el: HTMLElement): boolean {
  // This is the fastest check, but isn't supported in Safari.
  if (typeof el.checkVisibility === 'function') {
    // Opacity is focusable, visibility is not.
    return el.checkVisibility({ checkOpacity: false, checkVisibilityCSS: true });
  }

  // Fallback "polyfill" for "checkVisibility"
  const computedStyle = getCachedComputedStyle(el);

  return computedStyle.visibility !== 'hidden' && computedStyle.display !== 'none';
}

// While this behavior isn't standard in Safari / Chrome yet, I think it's the most reasonable
// way of handling tabbable overflow areas. Browser sniffing seems gross, and it's the most
// accessible way of handling overflow areas. [Konnor]
function isOverflowingAndTabbable(el: HTMLElement): boolean {
  const computedStyle = getCachedComputedStyle(el);

  const { overflowY, overflowX } = computedStyle;

  if (overflowY === 'scroll' || overflowX === 'scroll') {
    return true;
  }

  if (overflowY !== 'auto' || overflowX !== 'auto') {
    return false;
  }

  // Always overflow === "auto" by this point
  const isOverflowingY = el.scrollHeight > el.clientHeight;

  if (isOverflowingY && overflowY === 'auto') {
    return true;
  }

  const isOverflowingX = el.scrollWidth > el.clientWidth;

  if (isOverflowingX && overflowX === 'auto') {
    return true;
  }

  return false;
}

/** Determines if the specified element is tabbable using heuristics inspired by https://github.com/focus-trap/tabbable */
function isTabbable(el: HTMLElement) {
  const tag = el.tagName.toLowerCase();

  const tabindex = Number(el.getAttribute('tabindex'));
  const hasTabindex = el.hasAttribute('tabindex');

  // elements with a tabindex attribute that is either NaN or <= -1 are not tabbable
  if (hasTabindex && (isNaN(tabindex) || tabindex <= -1)) {
    return false;
  }

  // Elements with a disabled attribute are not tabbable
  if (el.hasAttribute('disabled')) {
    return false;
  }

  // If any parents have "inert", we aren't "tabbable"
  if (el.closest('[inert]')) {
    return false;
  }

  // Radios without a checked attribute are not tabbable
  if (tag === 'input' && el.getAttribute('type') === 'radio' && !el.hasAttribute('checked')) {
    return false;
  }

  if (!isVisible(el)) {
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
  const isNativelyTabbable = [
    'button',
    'input',
    'select',
    'textarea',
    'a',
    'audio',
    'video',
    'summary',
    'iframe'
  ].includes(tag);

  if (isNativelyTabbable) {
    return true;
  }

  // We save the overflow checks for last, because they're the most expensive
  return isOverflowingAndTabbable(el);
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

/**
 * This looks funky. Basically a slot's children will always be picked up *if* they're within the `root` element.
 * However, there is an edge case when, if the `root` is wrapped by another shadow DOM, it won't grab the children.
 * This fixes that fun edge case.
 */
function getSlottedChildrenOutsideRootElement(slotElement: HTMLSlotElement, root: HTMLElement | ShadowRoot) {
  return (slotElement.getRootNode({ composed: true }) as ShadowRoot | null)?.host !== root;
}

export function getTabbableElements(root: HTMLElement | ShadowRoot) {
  const walkedEls = new WeakMap();
  const tabbableElements: HTMLElement[] = [];

  function walk(el: HTMLElement | ShadowRoot) {
    if (el instanceof Element) {
      // if the element has "inert" we can just no-op it.
      if (el.hasAttribute('inert') || el.closest('[inert]')) {
        return;
      }

      if (walkedEls.has(el)) {
        return;
      }
      walkedEls.set(el, true);

      if (!tabbableElements.includes(el) && isTabbable(el)) {
        tabbableElements.push(el);
      }

      if (el instanceof HTMLSlotElement && getSlottedChildrenOutsideRootElement(el, root)) {
        el.assignedElements({ flatten: true }).forEach((assignedEl: HTMLElement) => {
          walk(assignedEl);
        });
      }

      if (el.shadowRoot !== null && el.shadowRoot.mode === 'open') {
        walk(el.shadowRoot);
      }
    }

    for (const e of el.children) {
      walk(e as HTMLElement);
    }
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
