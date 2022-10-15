import "../chunks/chunk.WN26B4OP.js";

// src/utilities/form.ts
function serialize(form) {
  const formData = new FormData(form);
  const object = {};
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
export {
  serialize
};
