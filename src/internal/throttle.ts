//
// A lightweight debounce implementation 防抖：一个事件如果不听发生，则一定时间内只发生一次
//
export function debounce(callback: (...arg: unknown[]) => void, delay: number) {
  let timer: any;

  return function (this: unknown, ...args: unknown[]) {
    if (timer) {
      return;
    }
    callback.apply(this, [...args]);
    timer = setTimeout(() => (timer = null), delay);
  };
}

//
// A lightweight throttle implementation
//
/**
 * 函数节流， 持续触发事件时，保证一定时间段内只调用一次事件处理函数。节流通俗解释就比如我们水龙头放水，阀门一打开，水哗哗的往下流，秉着勤俭节约的优良传统美德，我们要把水龙头关小点
 * @param method 节流方法
 * @param delay 多少时间调用一次
 * @param scope 函数执行上下文
 */
export function throttle(method: (...arg: unknown[]) => void, delay: number, scope?: unknown) {
  let begin = new Date().getTime();
  return function (this: unknown, ...args: unknown[]) {
    const context = scope != null ? scope : this,
      current = new Date().getTime();
    if (current - begin >= delay) {
      method.apply(context, args);
      begin = current;
    }
  };
}
