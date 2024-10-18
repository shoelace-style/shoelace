import { registerTranslation } from '../utilities/localize.js';
import baseTranslation from './pt.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  ...baseTranslation,
  $code: 'pt-BR',
  $name: 'Português (Brasil)',
};

registerTranslation(translation);

export default translation;
