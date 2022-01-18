/**
 * Serializes a form and returns a plain object. If a form control with the same name appears more than once, the
 * property will be converted to an array.
 */
export function serialize(form: HTMLFormElement) {
  const formData = new FormData(form);
  const object: Record<string, unknown> = {};

  formData.forEach((value, key) => {
    if (Reflect.has(object, key)) {
      const entry = object[key];
      if (Array.isArray(entry)) {
        entry.push(value);
      } else {
        object[key] = [object[key], value];
      }
    } else {
      object[key] = value;
    }
  });

  return object;
}
