export function getAllComponents(metadata) {
  const allComponents = [];

  metadata.modules.map(module => {
    module.declarations?.map(declaration => {
      if (declaration.customElement) {
        const component = declaration;

        if (component) {
          allComponents.push(component);
        }
      }
    });
  });

  return allComponents;
}
