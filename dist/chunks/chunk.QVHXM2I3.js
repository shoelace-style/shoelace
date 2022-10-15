import {
  library_default_default
} from "./chunk.5S5G5ZT7.js";
import {
  library_system_default
} from "./chunk.OAACI5QO.js";

// src/components/icon/library.ts
var registry = [library_default_default, library_system_default];
var watchedIcons = [];
function watchIcon(icon) {
  watchedIcons.push(icon);
}
function unwatchIcon(icon) {
  watchedIcons = watchedIcons.filter((el) => el !== icon);
}
function getIconLibrary(name) {
  return registry.find((lib) => lib.name === name);
}
function registerIconLibrary(name, options) {
  unregisterIconLibrary(name);
  registry.push({
    name,
    resolver: options.resolver,
    mutator: options.mutator
  });
  watchedIcons.forEach((icon) => {
    if (icon.library === name) {
      icon.redraw();
    }
  });
}
function unregisterIconLibrary(name) {
  registry = registry.filter((lib) => lib.name !== name);
}

export {
  watchIcon,
  unwatchIcon,
  getIconLibrary,
  registerIconLibrary,
  unregisterIconLibrary
};
