import type { IconLibrary } from './library';
import { getBasePath } from '~/utilities/base-path';

const library: IconLibrary = {
  name: 'default',
  resolver: name => `${getBasePath()}/assets/icons/${name}.svg`
};

export default library;
