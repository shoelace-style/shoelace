class MockIntersectionObserver extends IntersectionObserver {
  constructor(mocks: MockIntersectionObserver[], callback: IntersectionObserverCallback) {
    super(callback, {});
    this.callback = callback;
    mocks.push(this);
  }
  callback: IntersectionObserverCallback | undefined = undefined;

  executeCallback(entries: IntersectionObserverEntry[]) {
    if (this.callback) {
      this.callback(entries, this);
    }
  }
}

class IntersectionObserverMock {
  mocks: MockIntersectionObserver[] = [];
  originalIntersectionObserver: typeof IntersectionObserver | undefined = undefined;
  install() {
    this.mocks = [];
    this.originalIntersectionObserver = window.IntersectionObserver;
    window.IntersectionObserver = MockIntersectionObserver.bind(this, this.mocks);
  }
  uninstall() {
    this.mocks = [];
    if (this.originalIntersectionObserver) {
      window.IntersectionObserver = this.originalIntersectionObserver;
    }
  }
}

export { IntersectionObserverMock };
