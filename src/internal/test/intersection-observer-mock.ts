class MockIntersectionObserver extends IntersectionObserver {
  constructor(mocks: MockIntersectionObserver[], callback: IntersectionObserverCallback) {
    super(callback, {});
    this.callback = callback;
    mocks.push(this);
  }
  prototype: IntersectionObserver;
  callback: IntersectionObserverCallback | undefined = undefined;
  root: Element | Document | null;
  rootMargin: string;
  thresholds: readonly number[];
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  disconnect(): void {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  observe(_: Element): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  unobserve(_: Element): void {}

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
