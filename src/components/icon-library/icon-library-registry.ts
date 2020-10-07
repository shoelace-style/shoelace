import { getAssetPath } from '@stencil/core';

export type IconLibraryResolver = (name: string) => string;
export type IconLibraryMutator = (svg: SVGElement) => void;
interface IconLibraryRegistry {
  name: string;
  resolver: IconLibraryResolver;
  mutator?: IconLibraryMutator;
}

let registry: IconLibraryRegistry[] = [
  {
    name: 'default',
    resolver: name => getAssetPath(`./icons/${name}.svg`)
  }
];
let watchedIcons: HTMLSlIconElement[] = [];

export function watchIcon(icon: HTMLSlIconElement) {
  watchedIcons.push(icon);
}

export function unwatchIcon(icon: HTMLSlIconElement) {
  watchedIcons = watchedIcons.filter(el => el !== icon);
}

export function getLibrary(name?: string) {
  return registry.filter(lib => lib.name === name)[0];
}

export function registerLibrary(name: string, resolver: IconLibraryResolver, mutator?: IconLibraryMutator) {
  unregisterLibrary(name);
  registry.push({ name, resolver, mutator });

  // Redraw watched icons
  watchedIcons.map(icon => {
    if (icon.library === name) {
      icon.redraw();
    }
  });
}

export function unregisterLibrary(name: string) {
  registry = registry.filter(lib => lib.name !== name);
}
