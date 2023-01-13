import { formCollections } from '../internal/form';

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

/**
 * Returns all form controls that are associated with the specified form. Includes both native and Shoelace form
 * controls. Use this function in lieu of the `HTMLFormElement.elements` property, which doesn't recognize Shoelace
 * form controls.
 */
export function getFormControls(form: HTMLFormElement) {
  const rootNode = form.getRootNode() as Document | ShadowRoot;
  const allNodes = [...rootNode.querySelectorAll('*')];
  const formControls = [...form.elements];
  const collection = formCollections.get(form);
  const shoelaceFormControls = collection ? Array.from(collection) : [];

  // To return form controls in the right order, we sort by DOM index
  return [...formControls, ...shoelaceFormControls].sort((a: Element, b: Element) => {
    if (allNodes.indexOf(a) < allNodes.indexOf(b)) return -1;
    if (allNodes.indexOf(a) > allNodes.indexOf(b)) return 1;
    return 0;
  });
}
