// @watch decorator
//
// Runs when an observed property changes, e.g. @property or @state, but before the component updates.
//
// To wait for an update to complete after a change occurs, use `await this.updateComplete` in the handler. To start
// watching after the initial update/render, use `{ waitUntilFirstUpdate: true }` or `this.hasUpdated` in the handler.
//
// Usage:
//
//  @watchProps(['propName','propName2'],{waitUntilFirstUpdate:true})
//  handlePropChange() {
//    ...
//  }
//
interface WatchOptions {
  waitUntilFirstUpdate?: boolean;
}
const containsAny = (changedProps: Map<string, any>, propName: string[]) => {
  for (let propIN of propName) {
    if (changedProps.has(propIN)) {
      return true;
    }
  }
  return false;
};
export function watchProps(propName: string[], options?: WatchOptions) {
  return (protoOrDescriptor: any, name: string): any => {
    const { update } = protoOrDescriptor;
    options = Object.assign({ waitUntilFirstUpdate: false }, options) as WatchOptions;
    protoOrDescriptor.update = function (changedProps: Map<string, any>) {
      if (containsAny(changedProps, propName)) {
        if (!options?.waitUntilFirstUpdate || this.hasUpdated) {
          this[name]();
        }
      }
      update.call(this, changedProps);
    };
  };
}
