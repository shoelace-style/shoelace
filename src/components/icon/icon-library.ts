interface IconLibrary {
  name: string;
  getPath: (iconName: string) => string;
  mutate?: (svg: SVGElement) => void;
}

const iconLibrary: IconLibrary[] = [];
let watchedIcons: HTMLSlIconElement[] = [];

export function watchIcon(icon: HTMLSlIconElement) {
  watchedIcons.push(icon);
}

export function unwatchIcon(icon: HTMLSlIconElement) {
  watchedIcons = watchedIcons.filter(el => el !== icon);
}

export function getLibrary(name?: string) {
  return iconLibrary.filter(lib => lib.name === name)[0];
}

export function registerLibrary(
  name: string,
  getPath: (iconName: string) => string,
  mutate?: (svg: SVGElement) => void
) {
  iconLibrary.push({ name, getPath, mutate });

  // Redraw watched icons
  watchedIcons.map(icon => {
    if (icon.library === name) {
      icon.redraw();
    }
  });
}
