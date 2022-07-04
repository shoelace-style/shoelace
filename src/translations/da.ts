import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'da',
  $name: 'Danish',
  $dir: 'ltr',

  browseFiles: '',
  clearEntry: 'Ryd indtastning',
  close: 'Luk',
  copy: 'Kopier',
  currentValue: 'Nuværende regerer',
  dragDrop: '',
  fileSizeExceeded: '',
  fileTypeNotAccepted: '',
  hidePassword: 'Skjul adgangskode',
  loading: 'Indlæser',
  maxFiles: '',
  noMultipleFiles: '',
  progress: 'Status',
  remove: 'Fjerne',
  resize: 'Tipas størrelse',
  scrollToEnd: 'Scroll til slut',
  scrollToStart: 'Scroll til start',
  selectAColorFromTheScreen: 'Vælg en farve fra skærmen',
  serverError: '',
  showPassword: 'Vis adgangskode',
  toggleColorFormat: 'Skift farveformat',
  transferAbort: '',
  transferError: ''
};

registerTranslation(translation);

export default translation;
