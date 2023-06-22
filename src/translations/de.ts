import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'de',
  $name: 'Deutsch',
  $dir: 'ltr',

  carousel: 'Karussell',
  clearEntry: 'Eingabe löschen',
  close: 'Schließen',
  copy: 'Kopieren',
  currentValue: 'Aktueller Wert',
  goToSlide: (slide, count) => `Gehen Sie zu Folie ${slide} von ${count}`,
  hidePassword: 'Passwort verbergen',
  loading: 'Wird geladen',
  nextSlide: 'Nächste Folie',
  numOptionsSelected: num => {
    if (num === 0) return 'Keine Optionen ausgewählt';
    if (num === 1) return '1 Option ausgewählt';
    return `${num} Optionen ausgewählt`;
  },
  previousSlide: 'Vorherige Folie',
  progress: 'Fortschritt',
  remove: 'Entfernen',
  resize: 'Größe ändern',
  scrollToEnd: 'Zum Ende scrollen',
  scrollToStart: 'Zum Anfang scrollen',
  selectAColorFromTheScreen: 'Wähle eine Farbe vom Bildschirm',
  showPassword: 'Passwort anzeigen',
  slideNum: slide => `Folie ${slide}`,
  toggleColorFormat: 'Farbformat umschalten'
};

registerTranslation(translation);

export default translation;
