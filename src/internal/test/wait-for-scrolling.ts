/**
 * Wait until an element has stopped scrolling
 * This considers the element to have stopped scrolling, as soon as it did not change its
 * scroll position for 20 successive animation frames
 * @param {HTMLElement} element - The element which is scrolled
 * @param {numeric} timeoutInMs - A timeout in ms. If the timeout has elapsed, the promise rejects
 * @returns A promise which resolves after the scrolling has stopped
 */
export const waitForScrollingToEnd = (element: Element, timeoutInMs = 500): Promise<void> => {
  let lastLeft = element.scrollLeft;
  let lastTop = element.scrollTop;
  let framesWithoutChange = 0;
  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => {
      reject(new Error('Waiting for scroll end timed out'));
    }, timeoutInMs);
    function checkScrollingChanged() {
      if (element.scrollLeft !== lastLeft || element.scrollTop !== lastTop) {
        framesWithoutChange = 0;
        lastLeft = window.scrollX;
        lastTop = window.scrollY;
      } else {
        framesWithoutChange++;
        if (framesWithoutChange >= 20) {
          clearTimeout(timeout);
          resolve();
        }
      }
      window.requestAnimationFrame(checkScrollingChanged);
    }
    checkScrollingChanged();
  });
};
