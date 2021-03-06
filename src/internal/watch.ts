// @watch decorator
//
// Usage:
//
//  @watch('propName') handlePropChange(oldValue, newValue) {
//    ...
//  }
//
export function watch(propName: string) {
  return (protoOrDescriptor: any, name: string): any => {
    const update = protoOrDescriptor.update;

    protoOrDescriptor.update = function (changedProps: Map<string, any>) {
      if (changedProps.has(propName)) {
        const oldValue = changedProps.get(propName);
        const newValue = this[propName];

        if (oldValue !== newValue) {
          this[name].call(this, oldValue, newValue);
        }
      }

      update.call(this, changedProps);
    };
  };
}
