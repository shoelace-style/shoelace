import { ResizeObserver } from 'resize-observer';

interface ResponsiveElementBreakpoints {
  [className: string]: {
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
  };
}

export default class ResponsiveElement {
  breakpoints: ResponsiveElementBreakpoints;
  element: HTMLElement;
  observer: ResizeObserver;

  constructor(element: HTMLElement, breakpoints?: ResponsiveElementBreakpoints) {
    this.element = element;
    this.breakpoints = breakpoints;

    if (breakpoints) {
      this.observe();
    }
  }

  private removeBreakpointClasses() {
    Object.keys(this.breakpoints).map(className => this.element.classList.remove(className));
  }

  private setBreakpointClasses() {
    if (this.observer && this.breakpoints) {
      const { width, height } = this.element.getBoundingClientRect();

      Object.keys(this.breakpoints).map(className => {
        const breakpoint = this.breakpoints[className];
        const minWidth = typeof breakpoint.minWidth === 'number' ? width >= breakpoint.minWidth : true;
        const maxWidth = typeof breakpoint.maxWidth === 'number' ? width <= breakpoint.maxWidth : true;
        const minHeight = typeof breakpoint.minHeight === 'number' ? height >= breakpoint.maxHeight : true;
        const maxHeight = typeof breakpoint.maxHeight === 'number' ? height <= breakpoint.maxHeight : true;

        this.element.classList.toggle(className, minWidth && maxWidth && minHeight && maxHeight);
      });
    }
  }

  observe() {
    if (!this.observer) {
      this.observer = new ResizeObserver(() => this.setBreakpointClasses());
      this.observer.observe(this.element);
      this.setBreakpointClasses();
    }
  }

  unobserve() {
    if (this.observer) {
      this.observer.unobserve(this.element);
      this.observer = null;
      this.removeBreakpointClasses();
    }
  }

  setBreakpoints(breakpoints: ResponsiveElementBreakpoints) {
    this.breakpoints = breakpoints;
    this.setBreakpointClasses();
  }
}
