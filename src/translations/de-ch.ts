import { registerTranslation } from '../utilities/localize';
import baseTranslation from './de';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  ...baseTranslation,
  $code: 'de-CH',
  $name: 'Deutsch (Schweiz)',

  close: 'Schliessen',
  resize: 'Grösse ändern'
};

registerTranslation(translation);

export default translation;
