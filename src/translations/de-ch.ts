import { registerTranslation } from '~/utilities/localize';
import type { Translation } from '~/utilities/localize';

const translation: Translation = {
  $code: 'de-CH',
  $name: 'Deutsch (Schweiz)',
  $dir: 'ltr',

  close: 'Schliessen',
  copy: 'Kopieren',
  progress: 'Fortschritt',
  resize: 'Größe ändern',
  scrollToEnd: 'Zum Ende scrollen',
  scrollToStart: 'Zum Anfang scrollen',
  selectAColorFromTheScreen: 'Wähle eine Farbe vom Bildschirm',
  toggleColorFormat: 'Farbformat umschalten'
};

registerTranslation(translation);

export default translation;
