import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'da',
  $name: 'Danish',
  $dir: 'ltr',

  clearEntry: 'Ryd indtastning',
  close: 'Luk',
  copy: 'Kopier',
  currentValue: 'Nuværende regerer',
  hidePassword: 'Skjul adgangskode',
  progress: 'Status',
  remove: 'Fjerne',
  resize: 'Tipas størrelse',
  scrollToEnd: 'Scroll til slut',
  scrollToStart: 'Scroll til start',
  selectAColorFromTheScreen: 'Vælg en farve fra skærmen',
  showPassword: 'Vis adgangskode',
  toggleColorFormat: 'Skift farveformat'
};

registerTranslation(translation);

export default translation;
