import type { Translation } from '~/utilities/localize';
import { registerTranslation } from '~/utilities/localize';

const translation: Translation = {
  $code: 'de',
  $name: 'Deutsch',
  $dir: 'ltr',

  close: 'Schließen',
  copy: 'Kopieren',
  currentValue: 'Aktueller Wert',
  progress: 'Fortschritt',
  remove: 'Entfernen',
  resize: 'Größe ändern',
  scrollToEnd: 'Zum Ende scrollen',
  scrollToStart: 'Zum Anfang scrollen',
  selectAColorFromTheScreen: 'Wähle eine Farbe vom Bildschirm',
  toggleColorFormat: 'Farbformat umschalten'
};

registerTranslation(translation);

export default translation;
