declare module '*.css' {
  const styles: string;
  export default styles;
}

declare namespace Chai {
  interface Assertion {
    // chai-a11y-axe returns a promise-like object and should be awaited but the types are incorrect
    // eslint-disable-next-line @typescript-eslint/ban-types
    accessible: (options?: Object) => PromiseLike<Assertion>;
  }
}

interface HTMLInputElement {
  showPicker: () => void;
}
