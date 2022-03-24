import { getBasePath } from '../../utilities/base-path';
import type { IconLibrary } from './library';

const library: IconLibrary = {
  name: 'default',
  resolver: name => `${getBasePath()}/assets/icons/${name}.svg`
};

export default library;
