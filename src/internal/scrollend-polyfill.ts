type GenericCallback = (this: unknown, ...args: unknown[]) => unknown;

type MethodOf<T, K extends keyof T> = T[K] extends GenericCallback ? T[K] : never;

const debounce = <T extends GenericCallback>(fn: T, delay: number) => {
  let timerId = 0;

  return function (this: unknown, ...args: unknown[]) {
    window.clearTimeout(timerId);
    timerId = window.setTimeout(() => {
      fn.call(this, ...args);
    }, delay);
  };
};

const decorate = <T, M extends keyof T>(
  proto: T,
  method: M,
  decorateFn: (this: unknown, superFn: T[M], ...args: unknown[]) => unknown
) => {
  const superFn = proto[method] as MethodOf<T, M>;

  proto[method] = function (this: unknown, ...args: unknown[]) {
    superFn.call(this, ...args);
    decorateFn.call(this, superFn, ...args);
  } as MethodOf<T, M>;
};

const isSupported = 'onscrollend' in window;

if (!isSupported) {
  const pointers = new Set();
  const scrollHandlers = new WeakMap<EventTarget, EventListenerOrEventListenerObject>();

  const handlePointerDown = (event: PointerEvent) => {
    pointers.add(event.pointerId);
  };

  const handlePointerUp = (event: PointerEvent) => {
    pointers.delete(event.pointerId);
  };

  document.addEventListener('pointerdown', handlePointerDown);
  document.addEventListener('pointerup', handlePointerUp);

  decorate(EventTarget.prototype, 'addEventListener', function (this: EventTarget, addEventListener, type) {
    if (type !== 'scroll') return;

    const handleScrollEnd = debounce(() => {
      if (!pointers.size) {
        // If no pointer is active in the scroll area then the scroll has ended
        this.dispatchEvent(new Event('scrollend'));
      } else {
        // otherwise let's wait a bit more
        handleScrollEnd();
      }
    }, 100);

    addEventListener.call(this, 'scroll', handleScrollEnd, { passive: true });
    scrollHandlers.set(this, handleScrollEnd);
  });

  decorate(EventTarget.prototype, 'removeEventListener', function (this: EventTarget, removeEventListener, type) {
    if (type !== 'scroll') return;

    const scrollHandler = scrollHandlers.get(this);
    if (scrollHandler) {
      removeEventListener.call(this, 'scroll', scrollHandler, { passive: true } as unknown as EventListenerOptions);
    }
  });
}

// Without an import or export, TypeScript sees vars in this file as global
export {};
