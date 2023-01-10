import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'de',
  $name: 'Deutsch',
  $dir: 'ltr',

  clearEntry: 'Eingabe löschen',
  close: 'Schließen',
  copy: 'Kopieren',
  numOptionsSelected: num => {
    if (num === 0) return 'Keine Optionen ausgewählt';
    if (num === 1) return '1 Option ausgewählt';
    return `${num} Optionen ausgewählt`;
  },
  currentValue: 'Aktueller Wert',
  hidePassword: 'Passwort verbergen',
  loading: 'Wird geladen',
  progress: 'Fortschritt',
  remove: 'Entfernen',
  resize: 'Größe ändern',
  scrollToEnd: 'Zum Ende scrollen',
  scrollToStart: 'Zum Anfang scrollen',
  selectAColorFromTheScreen: 'Wähle eine Farbe vom Bildschirm',
  showPassword: 'Passwort anzeigen',
  toggleColorFormat: 'Farbformat umschalten'
};

registerTranslation(translation);

export default translation;
