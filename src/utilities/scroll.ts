import { getOffset } from './offset';

let locks = [];

//
// Prevents body scrolling. Keeps track of which elements requested a lock so multiple levels of locking are possible
// without premature unlocking.
//
export function lockBodyScrolling(lockingEl: HTMLElement) {
  if (lockingEl && !locks.includes(lockingEl)) {
    locks.push(lockingEl);
    document.body.classList.add('sl-scroll-lock');
  }
}

//
// Unlocks body scrolling. Scrolling will only be unlocked once all elements that requested a lock call this method.
//
export function unlockBodyScrolling(lockingEl: HTMLElement) {
  locks = locks.filter(el => el !== lockingEl);

  if (locks.length === 0) {
    document.body.classList.remove('sl-scroll-lock');
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
