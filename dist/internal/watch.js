export function watch(propName, options) {
    const resolvedOptions = Object.assign({ waitUntilFirstUpdate: false }, options);
    return (proto, decoratedFnName) => {
        const { update } = proto;
        if (propName in proto) {
            const propNameKey = propName;
            proto.update = function (changedProps) {
                if (changedProps.has(propNameKey)) {
                    const oldValue = changedProps.get(propNameKey);
                    const newValue = this[propNameKey];
                    if (oldValue !== newValue) {
                        if (!resolvedOptions.waitUntilFirstUpdate || this.hasUpdated) {
                            this[decoratedFnName](oldValue, newValue);
                        }
                    }
                }
                update.call(this, changedProps);
            };
        }
    };
}
