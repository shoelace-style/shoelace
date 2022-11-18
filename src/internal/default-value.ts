// @defaultValue decorator
//
// Runs when the corresponding attribute of the observed property changes, e.g. after calling Element.setAttribute or after updating
// the observed property.
//
// The decorator checks whether the value of the attribute is different from the value of the property and in that case
// it saves the new value.
//
//
// Usage:
//
//  @property({ type: Boolean, reflect: true }) checked = false;
//
//  @defaultValue('checked') defaultChecked = false;
//

import { defaultConverter } from 'lit';
import type { ReactiveElement } from 'lit';

export const defaultValue =
  (propertyName = 'value') =>
  (proto: ReactiveElement, key: string) => {
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
        const fromAttribute =
          typeof converter === 'function' ? converter : converter?.fromAttribute ?? defaultConverter.fromAttribute;

        const newValue: unknown = fromAttribute!(value, options.type);

        if (this[propertyName] !== newValue) {
          this[key] = newValue;
        }
      }

      attributeChangedCallback.call(this, name, old, value);
    };
  };
