//
// Runs this ,give webcompoent set style into shadmroot.
//
// Usage:
//
//  @customStyle()
//  WebCoponentClass extends LitElement {
//    ...
//  }
//

import { LitElement } from 'lit';
export function customStyle() {
  const key = 'customStyle';
  const keyCustomStyle = Symbol('keyCustomStyle');
  const keyName = Symbol('customStyle');
  return (protoOrDescriptor: any) => {
    Object.defineProperty(protoOrDescriptor.prototype, key, {
      configurable: true,
      enumerable: true,
      set(value) {
        const element: LitElement = this;
        this[keyName] = value;
        element.updateComplete.then(() => {
          if ((element as any)[keyCustomStyle] == undefined) {
            const style = document.createElement('style');
            style.setAttribute('name', 'customStyle');
            (element as any)[keyCustomStyle] = style;
            element.renderRoot.appendChild(style);
          }
          if (value !== (element as any)[keyCustomStyle].textContent) {
            (element as any)[keyCustomStyle].textContent = value;
          }
        });
      },
      get() {
        return this[keyName];
      }
    });
  };
}
