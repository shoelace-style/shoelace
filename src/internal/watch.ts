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
//
interface WatchOptions {
  waitUntilFirstUpdate?: boolean;
}

export function watch(propName: string, options?: WatchOptions) {
  return (protoOrDescriptor: any, name: string): any => {
    const { update } = protoOrDescriptor;

    options = Object.assign({ waitUntilFirstUpdate: false }, options) as WatchOptions;

    protoOrDescriptor.update = function (changedProps: Map<string, any>) {
      if (changedProps.has(propName)) {
        const oldValue = changedProps.get(propName);
        const newValue = this[propName];

        if (oldValue !== newValue) {
          if (!options?.waitUntilFirstUpdate || this.hasUpdated) {
            this[name].call(this, oldValue, newValue);
          }
        }
      }

      update.call(this, changedProps);
    };
  };
}
