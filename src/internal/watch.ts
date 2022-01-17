// @watch decorator
//
// Runs when an observed property changes, e.g. @property or @state, but before the component updates.
//
// To wait for an update to complete after a change occurs, use `await this.updateComplete` in the handler. To start
// watching after the initial update/render, use `{ waitUntilFirstUpdate: true }` or `this.hasUpdated` in the handler.
//
// Usage:
//
//  @watch('propName')
//  handlePropChange(oldValue, newValue) {
//    ...
//  }

import type { LitElement } from 'lit';

type UpdateHandler = (prev?: unknown, next?: unknown) => void;

type NonUndefined<A> = A extends undefined ? never : A;

type UpdateHandlerFunctionKeys<T extends object> = {
  [K in keyof T]-?: NonUndefined<T[K]> extends UpdateHandler ? K : never;
}[keyof T];

interface WatchOptions {
  /**
   * If true, will only start watching after the initial update/render
   */
  waitUntilFirstUpdate?: boolean;
}

export function watch(propName: string, options?: WatchOptions) {
  const resolvedOptions: Required<WatchOptions> = {
    waitUntilFirstUpdate: false,
    ...options
  };
  return <ElemClass extends LitElement>(
    proto: ElemClass,
    decoratedFnName: UpdateHandlerFunctionKeys<ElemClass>
  ): void => {
    // @ts-expect-error -- update is a protected property
    const { update } = proto;
    if (propName in proto) {
      const propNameKey = propName as keyof ElemClass;
      // @ts-expect-error -- update is a protected property
      proto.update = function (this: ElemClass, changedProps: Map<keyof ElemClass, ElemClass[keyof ElemClass]>) {
        if (changedProps.has(propNameKey)) {
          const oldValue = changedProps.get(propNameKey);
          const newValue = this[propNameKey];

          if (oldValue !== newValue) {
            if (!resolvedOptions.waitUntilFirstUpdate || this.hasUpdated) {
              (this[decoratedFnName] as unknown as UpdateHandler)(oldValue, newValue);
            }
          }
        }

        update.call(this, changedProps);
      };
    }
  };
}
