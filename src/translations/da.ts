import type { Translation } from '~/utilities/localize';
import { registerTranslation } from '~/utilities/localize';

const translation: Translation = {
  $code: 'da',
  $name: 'Danish',
  $dir: 'ltr',

  close: 'Luk',
  copy: 'Kopier',
  progress: 'Status',
  resize: 'Tipas størrelse',
  scrollToEnd: 'Scroll til slut',
  scrollToStart: 'Scroll til start',
  selectAColorFromTheScreen: 'Vælg en farve fra skærmen',
  toggleColorFormat: 'Skift farveformat'
};

registerTranslation(translation);

export default translation;
