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
  registry.push({
    name,
    resolver: options.resolver,
    mutator: options.mutator,
    spriteSheet: options.spriteSheet
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
