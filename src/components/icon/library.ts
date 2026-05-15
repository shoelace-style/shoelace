import defaultLibrary from './library.default.js';
import systemLibrary from './library.system.js';
import type SlIcon from '../icon/icon.js';

export type IconLibraryResolver = (name: string) => string;
export type IconLibraryMutator = (svg: SVGElement) => void;
export interface IconLibrary {
  name: string;
  resolver: IconLibraryResolver;
  mutator?: IconLibraryMutator;
  spriteSheet?: boolean;
  add: (name: string, svgData: string) => void;
  inlineIcons?: Record<string, string>
}

let registry: IconLibrary[] = [defaultLibrary, systemLibrary];
let watchedIcons: SlIcon[] = [];

/** Adds an icon to the list of watched icons. */
export function watchIcon(icon: SlIcon) {
  watchedIcons.push(icon);
}

/** Removes an icon from the list of watched icons. */
export function unwatchIcon(icon: SlIcon) {
  watchedIcons = watchedIcons.filter(el => el !== icon);
}

/** Returns a library from the registry. */
export function getIconLibrary(name?: string) {
  return registry.find(lib => lib.name === name);
}

/** Adds an icon library to the registry, or overrides an existing one. */
export function registerIconLibrary(name: string, options: Omit<IconLibrary, 'name'>) {
  unregisterIconLibrary(name);
  const inlineIcons = options.inlineIcons || {};
  registry.push({
    name,
    resolver: (name: string) => {
      if (name in inlineIcons) {
        return `data:image/svg+xml,${encodeURIComponent(inlineIcons[name])}`;
      } else {
        return options.resolver(name)
      }
    },
    mutator: options.mutator,
    spriteSheet: options.spriteSheet,
    inlineIcons,
    add: (name: string, svgData: string) => {
      inlineIcons[name] = svgData;
    }
  });

  // Redraw watched icons
  watchedIcons.forEach(icon => {
    if (icon.library === name) {
      icon.setIcon();
    }
  });
}

/** Removes an icon library from the registry. */
export function unregisterIconLibrary(name: string) {
  registry = registry.filter(lib => lib.name !== name);
}
