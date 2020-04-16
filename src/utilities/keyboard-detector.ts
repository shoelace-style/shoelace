export interface KeyboardDetectorOptions {
  whenUsing?: () => any;
  whenNotUsing?: () => any;
}

//
// This utility can be used to watch an element for keyboard interaction. When the user interacts via keyboard, the
// `whenUsing()` callback is activated and you can set state, modify a class, etc. to indicate keyboard use. When the
// user stops interacting via keyboard (e.g. starts using the mouse again), the `whenNotUsing()` callback is activated
// and you can use it to reverse the changes made in `whenUsing()`.
//
// This is especially useful for managing focus states that need to differ for mouse and keyboard users.
//
export class KeyboardDetector {
  el: HTMLElement;
  options: KeyboardDetectorOptions;

  constructor(options: KeyboardDetectorOptions) {
    this.options = options;
  }

  observe(el: HTMLElement) {
    el.addEventListener('keydown', this.options.whenUsing);
    el.addEventListener('keyup', this.options.whenUsing);
    el.addEventListener('mousedown', this.options.whenNotUsing);
    el.addEventListener('mouseup', this.options.whenNotUsing);
  }

  unobserve(el: HTMLElement) {
    el.removeEventListener('keydown', this.options.whenUsing);
    el.removeEventListener('keyup', this.options.whenUsing);
    el.removeEventListener('mousedown', this.options.whenNotUsing);
    el.removeEventListener('mouseup', this.options.whenNotUsing);
  }
}
