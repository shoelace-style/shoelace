import { getOffset } from './offset.js';

const locks = new Set();

/** Returns the width of the document's scrollbar */
function getScrollbarWidth() {
  const documentWidth = document.documentElement.clientWidth;
  return Math.abs(window.innerWidth - documentWidth);
}

/**
 * Used in conjunction with `scrollbarWidth` to set proper body padding in case the user has padding already on the `<body>` element.
 */
function getExistingBodyPadding() {
  const padding = Number(getComputedStyle(document.body).paddingRight.replace(/px/, ''));

  if (isNaN(padding) || !padding) {
    return 0;
  }

  return padding;
}

/**
 * Prevents body scrolling. Keeps track of which elements requested a lock so multiple levels of locking are possible
 * without premature unlocking.
 */
export function lockBodyScrolling(lockingEl: HTMLElement) {
  locks.add(lockingEl);

  // When the first lock is created, set the scroll lock size to match the scrollbar's width to prevent content from
  // shifting. We only do this on the first lock because the scrollbar width will measure zero after overflow is hidden.
  if (!document.documentElement.classList.contains('sl-scroll-lock')) {
    /** Scrollbar width + body padding calculation can go away once Safari has scrollbar-gutter support. */
    const scrollbarWidth = getScrollbarWidth() + getExistingBodyPadding(); // must be measured before the `sl-scroll-lock` class is applied

    let scrollbarGutterProperty = getComputedStyle(document.documentElement).scrollbarGutter;

    // default is auto, unsupported browsers is "undefined"
    if (!scrollbarGutterProperty || scrollbarGutterProperty === 'auto') {
      scrollbarGutterProperty = 'stable';
    }

    /** Sometimes the scrollbar width is 1px, even then, we assume nothing is overflowing. */
    if (scrollbarWidth < 2) {
      // if there's no scrollbar, just set it to an empty string so whatever the user has set gets used. This is useful if the page is not overflowing and showing a scrollbar, or if the user has overflow: hidden, or any other reason a scrollbar may not be showing.
      scrollbarGutterProperty = '';
    }
    document.documentElement.style.setProperty('--sl-scroll-lock-gutter', scrollbarGutterProperty);
    document.documentElement.classList.add('sl-scroll-lock');
    document.documentElement.style.setProperty('--sl-scroll-lock-size', `${scrollbarWidth}px`);
  }
}

/**
 * Unlocks body scrolling. Scrolling will only be unlocked once all elements that requested a lock call this method.
 */
export function unlockBodyScrolling(lockingEl: HTMLElement) {
  locks.delete(lockingEl);

  if (locks.size === 0) {
    document.documentElement.classList.remove('sl-scroll-lock');
    document.documentElement.style.removeProperty('--sl-scroll-lock-size');
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
