import { unsafeCSS } from 'lit';

//
// Determines if the current browser supports :focus-visible
//
export const hasFocusVisible = (() => {
  const style = document.createElement('style');
  let isSupported;

  try {
    document.head.appendChild(style);
    style.sheet!.insertRule(':focus-visible { color: inherit }');
    isSupported = true;
  } catch {
    isSupported = false;
  } finally {
    style.remove();
  }

  return isSupported;
})();

//
// A selector for Lit stylesheets that outputs `:focus-visible` if the browser supports it and `:focus` otherwise
//
export const focusVisibleSelector = unsafeCSS(hasFocusVisible ? ':focus-visible' : ':focus');
