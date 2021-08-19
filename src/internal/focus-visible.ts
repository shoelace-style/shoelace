//
// Simulates :focus-visible behavior on an element by watching for certain keyboard and mouse heuristics and toggling a
// `focus-visible` class. Works at the component level so no global polyfill is necessary.
//
// This will eventually be removed pending better :focus-visible support: https://caniuse.com/#search=focus-visible
//
const listeners = new WeakMap();

interface ObserveOptions {
  visible: () => void;
  notVisible: () => void;
}

export function observe(el: HTMLElement, options?: ObserveOptions) {
  const keys = ['Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageDown', 'PageUp'];
  const is = (event: KeyboardEvent) => {
    if (keys.includes(event.key)) {
      el.classList.add('focus-visible');

      if (options?.visible) {
        options.visible();
      }
    }
  };
  const isNot = () => {
    el.classList.remove('focus-visible');

    if (options?.notVisible) {
      options.notVisible();
    }
  };
  listeners.set(el, { is, isNot });

  el.addEventListener('keydown', is);
  el.addEventListener('keyup', is);
  el.addEventListener('mousedown', isNot);
  el.addEventListener('mouseup', isNot);
}

export function unobserve(el: HTMLElement) {
  const { is, isNot } = listeners.get(el);

  el.classList.remove('focus-visible');
  el.removeEventListener('keydown', is);
  el.removeEventListener('keyup', is);
  el.removeEventListener('mousedown', isNot);
  el.removeEventListener('mouseup', isNot);
}

export const focusVisible = {
  observe,
  unobserve
};
