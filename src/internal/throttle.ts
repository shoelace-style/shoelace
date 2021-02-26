//
// A lightweight debounce implementation
//
export function debounce(callback: (...args: [any]) => void, delay: number) {
  let timer: any;

  return function () {
    if (timer) {
      return;
    }

    callback.apply(this, arguments);
    timer = setTimeout(() => (timer = null), delay);
  };
}

//
// A lightweight throttle implementation
//
export function throttle(callback: (...args: [any]) => void, delay: number) {
  let isThrottled = false;
  let args: any;
  let context: any;

  function wrapper() {
    if (isThrottled) {
      args = arguments;
      context = this;
      return;
    }

    isThrottled = true;
    callback.apply(this, arguments);

    setTimeout(() => {
      isThrottled = false;
      if (args) {
        wrapper.apply(context, args);
        args = context = null;
      }
    }, delay);
  }

  return wrapper;
}
