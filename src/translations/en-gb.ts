import { registerTranslation } from '../utilities/localize';
import baseTranslation from './en';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  ...baseTranslation,
  $code: 'en-GB',
  $name: 'English (United Kingdom)',

  selectAColorFromTheScreen: 'Select a colour from the screen',
  toggleColorFormat: 'Toggle colour format'
};

registerTranslation(translation);

export default translation;
