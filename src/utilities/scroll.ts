import { getOffset } from './offset';

//
// Locks and unlocks the body to prevent scrolling. By design, this method doesn't try to maintain the body's existing
// overflow state, as setting <body style="overflow: *"> is considered a bad practice. If you need to set a non-default
// overflow to the body element, it's better to do so in your stylesheet.
//
export function lockBodyScrolling(isLocked = true) {
  if (isLocked) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = null;
  }
}

//
// Scrolls an element into view of its container. If the element is already in view, nothing will happen.
//
export function scrollIntoView(
  element: HTMLElement,
  container: HTMLElement,
  direction: 'horizontal' | 'vertical' | 'both' = 'vertical'
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
      container.scrollTo({ left: offsetLeft, behavior: 'smooth' });
    } else if (offsetLeft + element.clientWidth > maxX) {
      container.scrollTo({ left: offsetLeft - container.offsetWidth + element.clientWidth, behavior: 'smooth' });
    }
  }

  if (direction === 'vertical' || direction === 'both') {
    if (offsetTop < minY) {
      container.scrollTo({ top: offsetTop, behavior: 'smooth' });
    } else if (offsetTop + element.clientHeight > maxY) {
      container.scrollTo({ top: offsetTop - container.offsetHeight + element.clientHeight, behavior: 'smooth' });
    }
  }
}
