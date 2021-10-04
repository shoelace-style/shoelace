//
// Determines if the browser supports focus({ preventScroll })
//
export function isPreventScrollSupported() {
  let supported = false;

  document.createElement('div').focus({
    get preventScroll() {
      supported = true;
      return false;
    }
  });

  return supported;
}

//
// Determines if the browser supports touch events
//
export function isTouchSupported() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.maxTouchPoints > 0;
}
