import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'de',
  $name: 'Deutsch',
  $dir: 'ltr',

  close: 'Schließen',
  copy: 'Kopieren',
  progress: 'Fortschritt',
  resize: 'Größe ändern',
  scroll_to_end: 'Zum Ende scrollen',
  scroll_to_start: 'Zum Anfang scrollen',
  select_a_color_from_the_screen: 'Wähle eine Farbe vom Bildschirm',
  toggle_color_format: 'Farbformat umschalten'
};

registerTranslation(translation);

export default translation;
