import { getBasePath } from '../../utilities/base-path.js';
import type { IconLibrary } from './library.js';

const inlineIcons: Record<string, string> = {
}
const library: IconLibrary = {
  name: 'default',
  resolver: name => {
    if (name in inlineIcons) {
      return `data:image/svg+xml,${encodeURIComponent(inlineIcons[name])}`;
    } else {
      return getBasePath(`assets/icons/${name}.svg`)
    }
  },
  add: (name: string, svgData: string) => {
    (inlineIcons as any)[name] = svgData;
  }
};

export default library;
