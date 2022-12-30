class MockResizeObserver extends ResizeObserver {
  callback: ResizeObserverCallback | undefined = undefined;
  constructor(mocks: MockResizeObserver[], callback: ResizeObserverCallback) {
    super(callback);
    this.callback = callback;
    mocks.push(this);
  }

  executeCallback(entries: ResizeObserverEntry[] = []) {
    if (this.callback) {
      this.callback(entries, this);
    }
  }
}

class ResizeObserverMock {
  mocks: MockResizeObserver[] = [];
  #originalResizeObserver: typeof ResizeObserver | undefined = undefined;
  install() {
    this.#originalResizeObserver = window.ResizeObserver;
    window.ResizeObserver = MockResizeObserver.bind(this, this.mocks);
  }
  uninstall() {
    this.mocks = [];
    if (this.#originalResizeObserver) {
      window.ResizeObserver = this.#originalResizeObserver;
    }
  }
}

export { ResizeObserverMock };
