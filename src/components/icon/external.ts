import { registerIconLibrary } from './library';

/* Teamshares-specific icon libraries */
export function registerExternalLibraries() {
  registerIconLibrary('fa-free', {
    resolver: name => {
      const filename = name.replace(/^fa[rbs]-/, '');
      let folder = 'regular';
      if (name.startsWith('fas-')) folder = 'solid';
      if (name.startsWith('fab-')) folder = 'brands';
      return `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.3.0/svgs/${folder}/${filename}.svg`;
    },
    mutator: svg => svg.setAttribute('fill', 'currentColor')
  });

  registerIconLibrary('fa', {
    resolver: name => {
      const filename = name.replace(/^fa([rsltdb]|(ss))-/, '');
      const sub = name.substring(0, 4);
      const folderHash = {
        'fas-': 'solid',
        'fal-': 'light',
        'fat-': 'thin',
        'fad-': 'duotone',
        'fab-': 'brands'
      };
      const folder: unknown = folderHash[sub as keyof typeof folderHash] || 'regular';
      /* Note: The token refers to the Teamshares Font Awesome Kit */
      /* See https://fontawesome.com/kits/44da2a9d09/setup */
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      return `https://ka-p.fontawesome.com/releases/v6.4.0/svgs/${folder}/${filename}.svg?token=44da2a9d09`;
    },
    mutator: svg => svg.setAttribute('fill', 'currentColor')
  });
}
