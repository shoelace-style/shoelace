//
// Serializes a form and returns a plain object. If a form control with the same name appears more than once, the
// property will be converted to an array.
//
export function serialize(form: HTMLFormElement) {
  const formData = new FormData(form);
  const object: { [key: string]: any } = {};

  formData.forEach((value, key) => {
    if (Reflect.has(object, key)) {
      if (Array.isArray(object[key])) {
        object[key].push(value);
      } else {
        object[key] = [object[key], value];
      }
    } else {
      object[key] = value;
    }
  });

  return object;
}
