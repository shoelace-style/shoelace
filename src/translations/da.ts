import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'da',
  $name: 'Dansk',
  $dir: 'ltr',

  clearEntry: 'Ryd indtastning',
  close: 'Luk',
  copy: 'Kopier',
  currentValue: 'Nuværende værdi',
  hidePassword: 'Skjul adgangskode',
  loading: 'Indlæser',
  numOptionsSelected: (num: number) => {
    if (num === 0) return 'Ingen valgt';
    if (num === 1) return '1 valgt';
    return `${num} valgt`;
  },
  progress: 'Status',
  remove: 'Fjern',
  resize: 'Tilpas størrelse',
  scrollToEnd: 'Scroll til slut',
  scrollToStart: 'Scroll til start',
  selectAColorFromTheScreen: 'Vælg en farve fra skærmen',
  showPassword: 'Vis adgangskode',
  toggleColorFormat: 'Skift farveformat'
};

registerTranslation(translation);

export default translation;
