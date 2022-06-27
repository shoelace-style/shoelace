import { defaultConverter } from 'lit';
import type { ReactiveElement } from 'lit';

export const defaultValue = (propertyName: string) => (proto: ReactiveElement, key: string) => {
  const ctor = proto.constructor as typeof ReactiveElement;

  const attributeChangedCallback = ctor.prototype.attributeChangedCallback;
  ctor.prototype.attributeChangedCallback = function (
    this: ReactiveElement & { [name: string]: unknown },
    name,
    old,
    value
  ) {
    const options = ctor.getPropertyOptions(propertyName);
    const attributeName = typeof options.attribute === 'string' ? options.attribute : propertyName;

    if (name === attributeName) {
      const converter = options.converter || defaultConverter;
      const newValue: unknown =
        typeof converter === 'function'
          ? converter(value, options.type)
          : converter.fromAttribute
          ? converter.fromAttribute(value, options.type)
          : value;

      if (this[propertyName] !== newValue) {
        this[key] = newValue;
      }
    }

    attributeChangedCallback.call(this, name, old, value);
  };
};
