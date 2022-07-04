import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'de-CH',
  $name: 'Deutsch (Schweiz)',
  $dir: 'ltr',

  browseFiles: '',
  clearEntry: 'Eingabe löschen',
  close: 'Schliessen',
  copy: 'Kopieren',
  currentValue: 'Aktueller Wert',
  dragDrop: '',
  fileSizeExceeded: '',
  fileTypeNotAccepted: '',
  hidePassword: 'Passwort verbergen',
  loading: 'Wird geladen',
  maxFiles: '',
  noMultipleFiles: '',
  progress: 'Fortschritt',
  remove: 'Entfernen',
  resize: 'Grösse ändern',
  scrollToEnd: 'Zum Ende scrollen',
  scrollToStart: 'Zum Anfang scrollen',
  selectAColorFromTheScreen: 'Wähle eine Farbe vom Bildschirm',
  serverError: '',
  showPassword: 'Passwort anzeigen',
  toggleColorFormat: 'Farbformat umschalten',
  transferAbort: '',
  transferError: ''
};

registerTranslation(translation);

export default translation;
