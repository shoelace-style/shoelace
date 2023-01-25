import { getOffset } from './offset';

const locks = new Set();

/** Returns the width of the document's scrollbar */
function getScrollbarWidth() {
  const documentWidth = document.documentElement.clientWidth;
  return Math.abs(window.innerWidth - documentWidth);
}

/**
 * Prevents body scrolling. Keeps track of which elements requested a lock so multiple levels of locking are possible
 * without premature unlocking.
 */
export function lockBodyScrolling(lockingEl: HTMLElement) {
  locks.add(lockingEl);

  // When the first lock is created, set the scroll lock size to match the scrollbar's width to prevent content from
  // shifting. We only do this on the first lock because the scrollbar width will measure zero after overflow is hidden.
  if (!document.body.classList.contains('sl-scroll-lock')) {
    const scrollbarWidth = getScrollbarWidth(); // must be measured before the `sl-scroll-lock` class is applied
    document.body.classList.add('sl-scroll-lock');
    document.body.style.setProperty('--sl-scroll-lock-size', `${scrollbarWidth}px`);
  }
}

/**
 * Unlocks body scrolling. Scrolling will only be unlocked once all elements that requested a lock call this method.
 */
export function unlockBodyScrolling(lockingEl: HTMLElement) {
  locks.delete(lockingEl);

  if (locks.size === 0) {
    document.body.classList.remove('sl-scroll-lock');
    document.body.style.removeProperty('--sl-scrollbar-width');
  }
}

/** Scrolls an element into view of its container. If the element is already in view, nothing will happen. */
export function scrollIntoView(
  element: HTMLElement,
  container: HTMLElement,
  direction: 'horizontal' | 'vertical' | 'both' = 'vertical',
  behavior: 'smooth' | 'auto' = 'smooth'
) {
  const offset = getOffset(element, container);
  const offsetTop = offset.top + container.scrollTop;
  const offsetLeft = offset.left + container.scrollLeft;
  const minX = container.scrollLeft;
  const maxX = container.scrollLeft + container.offsetWidth;
  const minY = container.scrollTop;
  const maxY = container.scrollTop + container.offsetHeight;

  if (direction === 'horizontal' || direction === 'both') {
    if (offsetLeft < minX) {
      container.scrollTo({ left: offsetLeft, behavior });
    } else if (offsetLeft + element.clientWidth > maxX) {
      container.scrollTo({ left: offsetLeft - container.offsetWidth + element.clientWidth, behavior });
    }
  }

  if (direction === 'vertical' || direction === 'both') {
    if (offsetTop < minY) {
      container.scrollTo({ top: offsetTop, behavior });
    } else if (offsetTop + element.clientHeight > maxY) {
      container.scrollTo({ top: offsetTop - container.offsetHeight + element.clientHeight, behavior });
    }
  }
}
